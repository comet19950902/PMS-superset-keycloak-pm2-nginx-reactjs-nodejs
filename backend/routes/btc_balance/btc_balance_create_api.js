const axios = require('axios');
var util = require('util')
require('dotenv').config()
// const mysql = require('mysql');
const db = require('../../pool-connection')

const btc_balance = async (btc_address_id,address_type,portfolio_id,wallet_id,address_name,res) => {
    console.log('*******',btc_address_id);
    // res.send(result.data);
    var config = {
      method: 'get',
      url: `https://blockchain.info/multiaddr?active=`+ btc_address_id,
      headers: {}
    };
    console.log("resss",config);
    let result = await axios(config);
    // console.log(result.data);
    // res.send(result.data);
    var btcData = result.data
    console.log("btc data",btcData.addresses.total_received);
    var date = new Date().toUTCString()
    console.log("gfff",date);
  
    try {
      db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection))
        try {
          let refrence_address = '0x' + btc_address_id;
          console.log("btc  bal",btcData.addresses);
          for (let i = 0; i < btcData.addresses.length; i++) {
          let btcDatahash ="";
          let last_btc_time;

          // let add_address = btcData.data[i]?.addresses?.address ? btcData.data[i]?.addresses?.address: ''
          // let final_balance = btcData.data[i]?.addresses?.final_balance ? btcData.data[i]?.addresses?.final_balance: ''
          // let total_received = btcData.data[i]?.addresses?.total_received ? btcData.data[i]?.addresses?.total_received: ''
          // let total_sent = btcData.data[i]?.addresses?.total_sent ? btcData.data[i]?.addresses?.total_sent: ''
          let sql = "REPLACE INTO btc_balance(btc_address_id,date_created,total_received,total_sent,address_type,final_balance,hash160,portfolio_id,wallet_id,address_name,transaction,btc_last_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);"
          let resultdata = await execquery(sql, [btc_address_id,new Date().toUTCString(),btcData.addresses[i].total_received,btcData.addresses[i].total_sent,address_type,btcData.addresses[i].final_balance,btcDatahash,portfolio_id,wallet_id,address_name,btcData.addresses[i].n_tx,last_btc_time])
          // console.log(resultdata);
////////////////////////////////////////////btc user balance////////////////////////////////////////
          // try{
          //   let sql_for_user_balance = "REPLACE INTO pms_user_balance(address_id, total_usd_value, percent, timeStamp, portfolio_id,  wallet_id, address_name, address_type,ref_address_number) VALUES (?,?,?,?,?,?,?,?,?);"
          //   let resultdata_for_user =await execquery(sql_for_user_balance, [btc_address_id,btcData.addresses[i].total_received,btcData.addresses[i].final_balance, new Date().toUTCString(), portfolio_id, wallet_id, address_name, address_type, refrence_address])
          //   console.log(resultdata_for_user);
          //   res.send(resultdata_for_user);
          // }
          // catch (error) {
          //   console.log(error);
          //   res.send(error)
          // }


          /////////////////////////////////////////////////////////////////////////////////////////////////////
          }
          res.send(btcData);
          
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
  
module.exports = btc_balance;