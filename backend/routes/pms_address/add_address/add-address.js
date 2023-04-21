var change_price = require('../pms_address_chainlist/debank_change_price')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var access_key = process.env.DEBANK_ACCESS_KEY;
const db = require('../../../pool-connection');
var util = require('util')
var get_simple_protocols = require('../pms_address_simple_protocol/get_wallet_simple_protocols')
var get_token_list = require('../pms_address_tokens/pms_get_token');
var transaction_history = require('../pms_address_transaction/debank_wallet_user_history_list')



const get_simple_protocol = async (address_id, wallet_id, portfolio_id,address_name,address_type, res) => {
  var wallet_id =wallet_id;
  try {
    var result =  await axios.get('https://pro-openapi.debank.com/v1/user/total_balance?id='+address_id,
        { headers: { 
                'Accesskey': access_key,
                'accept':'application/json',
            }
          })
          console.log(result.data)
          var asset_data =  result.data;
          var per =0;
          try {
              db.getConnection( async (err, connection) => {
                if (err) throw (err)
                const execquery = util.promisify(connection.query.bind(connection))
                try {
                  let refrence_address = '0x'+address_id;
                  let sql = "INSERT INTO pms_user_balance(address_id, total_usd_value, percent, timeStamp, portfolio_id,  wallet_id, address_name, address_type,ref_address_number) VALUES (?,?,?,?,?,?,?,?,?);"
                  let resultdata =await execquery(sql, [address_id, Math.floor(asset_data.total_usd_value), per, new Date().toUTCString(), portfolio_id, wallet_id, address_name, address_type, refrence_address])
                    console.log(resultdata);
                    
                    try {
                      // await change_price(address_id,res)
                        var bal = 0;
                        console.log(assets_data.chain_list);
                        for (const assets of assets_data.chain_list) {
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
                                          await transaction_history(address_id, res)
                                        } catch (error) {
                                          console.log("No transaction .", error);
                                        }
                                } catch (error) {
                                  console.log(error);
                                }
                              }
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
  }
}

module.exports = get_simple_protocol



  