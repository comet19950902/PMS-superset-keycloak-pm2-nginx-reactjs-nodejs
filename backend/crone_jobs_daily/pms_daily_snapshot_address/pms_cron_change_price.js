require('dotenv').config()
var util = require('util');
var transaction_history = require('../../routes/pms_address/pms_address_transaction/debank_wallet_user_history_list')
var get_simple_protocols = require('./pms_get_simple_protocols_cron')
var get_token_list = require('./pms_get_tokens_cron')
const axios = require('axios');
var access_key = process.env.DEBANK_ACCESS_KEY;
const db = require('../../pool-connection');
// const { connect } = require('http2');


var assets_data = []


const replace_chain_list = async(address_id,res) =>{
    try {
        db.getConnection(async (err, connection) => {
            const execquery = util.promisify(connection.query.bind(connection))
              if (err) throw err
            try {
                let search_chain_list = await execquery('SELECT * FROM pms_address_chain_list WHERE address_id =?',[address_id])
                console.log(search_chain_list);
                for (let chaindata of search_chain_list) {
                   let chainres = chaindata; 
                        const update_chain_logs = "INSERT INTO pms_address_chain_list_logs (address_asset_time, address_asset_id, address_id, asset_id, asset_name, total_asset_balance, asset_percentage_value, timeStamp, logo_url, created_date) Values (?,?,?,?,?,?,?,?,?,?);"
                        let search_chain_list = await execquery(update_chain_logs,[chainres.address_asset_id + new Date().getTime(), chainres.address_asset_id, chainres.address_id, chainres.asset_id, chainres.asset_name, chainres.total_asset_balance, chainres.asset_percentage_value, chainres.timeStamp, chainres.logo_url, new Date().toUTCString()])
                        // console.log(search_chain_list);
                } 
                await get_change_Wallet_asset_protocol(address_id, res)
            }catch (error) {
                console.log(error);
            }
            connection.release()  
        })
    } catch (error) {
        console.log(error);
    }
}

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
      db.getConnection(async (err, connection) => {
        if (err) throw err
        const execquery = util.promisify(connection.query.bind(connection))
        for (const assets of assets_data.chain_list) {
          if (assets.usd_value != 0) {
            console.log(assets_data.total_usd_value);
            console.log(assets.usd_value);
            let per = (assets.usd_value * 100) / assets_data.total_usd_value;
            console.log(per);
            let chain_id_of_address = assets.id;
            console.log(assets.id + ':' + Math.floor(per) + '%')
                try {
                  let sql = "REPLACE INTO pms_address_chain_list (address_asset_id, asset_id, asset_name, total_asset_balance, asset_percentage_value, address_id, timeStamp, logo_url) VALUES (?,?,?,?,?,?,?,?);"
                  let newresult =  await execquery(sql, [address_id + assets.id, assets.id, assets.name, assets.usd_value, Math.round(per), address_id, new Date().toUTCString(), assets.logo_url])
                    console.log(newresult);
                    let updated_assets = await execquery('SELECT * FROM pms_address_chain_list WHERE address_id =?',[address_id])
                    console.log(updated_assets);
                      let new_wallet_assets = await updated_assets;
                      console.log(new_wallet_assets);
                }catch(error){
                  console.log(error);
                }
              }
        }
          try {
            await get_token_list(address_id,chain_id_of_address, res)
          } catch (error) {
            console.log("NO Token Address.", error);
          }
          try {
            await get_simple_protocols(address_id,chain_id_of_address, res)
          } catch (error) {
            console.log("NO Simple Protocol.", error);
          }
          try {
            await transaction_history(address_id, res)
          } catch (error) {
            console.log("No transaction.", error);
          }
        
          connection.release()
        })
  }catch(error){
    console.log(error);
  }
}

//  replace_chain_list()
module.exports = replace_chain_list