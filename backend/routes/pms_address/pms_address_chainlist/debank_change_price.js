require('dotenv').config()
var util = require('util');
var transaction_history = require('../pms_address_transaction/debank_wallet_user_history_list')
var get_simple_protocols = require('../pms_address_simple_protocol/get_wallet_simple_protocols')
var get_token_list = require('../pms_address_tokens/pms_get_token')
const axios = require('axios');
var access_key = process.env.DEBANK_ACCESS_KEY;
const db = require('../../../pool-connection');
const { connect } = require('http2');


var assets_data = []


const get_change_Wallet_asset_protocol = async (address_id, res) => {
	try {
		var result = await axios.get('https://pro-openapi.debank.com/v1/user/total_balance?id=' + address_id, {
				headers: {
					'Accesskey': access_key,
					'accept': 'application/json',
				}
			});
      console.log(result);
      let	assets_data = result.data;
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
            db.getConnection(async (err, connection) => {
              if (err) throw err
              const execquery = util.promisify(connection.query.bind(connection))
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
              connection.release()
            })
          }
          catch(error){
              console.log(error);
          }
        }
      } 
  }catch(error){
    console.log(error);
  }
}

//  get_simple_protocol()
module.exports = get_change_Wallet_asset_protocol