var change_price = require('../pms_address_chainlist/debank_change_price')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var access_key = process.env.DEBANK_ACCESS_KEY;
const db = require('../../../pool-connection');
var util = require('util')
var get_simple_protocols = require('../pms_address_simple_protocol/get_wallet_simple_protocols')
var get_token_list = require('../pms_address_tokens/pms_get_token');
var get_all_eth_transaction = require('../pms_address_transaction/all_transaction_debank')

const get_address_data = async (address_id, wallet_id, portfolio_id,address_name,address_type, res) => {
  var wallet_id =wallet_id;
  try {
    var result =  await axios.get('https://pro-openapi.debank.com/v1/user/total_balance?id='+address_id,
        { headers: { 
                'Accesskey': access_key,
                'accept':'application/json',
            }
          })
          console.log(result.data)
          let asset_data =  result.data;
          var per =0;
          let last_eth_time =null ;
          let recv_amount =null ;
          let send_amount=null ;
          let total_tran =null;
          var amt_rcv_usdc=null;
          var amt_rcv_usdt =null;
          var amt_rcv_eth =null;
          var send_amt_eth = null;
          var amt_send_usdc= null;
          var amt_send_usdt = null;
          var total_eth=null ;
          var total_usdt=null;
          var total_usdc=null;
          try {
              db.getConnection( async (err, connection) => {
                if (err) throw (err)
                const execquery = util.promisify(connection.query.bind(connection))
                try {
                  let refrence_address = '0x'+address_id;

                  let sql = "REPLACE INTO pms_user_balance(address_id, total_usd_value, percent, timeStamp, portfolio_id,  wallet_id, address_name, address_type,ref_address_number,last_eth_time,recv_amount,send_amount,total_tran,amt_rcv_eth,amt_rcv_usdt,amt_rcv_usdc,send_amt_eth,amt_send_usdc,amt_send_usdt,total_eth,total_usdt,total_usdc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                  let resultdata =await execquery(sql, [address_id, Math.floor(asset_data.total_usd_value), per, new Date().toUTCString(), portfolio_id, wallet_id, address_name, address_type, refrence_address,last_eth_time,recv_amount,send_amount,total_tran,amt_rcv_eth,amt_rcv_usdt,amt_rcv_usdc,send_amt_eth,amt_send_usdc,amt_send_usdt,total_eth,total_usdt,total_usdc])
                    console.log(resultdata);
                    // res.send(resultdata);
                    try {
                      // await change_price(address_id,res)
                      let assets_data = asset_data;
                        var bal = 0;
                        console.log(assets_data.chain_list);
                        for (let assets of assets_data.chain_list) {
                          if (assets.usd_value != 0) {
                            console.log(assets_data.total_usd_value);
                            console.log(assets.usd_value);
                            let per = (assets.usd_value * 100) / assets_data.total_usd_value;
                            console.log(per);
                            console.log(assets.id + ':' + Math.floor(per) + '%')
                                try {
                                  let sql = "REPLACE INTO pms_address_chain_list (address_asset_id, asset_id, asset_name, total_asset_balance, asset_percentage_value, address_id, timeStamp, logo_url) VALUES (?,?,?,?,?,?,?,?);"
                                  let newresult =  await execquery(sql, [address_id + assets.id, assets.id, assets.name, assets.usd_value, Math.round(per), address_id, new Date().toUTCString(), assets.logo_url])
                                    console.log(newresult);
                                    let updated_assets = await execquery('SELECT * FROM pms_address_chain_list WHERE address_id =?',[address_id])
                                    console.log(updated_assets);
                                      let new_wallet_assets = await updated_assets;
                                      console.log(new_wallet_assets);
                                } catch (error) {
                                  console.log(error);
                                }
                            }
                        }
                            try {
                                await get_token_list(address_id, res)
                            } catch (error) {
                                console.log("NO Token Address .", error);
                            }
                            try {
                                await get_simple_protocols(address_id, res)
                            } catch (error) {
                                console.log("NO Simple Protocol .", error);
                            }
                            try {
                              await get_all_eth_transaction(address_id, res)

                              // await transaction_history(address_id, res)
                              console.log("tran_data",res);
                            } catch (error) {
                                console.log("No transaction .", error);
                            }
                            
                            
                    } catch (error) {
                      console.log(error);
                    } 
                } catch (error) {
                  console.log(error);
                }
                connection.release();
              })
            } catch (error) {
              console.log(error);
            }     
  }catch(error){
    console.log(error);
    res.send(error)
  }
}

module.exports = get_address_data

// get_address_data()


  