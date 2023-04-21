const axios = require('axios');
const db = require('../../../pool-connection');
var util = require('util')

const tron_balance = async (address_id,wallet_id,portfolio_id,address_name,address_type,res) => {
  console.log('*******',address_id);
  var config = {
    method: 'get',
    url: `https://apilist.tronscan.org/api/account?address=` + address_id,
    headers: {}
  };
  var date_cur  = new Date().getTime();

  let result = await axios(config);
  console.log(result.data);
  // res.send(result.data);
  var tronData = result.data;
  let total_ammount = 0;
  var usd_tron_fee = await axios.get('https://api3.binance.com/api/v3/klines?symbol=TRXUSDT&interval=1s&endTime='+ date_cur +'&limit=1', {
    headers: {}
    
    });
    var btcData_usd_fee_tron = usd_tron_fee.data
    console.log("usd data for tron",btcData_usd_fee_tron);
    console.log("after",usd_tron_fee.data[0]?.[2]);
  
  var date = new Date().toUTCString()

  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        let tota = total_ammount;
        let refrence_address = '0x' + address_id;
        // for (let k = 0; k < tronData.tokenBalances.length; k++) {
          total_ammount = (tota + tronData.tokenBalances[0].amount) * usd_tron_fee.data[0]?.[2]
          // console.log("amm trtrtrytrty",tronData.tokenBalances[0].amount);

          console.log("TOTAL AMOUNT",total_ammount);
          let tron_last_time;
          let rcv_amount;
          let send_amount;
          let tra = null;
          var amt_rcv_usdc;
          var amt_rcv_usdt;
          var amt_rcv_trx;
          var send_amt_trx;
          var amt_send_usdc;
          var amt_send_usdt;
          var total_trx;
          var total_usdt ;
          var total_usdc;
        let sql = "REPLACE INTO tron_balance(tron_address_id, transactions, date_created, wallet_id, portfolio_id, address_type, address_name,address_id,total_ammount,tron_last_time,rcv_amount,send_amount,amt_rcv_trx,amt_rcv_usdt,amt_rcv_usdc,send_amt_trx,amt_send_usdt,amt_send_usdc,total_trx,total_usdt,total_usdc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
        let resultdata = await execquery(sql, [tronData.address,tra, new Date().toUTCString(), wallet_id, portfolio_id,address_type,address_name,address_id,total_ammount,tron_last_time,rcv_amount,send_amount,amt_rcv_trx,amt_rcv_usdt,amt_rcv_usdc,send_amt_trx,amt_send_usdt,amt_send_usdc,total_trx,total_usdt,total_usdc])
        console.log(resultdata);
        // }

        /////////////////////////////////tron pms_user////////////////////
        // let per = 0;

        // let sql_for_user_balance = "REPLACE INTO pms_user_balance(address_id, total_usd_value, percent, timeStamp, portfolio_id,  wallet_id, address_name, address_type,ref_address_number) VALUES (?,?,?,?,?,?,?,?,?);"
        // let resultdata_for_user =await execquery(sql_for_user_balance, [tronData.address,tronData.transactions, per, new Date().toUTCString(), portfolio_id, wallet_id, address_name, address_type, refrence_address])
        // console.log(resultdata_for_user);
        // res.send(resultdata_for_user);

        //////////////////////////////////////////////////////////////////////////////

        for (let i = 0; i < tronData.trc20token_balances.length; i++) {
          let sql = "REPLACE INTO tron_address_chain(tron_address_id,tokenId,balance,tokenName,tokenAbbr,tokenDecimal,tokenCanShow,tokenLogo,tokenType,vip,tokenPriceInTrx,amount,nrOfTokenHolders,transferCount,address_id,updated_time,wallet_id,portfolio_id,address_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
          let resultdata = await execquery(sql, [tronData.address+tronData.trc20token_balances[i].tokenId,tronData.trc20token_balances[i].tokenId,tronData.trc20token_balances[i].balance,tronData.trc20token_balances[i].tokenName,tronData.trc20token_balances[i].tokenAbbr,tronData.trc20token_balances[i].tokenDecimal,tronData.trc20token_balances[i].tokenCanShow,tronData.trc20token_balances[i].tokenLogo,tronData.trc20token_balances[i].tokenType,tronData.trc20token_balances[i].vip,tronData.trc20token_balances[i].tokenPriceInTrx,tronData.trc20token_balances[i].amount,tronData.trc20token_balances[i].nrOfTokenHolders,tronData.trc20token_balances[i].transferCount,address_id,date,wallet_id,portfolio_id,address_type])
          console.log(resultdata);
        }
        for (let i = 0; i < tronData.tokenBalances.length; i++) {
          let sql = "REPLACE INTO tron_address_chain(tron_address_id,tokenId,balance,tokenName,tokenAbbr,tokenDecimal,tokenCanShow,tokenLogo,tokenType,vip,tokenPriceInTrx,amount,nrOfTokenHolders,transferCount,address_id,updated_time,wallet_id,portfolio_id,address_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
          let resultdata = await execquery(sql, [tronData.address+tronData.tokenBalances[i].tokenId,tronData.tokenBalances[i].tokenId,tronData.tokenBalances[i].balance,tronData.tokenBalances[i].tokenName,tronData.tokenBalances[i].tokenAbbr,tronData.tokenBalances[i].tokenDecimal,tronData.tokenBalances[i].tokenCanShow,tronData.tokenBalances[i].tokenLogo,tronData.tokenBalances[i].tokenType,tronData.tokenBalances[i].vip,tronData.tokenBalances[i].tokenPriceInTrx,tronData.tokenBalances[i].amount,tronData.tokenBalances[i].nrOfTokenHolders,tronData.tokenBalances[i].transferCount,address_id,date,wallet_id,portfolio_id,address_type])
          console.log(resultdata);
        }
        res.send(tronData);
      } catch (error) {
        console.log(error);
        res.send(error)
      }
      connection.release();
    })
  } catch (error) {
    console.log(error);
    res.send(error);

  }

}

module.exports = tron_balance;