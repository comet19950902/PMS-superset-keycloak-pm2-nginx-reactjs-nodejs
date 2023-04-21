// var change_price = require('../pms_address_chainlist/debank_change_price')
const axios = require('axios');
const db = require('../../pool-connection');
var util = require('util')
require('dotenv').config()
// const mysql = require('mysql');
var access_key = process.env.DEBANK_ACCESS_KEY;
// var get_simple_protocols = require('../pms_address_simple_protocol/get_wallet_simple_protocols')
// var get_token_list = require('../pms_address_tokens/pms_get_token');
// var get_all_eth_transaction = require('../pms_address_transaction/all_transaction_debank')
var transaction_history = require('../pms_address/pms_address_transaction/debank_wallet_user_history_list');
var refresh_tron_transaction_data = require('../tron_api/tron_getBalance/refresh_tron_transaction');
var refresh_btc_trx = require('./btc_refresh_transaction');
const get_refresh_data_all = async (all_data_tron, all_data_btc, all_data_eth, comment, res) => {
  let start = new Date().getTime()/1000;
  console.log(all_data_tron);
  console.log("all data")
  try {
    try {
      db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection))
        try {
          try {
            for (let i of all_data_tron) {
              let address_id = i.address_id ? i.address_id : null;
              let address_type = i.address_type ? i.address_type : null;
              var config = {
                url: 'https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=50&start_timestamp=' + start + '&address=' + address_id,
                headers: {}
              };
              let result = await axios(config);
              console.log("all data", result.data);
              var usdt_value;
              var usdc_value;
              var token_type;
              // res.send(result.data);
              var transactionData = result.data;
              var date = new Date().toUTCString();
              let b = JSON.parse(JSON.stringify(result.data.contractInfo))
              console.log("contract info", b)
              var date_cur = new Date().getTime();
              console.log(date);
              var usd_tron_fee = await axios.get('https://api3.binance.com/api/v3/klines?symbol=TRXUSDT&interval=1s&endTime=' + date_cur + '&limit=1', {
                headers: {}

              });
              var btcData_usd_fee_tron = usd_tron_fee.data
              console.log("usd data for tron", btcData_usd_fee_tron);
              console.log("after", usd_tron_fee.data[0]?.[2]);

              try {
                let refrence_address = '0x' + address_id;

                let sql = "Select * FROM tron_balance WHERE tron_address_id =?";
                let resultdata1 = await execquery(sql, [address_id]);
                console.log(resultdata1)
                var portfolio_id = resultdata1[0].portfolio_id
                var wallet_id = resultdata1[0].wallet_id
                console.log(resultdata1[0].portfolio_id);
                console.log(resultdata1[0].wallet_id);
                let tokenAbbr;

                for (let i = 0; i < transactionData.data.length; i++) {
                  let cate_id = "";
                  let send_data = "";
                  let recieve_data = "";
                  let btc_fee = "";
                  let tron_fee = "";
                  let symbol = "";
                  let btc_usd_fee = "";
                  let btc_usd_result = "";
                  let tron_usd_fee = usd_tron_fee.data[0]?.[2];

                  const tron_time = new Date([new Date(new Date(transactionData.data[i].timestamp).toUTCString()).getFullYear(), new Date(new Date(transactionData.data[i].timestamp).toUTCString()).getMonth() + 1, new Date(new Date(transactionData.data[i].timestamp).toUTCString()).getDate()].join('/')).getTime() / 1000
                  console.log(tron_time)
                  console.log("tiem of time", tron_time)
                  if (transactionData?.data[i]?.trigger_info?.parameter?._value) {
                    usdt_value = transactionData?.data[i]?.trigger_info?.parameter?._value ? (transactionData.data[i].trigger_info.parameter._value) / 1000000 : null
                    token_type = 'USDT'

                    // token_type = 'USDC'

                  }

                  else if (transactionData?.data[i]?.trigger_info?.parameter?.value) {
                    usdc_value = transactionData?.data[i]?.trigger_info?.parameter?.value ? (transactionData.data[i].trigger_info.parameter.value) / 1000000 : null
                    // token_type = 'USDT'
                    token_type = 'USDC'
                  }
                  else {
                    usdt_value = null;
                    usdc_value = null;
                    token_type = 'TRX'
                  }
                  for (let c of Object.values(b)) {
                    for (let d of Object.keys(c)) {
                      if (d == transactionData.data[i].toAddress) {
                        console.log("TRON TAG URL", c[d])
                        if ((c[d].tag1 != 'USDT Token') || ((c[d].tag1 != 'USDC Token'))) {
                          tokenAbbr = "nottrx";
                        }
                      }

                    }


                  }
                  let method_name = transactionData?.data[i]?.trigger_info?.methodName ? transactionData.data[i].trigger_info.methodName : 'TRX Transfer'
                  // let usdt_value = transactionData?.data[i]?.trigger_info?.parameter?._value ? (transactionData.data[i].trigger_info.parameter._value) / 1000000 : null
                  // console.log("usdt token value",usdt_value);

                  let tokenLogo = transactionData?.data[i]?.tokenInfo?.tokenLogo ? transactionData?.data[i]?.tokenInfo?.tokenLogo : ''
                  let tokenName = transactionData?.data[i]?.tokenInfo?.tokenName ? transactionData?.data[i]?.tokenInfo?.tokenName : ''
                  tokenAbbr = transactionData?.data[i]?.tokenInfo?.tokenAbbr ? transactionData?.data[i]?.tokenInfo?.tokenAbbr : ''
                  let tokenDecimal = transactionData?.data[i]?.tokenInfo?.tokenDecimal ? transactionData?.data[i]?.tokenInfo?.tokenDecimal : ''
                  let sql = "REPLACE INTO tron_transactions(tron_address_id,block,tokenType,portfolio_id,wallet_id,updated_time,token_logo,tokenName,tokenAbbr,amount,energy_usage_total,energy_fee,net_fee,address_id,address_type,hash,ownerAddress,toAddress,timestamp,confirmed,result,tokenDecimal,methodName,comment,usdt_token_value,amount_trx,usdc_value,token_type,tron_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"

                  // if ((tokenAbbr == 'trx') || ((tokenAbbr == null))){
                    let eth_usdt =""
                    let gas_fee = "";
                  let resultdata = await execquery(sql, [transactionData.data[i].hash + transactionData.data[i].block, transactionData.data[i].block, transactionData.data[i].tokenType, portfolio_id, wallet_id, date, tokenLogo, tokenName, tokenAbbr, transactionData.data[i].amount, transactionData.data[i].cost.energy_usage_total, usd_tron_fee.data[0]?.[2], transactionData.data[i].cost.net_fee, address_id, address_type, transactionData.data[i].hash, transactionData.data[i].ownerAddress, transactionData.data[i].toAddress, transactionData.data[i].timestamp, transactionData.data[i].confirmed, transactionData.data[i].result, tokenDecimal, method_name, comment, usdt_value, transactionData.data[i].amount / 1000000, usdc_value, token_type, tron_time])
                  console.log(resultdata);
                  const sqlInsert1 = "REPLACE INTO all_transaction_data (hash_id,date,amount,comment,from_address,to_address,portfolio_id,wallet_id,tokenType,updated_time,cate_id,send_data,recieve_data,btc_fee,tron_fee,btc_usd_fee,btc_usd_result,symbol,tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr,token_type,eth_usdt,eth_fee,time_stamp,gas_fee,amount_returned) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                  let resultdata1 = await execquery(sqlInsert1, [transactionData.data[i].hash, transactionData.data[i].timestamp, transactionData.data[i].amount, comment, address_id, transactionData.data[i].toAddress, portfolio_id, wallet_id, address_type, date, cate_id, send_data, recieve_data, btc_fee, tron_fee, btc_usd_fee, btc_usd_result, symbol, tokenDecimal, tron_usd_fee, method_name, usdt_value, transactionData.data[i].amount / 1000000, usdc_value, tokenAbbr, token_type, eth_usdt, transactionData.data[i].cost.net_fee, tron_time, gas_fee, (usd_tron_fee.data[0]?.[2]) * (transactionData.data[i].amount / 1000000)])
                  console.log("all tra", resultdata1);
                  console.log(resultdata);
                  // }
                }
                res.send(transactionData);
              } catch (error) {
                console.log(error);
                res.send(error)
              }
            }
          }
          catch (error) {
            console.log("No transaction .", error);
          }
          try {
            //btc_address_id, address_type,comment
            for (let i of all_data_btc) {
              console.log("now btc ")
              let address_type = i.address_type ? i.address_type : null;
              let btc_address_id = i.address_id ? i.address_id : null;
              console.log("logggg", btc_address_id);
              let comment_data
              var config_btc = {
                method: 'get',
                url: `https://blockchain.info/multiaddr?active=` + btc_address_id + '&n=600',
                headers: {}
              };
              console.log("resss", config_btc);
              let comment
              let result = await axios(config_btc);
              // console.log(result.data);
              // res.send(result.data);
              var btcData = result.data
              console.log("btc data");
              var date = new Date().toUTCString()
              console.log("gfff", date);
              var usd_fee = await axios.get('https://blockchain.info/ticker', {
                headers: {}

              });
              var btcData_usd_fee = usd_fee.data.USD.last
              console.log("usd data", btcData_usd_fee);
              try {
                let refrence_address = '0x' + btc_address_id;

                let sql = "Select * FROM btc_balance WHERE btc_address_id =?";
                let resultdata1 = await execquery(sql, [btc_address_id]);
                var portfolio_id = resultdata1[0].portfolio_id
                var wallet_id = resultdata1[0].wallet_id
                console.log("log", resultdata1)
                var final_balance = resultdata1[0].final_balance
                // var wallet_id = resultdata1[0].wallet_id
                console.log(resultdata1[0].final_balance);
                try {
                  for (let i = 0; i < btcData.txs.length; i++) {
                    let btc_time;

                    //////////////////////////
                    // let sql_for_commennt = "Select * FROM btc_txc WHERE btc_address_id =?";
                    // let resultdata_comment = await execquery(sql_for_commennt, [btc_address_id]);
                    // for (let j = 0; j < resultdata_comment.length; j++) {
                    //   if (resultdata_comment[j].hash_id == btcData.txs[i].hash) {
                    //     comment_data = resultdata_comment[j].comment;
                    //     console.log("commmmm", comment_data)

                    //   }
                    // }
                    ////////////////////////////

                    btc_time = new Date([new Date(new Date((btcData.txs[i].time) * 1000).toUTCString()).getFullYear(), new Date(new Date((btcData.txs[i].time) * 1000).toUTCString()).getMonth() + 1, new Date(new Date((btcData.txs[i].time) * 1000).toUTCString()).getDate()].join('/')).getTime() / 1000
                    console.log(btc_time)
                    console.log("tiem of time", btc_time)
                    let comment = i.comment ? i.comment : comment_data;
                    var to_address = '--';
                    let cate_id = "";
                    let send_data = "";
                    let recieve_data = "";
                    let tron_fee = "";
                    let btcData_usd_fee_for_tab = usd_fee.data.USD.last * ((btcData.txs[i].fee) / 100000000)
                    let btcData_usd_result = usd_fee.data.USD.last * ((btcData.txs[i].result) / 100000000)
                    // let btc_time = 
                    // let method_name = transactionData?.data[i]?.trigger_info?.methodName ? transactionData.data[i].trigger_info.methodName : ''
                    let sql = "REPLACE INTO btc_txc(hash_id,fee,time,final_balance,input_addr,address_type,btc_address_id,comment,output_addr,date_create,portfolio_id,wallet_id,result,usd_fee,usd_result,btc_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                    let resultdata = await execquery(sql, [btcData.txs[i].hash, btcData.txs[i].fee, Number(btcData.txs[i].time) * 1000, final_balance, JSON.stringify(btcData.txs[i].inputs), address_type, btc_address_id, comment, JSON.stringify(btcData.txs[i].out), date, portfolio_id, wallet_id, btcData.txs[i].result, btcData_usd_fee_for_tab, btcData_usd_result, btc_time])

                  }
                  res.send(btcData);
                }
                catch (error) {
                  console.log(error);
                  res.send(error)
                }

                try {
                  for (let i = 0; i < btcData.txs.length; i++) {
                    var to_address = '--';
                    let cate_id = "";
                    let send_data = "";
                    let recieve_data = "";
                    let tron_fee = "";
                    let btcData_usd_fee_for_tab = usd_fee.data.USD.last * ((btcData.txs[i].fee) / 100000000)
                    let btcData_usd_result = usd_fee.data.USD.last * ((btcData.txs[i].result) / 100000000)
                    let tokenDecimal = "";
                    let symbol = "";
                    let tron_usd_fee = "";
                    let method = "";
                    let btc_time = new Date([new Date(new Date((btcData.txs[i].time) * 1000).toUTCString()).getFullYear(), new Date(new Date((btcData.txs[i].time) * 1000).toUTCString()).getMonth() + 1, new Date(new Date((btcData.txs[i].time) * 1000).toUTCString()).getDate()].join('/')).getTime() / 1000
                    console.log(btc_time)
                    console.log("tiem of time", btc_time)
                    let usdt_token_value = "";
                    let amount_trx = "";
                    let token_type = "BTC";
                    let eth_usdt = "";
                    var eth_fee = "";
                    var gas_fee = "";
                    var amount_returned = "";
                    let usdc_value = "";
                    let tokenAbbr = "";

                    const sqlInsert_for_all = "REPLACE INTO all_transaction_data (hash_id,date,amount,comment,from_address,to_address,portfolio_id,wallet_id,tokenType,updated_time,cate_id,send_data,recieve_data,btc_fee,tron_fee,btc_usd_fee,btc_usd_result,symbol,tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr,token_type,eth_usdt,eth_fee,time_stamp,gas_fee,amount_returned) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                    let resultdata_for_all = await execquery(sqlInsert_for_all, [btcData.txs[i].hash, btcData.txs[i].time, (btcData.txs[i].result) / 100000000, comment, btc_address_id, to_address, portfolio_id, wallet_id, address_type, date, cate_id, send_data, recieve_data, btcData.txs[i].fee, tron_fee, btcData_usd_fee_for_tab, btcData_usd_result, symbol, tokenDecimal, tron_usd_fee, method, usdt_token_value, amount_trx, usdc_value, tokenAbbr, token_type, eth_usdt, eth_fee, btc_time, gas_fee, amount_returned])
                    console.log("all tra", resultdata_for_all);
                    console.log(resultdata_for_all);
                  }
                }
                catch (error) {
                  console.log(error);
                  res.send(error)
                }
              } catch (error) {
                console.log(error);
                res.send(error)
              }

            }
          } catch (error) {
            console.log(error);
          }
          try {
            for (let i of all_data_eth) {
              let address_type = i.address_type ? i.address_type : null;
              let address_id = i.address_id ? i.address_id : null;
              console.log("address type", address_type)
              console.log("address id", address_id)
              var assetidinuse = 'eth'
              let comment_data;
              var chainresult = await axios.get('https://pro-openapi.debank.com/v1/user/history_list?id=' + address_id + '&chain_id=' + assetidinuse, {
                headers: {
                  'Accesskey': access_key,
                  'accept': 'application/json',
                }
              });
              console.log("now chain list will be", chainresult);
              let symbol_of_data = chainresult.data
              console.log("symbol", symbol_of_data.token_dict)
              var date_cur = new Date().getTime();
              console.log("time current", date_cur)

              console.log("data of history", chainresult.history_list);

              try {
                const sqlSelect = "SELECT * FROM pms_address_chain_list where address_id=?"
                const result = await execquery(sqlSelect, [address_id])
                //////////////////////////////////////////////////////////////////////
                const sqlSelect_por = "SELECT * FROM pms_user_balance where address_id=?"
                const result_por = await execquery(sqlSelect_por, [address_id])
                let portfolio_id1 = result_por[0].portfolio_id;
                let wallet_id1 = result_por[0].wallet_id;
                console.log("wallll", wallet_id1);





                ////////////////////////////////////////////////////////////////
                console.log(result);
                console.log(result);
                let assetList = result;
                let allresult = [];
                let send_amount;
                let eth_fee;
                let gas_fee;
                let token_type;
                let eth_usd_gas;
                let amount_returned;
                let total_amount = [];
                let senddd_ammount;
                let result_ammount;
                // for (const asset of assetList) {
                try {
                  for (const element of chainresult.data.history_list) {
                    let history_list_data = element;
                    console.log("element_value", element);
                    let transTime = new Date(element.time_at * 1000);
                    console.log("time of tran", transTime);

                    console.log("time of tran", transTime);
                    var eth_time = new Date([new Date(transTime.toUTCString()).getFullYear(), new Date(transTime.toUTCString()).getMonth() + 1, new Date(transTime.toUTCString()).getDate()].join('/')).getTime()
                    console.log(eth_time)
                    console.log("tiem of time", eth_time);
                    var transactionDate = transTime.toUTCString()
                    console.log("time ofoooooooooooooo", transactionDate);
                    /usd value////////////////////////
                    var usd_eth_fee = await axios.get('https://api3.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1s&endTime=' + element.time_at * 1000 + '&limit=1', {
                      headers: {}


                    });
                    var btcData_usd_fee_eth = usd_eth_fee.data
                    console.log("usd data for eth", btcData_usd_fee_eth);
                    console.log("after", usd_eth_fee.data[0]?.[2]);
                    let result_ammount_eth_id = element.receives.map(({ token_id }) => token_id)
                    let send_ammount_eth_id = element.sends.map(({ token_id }) => token_id)

                    console.log("token reci id", result_ammount_eth_id, send_ammount_eth_id)
                    console.log("usd value ", usd_eth_fee)
                    /////////////////////////////////
                    result_ammount = element.receives.map(({ amount }) => amount);
                    let result_ammount_for_eth = element.receives.map(({ amount }) => amount)

                    let obj = element.receives.find(o => o.token_id === 'eth');
                    let obj1 = element.sends.find(o => o.token_id === 'eth');

                    let obj11 = element.receives.find(o => o.token_id != 'eth');
                    let obj12 = element.sends.find(o => o.token_id != 'eth');
                    console.log("ethhhh value", obj, obj1);

                    ////////////////return amount ////

                    let send_amount = element.sends.map(({ amount }) => amount);
                    let receives_amount = element.receives.map(({ amount }) => amount);
                    
                    ////////////////////////
                    const tokenId = JSON.stringify(element.receives) != '[]' ? result_ammount_eth_id == 'eth' ? 'ETH' : Object.values(JSON.parse(JSON.stringify(symbol_of_data.token_dict))).filter(i => i.id == result_ammount_eth_id)[0]?.symbol : JSON.stringify(element.sends) != '[]' ? send_ammount_eth_id == 'eth' ? 'ETH' : Object.values(JSON.parse(JSON.stringify(symbol_of_data.token_dict))).filter(i => i.id == send_ammount_eth_id)[0]?.symbol : '-'

                    console.log("token id", tokenId)
                    let rs_amount = JSON.parse(JSON.stringify(element.receives))[0]?.amount
                    let sd_amount = JSON.parse(JSON.stringify(element.sends))[0]?.amount

                    /////////////////AMOUNT/////////
                    if (rs_amount) {
                      amount_returned = rs_amount;
                    }
                    else if (sd_amount) {
                      amount_returned = sd_amount;
                    }
                    else if (rs_amount && sd_amount) {
                      // total_amount.push(rs_amount.sd_amount)
                      // amount_returned = total_amount;
                      amount_returned = [sd_amount, rs_amount]
                    }
                    else {
                      amount_returned = null
                    }
                    console.log("return amount", amount_returned)

                    // let a_receeve = Object.values(JSON.parse(JSON.stringify(symbol_of_data.token_dict)).filter(i => i.id == result_ammount_eth_id))
                    eth_usd_gas = JSON.parse(JSON.stringify(element.tx))
                    gas_fee = eth_usd_gas?.usd_gas_fee ? eth_usd_gas?.usd_gas_fee : null;
                    console.log("gas fee", gas_fee)

                    let result_ammount_eth = element.receives.map(({ token_id }) => token_id)

                    // let  amount_address = JSON.parse(JSON.stringify(element.tx))
                    // console.log("amount address",amount_address.to_addr)
                    senddd_ammount = element.sends.map(({ amount }) => amount);
                    let senddd_ammount_for_eth = element.sends.map(({ amount }) => amount)
                    console.log("ssennn", senddd_ammount, result_ammount_eth, result_ammount);
                    let eth_usdt
                    if (obj) {
                      console.log("forrr");
                      // send_amount = result_ammount
                      eth_usdt = usd_eth_fee.data[0]?.[2] * result_ammount
                      console.log("usdt value", eth_usdt);
                      eth_fee = result_ammount_for_eth
                      // token_type = 'ETH';
                      console.log("usdteth fee", eth_usdt)


                    }
                    else if (obj1) {
                      eth_usdt = usd_eth_fee.data[0]?.[2] * senddd_ammount;
                      eth_fee = senddd_ammount_for_eth
                      // token_type = 'ETH';
                      console.log("usdteth fee", eth_usdt)

                      // send_amount = senddd_ammount
                    }
                    else {
                      eth_fee = null;

                    }
                    // var send_amount = element?.sends?.amount ? element.sends.amount : element.receives.amount

                    try {
                      let sql = "REPLACE INTO pms_wallet_transaction_history_list (transaction_id, other_wallet_address, asset_chain, amount, transaction_time, cate_id, address_id, send_data, recieve_data, created_at,symbol,usdt_eth,eth_fee,token_type,eth_time,gas_fee,amount_returned) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                      let newresult = await execquery(sql, [element.id, element.other_addr, element.chain, JSON.stringify(element.tx), transactionDate, element.cate_id, address_id, JSON.stringify(element.sends), JSON.stringify(element.receives), new Date().toUTCString(), JSON.stringify(symbol_of_data.token_dict), eth_usdt, eth_fee, tokenId, eth_time, gas_fee, amount_returned])
                      allresult.push(newresult)
                      console.log("allres", allresult);
                    }
                    catch (error) {
                      console.log(error);
                    }

                    /////////////////all tran//////////////////////////
                    try {
                      // let comments = i.comments ? i.comments:comment_data;
                      let comments = "";
                      let btc_fee = "";
                      let tron_fee = "";
                      let btc_usd_fee = "";
                      let btc_usd_result = "";
                      let tokenDecimal = "";
                      let tron_usd_fee = "";
                      let method = "";
                      let usdt_token_value = "";
                      let amount_trx = "";
                      let usdc_value = "";
                      let tokenAbbr = "";
                      let token_type = "";
                      let eth_time_stamp = eth_time / 1000
                      const sqlInsert1 = "REPLACE INTO all_transaction_data (hash_id,date,amount,comment,from_address,to_address,portfolio_id,wallet_id,tokenType,updated_time,cate_id,send_data,recieve_data,btc_fee,tron_fee,btc_usd_fee,btc_usd_result,symbol,tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr,token_type,eth_usdt,eth_fee,time_stamp,gas_fee,amount_returned) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                      if (tokenId == 'ETH' || tokenId == 'USDC' || tokenId == 'USDT') {

                        let resultdata1 = await execquery(sqlInsert1, [element.id, element.time_at, JSON.stringify(element.tx), comments, address_id, element.other_addr, portfolio_id1, wallet_id1, element.chain, new Date().toUTCString(), element.cate_id, JSON.stringify(element.sends), JSON.stringify(element.receives), btc_fee, tron_fee, btc_usd_fee, btc_usd_result, JSON.stringify(symbol_of_data.token_dict), tokenDecimal, tron_usd_fee, method, usdt_token_value, amount_trx, usdc_value, tokenAbbr, tokenId, eth_usdt, eth_fee, eth_time_stamp, gas_fee, amount_returned])
                        console.log("all tra", resultdata1);
                      }

                      ///////////////////////////////////////////////////////////

                    } catch (error) {
                      console.log(error);
                    }
                  }
                  res.send(allresult)

                } catch (error) {
                  console.log(error);
                }
                // } 
              } catch (error) {
                console.log(error);
                res.send(error)
              }
            }
          }
          catch (error) {
            console.log("No transaction .", error);
          }
        }
        catch (error) {
          console.log("No transaction .", error);
        }
        connection.release();
      })
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.send(error)
  }
}

module.exports = get_refresh_data_all


