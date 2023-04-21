// require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util')
const db = require('../../pool-connection');
var access_key = process.env.DEBANK_ACCESS_KEY;
var assetList;
// var allresult = [];


const get_load_history_list = async(address_id,start_time, res)=>{
  // let address_id = newaddress_id ? newaddress_id : null;
  try {
		db.getConnection(async (err, connection) => {
			if (err) throw err
      const execquery = util.promisify(connection.query.bind(connection))
			  try {
          const sqlSelect = "SELECT * FROM pms_address_chain_list where address_id=?"
				  const result = await execquery(sqlSelect,[address_id])
          //////////////////////////////////////////////////////////////////////
          const sqlSelect_por = "SELECT * FROM pms_user_balance where address_id=?"
				  const result_por = await execquery(sqlSelect_por,[address_id])
          let portfolio_id1 = result_por[0].portfolio_id;
          let wallet_id1 = result_por[0].wallet_id;
          console.log("wallll",wallet_id1);
          ////////////////////////////////////////////////////////////////
          console.log(result);
          console.log(result);
          let assetList = result;
          let send_amount;
          let eth_fee;
          let token_type
          let eth_usd_gas;
          let gas_fee;
          let allresult = [];
          let amount_returned;
          let senddd_ammount;
          let result_ammount;
          let eth_usdt;
          // for (const asset of assetList) {
            try {
                // let assetidinuse = asset.asset_id;
                let assetidinuse = 'eth'
                console.log("asset_in_use", assetidinuse);
                // var chainresult = await axios.get('https://pro-openapi.debank.com/v1/user/all_history_list?id=' + address_id, {
                var chainresult = await axios.get('https://pro-openapi.debank.com/v1/user/history_list?id=' + address_id + '&chain_id=' + assetidinuse + '&start_time=' + start_time, {
                    headers: {
                      'Accesskey': access_key,
                      'accept': 'application/json',
                    }
                });
                console.log("now chain list will be",chainresult);
                var date_cur = new Date().getTime();
                console.log(date_cur)
              //   var usd_eth_fee = await axios.get('https://api3.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1s&endTime=' + date_cur + '&limit=1', {
              //   headers: {}

              // });
              // var btcData_usd_fee_eth = usd_eth_fee.data
              // console.log("usd data for eth", btcData_usd_fee_eth);
              // console.log("after", usd_eth_fee.data[0]?.[2]);
                let symbol_of_data = chainresult.data
                console.log("symbol",symbol_of_data.token_dict)
                console.log("data of history",chainresult.history_list);
                for (const element of chainresult.data.history_list) {
                  let history_list_data = element;

                  ////////////////////////////////usdt value/////////
                  var usd_eth_fee = await axios.get('https://api3.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1s&endTime=' + element.time_at * 1000 + '&limit=1', {
                    headers: {}
    
                  });
                  var btcData_usd_fee_eth = usd_eth_fee.data
              console.log("usd data for eth", btcData_usd_fee_eth);
              console.log("after", usd_eth_fee.data[0]?.[2]);

                  console.log("usd value ",usd_eth_fee)

                  //////////////////////////////////////
                  console.log("element_value", element);
                  let transTime = new Date(element.time_at * 1000);
                  console.log("time of tran",transTime);
                  result_ammount = element.receives.map(({amount}) => amount);
                  let result_ammount_eth_id = element.receives.map(({token_id}) => token_id)
                  let send_ammount_eth_id = element.sends.map(({token_id}) => token_id)

                  console.log("token reci id",result_ammount_eth_id,send_ammount_eth_id)

                  let result_ammount_for_eth = element.receives.map(({amount}) => amount)
                  let result_ammount_eth = element.receives.map(({token_id}) => token_id)
                  let send_ammount_eth = element.sends.map(({token_id}) => token_id)
                  senddd_ammount = element.sends.map(({amount}) => amount)
                  let senddd_ammount_for_eth = element.sends.map(({amount}) => amount)

                  const tokenId = JSON.stringify(element.receives) != '[]' ? result_ammount_eth_id == 'eth' ? 'ETH' : Object.values(JSON.parse(JSON.stringify(symbol_of_data.token_dict))).filter(i => i.id == result_ammount_eth_id)[0]?.symbol : JSON.stringify(element.sends) != '[]' ? send_ammount_eth_id == 'eth' ? 'ETH' : Object.values(JSON.parse(JSON.stringify(symbol_of_data.token_dict))).filter(i => i.id == send_ammount_eth_id)[0]?.symbol : '-'

                  console.log("token id",tokenId)

                  console.log("ssennn",senddd_ammount,result_ammount_eth,result_ammount);
                  console.log("ammount of the ",element.sends[0])
                  // if ( symbol_for_type == amount_id){
                  //   token_type = optimized_symbol;
                  // }
                  // if (element.sends.token_id == 'eth' || element.receives.token_id == 'eth'){
                  //   token_type = 'ETH';
                  // }
                  // else{
                  //   token_type = symbol_of_data.token_dict.symbol;
                  // }
                  var eth_time = new Date([new Date(transTime.toUTCString()).getFullYear(), new Date(transTime.toUTCString()).getMonth() + 1, new Date(transTime.toUTCString()).getDate()].join('/')).getTime()
                  console.log(eth_time)
                  console.log("tiem of time",eth_time);
                  eth_usd_gas =JSON.parse(JSON.stringify(element.tx))
                  gas_fee = eth_usd_gas?.usd_gas_fee ? eth_usd_gas?.usd_gas_fee:null;
                  console.log("gas fee",gas_fee)

                  let rs_amount = JSON.parse(JSON.stringify(element.receives))[0]?.amount
                  let sd_amount = JSON.parse(JSON.stringify(element.sends))[0]?.amount

                  /////////////////AMOUNT/////////
                  if (rs_amount){
                    amount_returned = rs_amount;
                  }
                  else if (sd_amount){
                    amount_returned = sd_amount;
                  }
                  else if (rs_amount && sd_amount){
                    // amount_returned = sd_amount
                    amount_returned = [sd_amount,rs_amount]
                    console.log("amount",amount_returned)

                  }
                  else{
                    amount_returned = null
                  }
                  console.log("return amount",amount_returned)

                  if (result_ammount_eth == "eth" ){
                    console.log("forrr");
                    send_amount = result_ammount;
                    eth_fee = result_ammount_for_eth
                    token_type = 'ETH';
                    eth_usdt =  usd_eth_fee.data[0]?.[2] * send_amount
                  }
                  else if  (send_ammount_eth == "eth") {
                    send_amount = senddd_ammount
                    eth_fee = senddd_ammount_for_eth
                    token_type = 'ETH';
                    eth_usdt =  usd_eth_fee.data[0]?.[2] * send_amount

                  }
                  else{
                    send_amount = null;
                    eth_fee = null;
                  }
                  // var send_amount = element?.sends?.amount ? element.sends.amount : element.receives.amount
                  // var eth_usdt =  usd_eth_fee.data[0]?.[2] * send_amount
                  var transactionDate = transTime.toUTCString()
                  console.log("time ofoooooooooooooo",transactionDate);
                  try {
                    let sql = "REPLACE INTO pms_wallet_transaction_history_list (transaction_id, other_wallet_address, asset_chain, amount, transaction_time, cate_id, address_id, send_data, recieve_data, created_at,symbol,usdt_eth,eth_fee,token_type,eth_time,gas_fee,amount_returned) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                    let newresult = await execquery(sql, [element.id, element.other_addr, element.chain, JSON.stringify(element.tx), transactionDate, element.cate_id, address_id, JSON.stringify(element.sends), JSON.stringify(element.receives), new Date().toUTCString(),JSON.stringify(symbol_of_data.token_dict),eth_usdt,eth_fee,tokenId,eth_time,gas_fee,amount_returned])
                    allresult.push(newresult)
                    console.log("allres",allresult);
                  }
                  catch (error) {
                    console.log(error);
                  }

                    /////////////////all tran//////////////////////////
                  try{
                    let comments="";
                    let btc_fee ="";
                    let tron_fee="";
                    let btc_usd_fee ="";
                    let btc_usd_result = "";
                    let tokenDecimal ="";
                    let tron_usd_fee = "";
                    let method = "";
                    let usdt_token_value="";
                    let amount_trx = "";
                    let usdc_value = "";
                    let tokenAbbr = "";
                    let token_type ="";
                    let eth_time_stamp = eth_time/1000
                    const sqlInsert1 = "REPLACE INTO all_transaction_data (hash_id,date,amount,comment,from_address,to_address,portfolio_id,wallet_id,tokenType,updated_time,cate_id,send_data,recieve_data,btc_fee,tron_fee,btc_usd_fee,btc_usd_result,symbol,tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr,token_type,eth_usdt,eth_fee,time_stamp,gas_fee,amount_returned) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"  
                    if (tokenId == 'ETH' || tokenId == 'USDC' || tokenId == 'USDT'){                  
                    let resultdata1 = await execquery(sqlInsert1, [element.id,element.time_at,JSON.stringify(element.tx),comments,address_id,element.other_addr,portfolio_id1, wallet_id1,element.chain,new Date().toUTCString(),element.cate_id,JSON.stringify(element.sends),JSON.stringify(element.receives),btc_fee,tron_fee,btc_usd_fee,btc_usd_result,JSON.stringify(symbol_of_data.token_dict),tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr,tokenId,eth_usdt,eth_fee,eth_time_stamp,gas_fee,amount_returned])
                    console.log("all tra",resultdata1);
                    }

                    ///////////////////////////////////////////////////////////

                  } catch (error) {
                    console.log(error);
                  }
                  // res.send(allresult)
                }
                res.send(chainresult.data.history_list)
                // res.send(allresult)
            } catch (error) {
              console.log(error);
            }
          // } 
      } catch (error) {
        console.log(error);
      }
      connection.release()
    })
  }
  catch(error){
    console.log(error);
  } 
}



module.exports = get_load_history_list