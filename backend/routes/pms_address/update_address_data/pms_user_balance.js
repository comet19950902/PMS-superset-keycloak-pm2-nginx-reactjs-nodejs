var change_price = require('../pms_address_chainlist/debank_change_price')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var access_key = process.env.DEBANK_ACCESS_KEY;
var util = require('util')
const db = require('../../../pool-connection');
var get_token_list = require('../pms_address_tokens/pms_get_token')
var get_simple_protocols = require('../pms_address_simple_protocol/get_wallet_simple_protocols')
var transaction_history = require('../pms_address_transaction/debank_wallet_user_history_list')


const get_simple_protocol = async (address_id, res) => {
	try {
		var result = await axios.get('https://pro-openapi.debank.com/v1/user/total_balance?id=' + address_id, {
			headers: {
				'Accesskey': access_key,
				'accept': 'application/json',
			}
		});
		var asset_data = result.data;
		console.log("asset data will be",asset_data);
		var per = 0;
		try {
			db.getConnection(async (err, connection) => {
				if (err) throw err
				const execquery = util.promisify(connection.query.bind(connection))
				try {
          			let history_wallet_data = await execquery('SELECT * FROM pms_user_balance WHERE address_id =?',[address_id])
						let latest_history = await history_wallet_data[0];
						console.log("History", latest_history);
						if (history_wallet_data.length != 0) {
							let sqladd = "REPLACE INTO pms_user_history (address_id_timeStamp, total_usd, address_id, timeStamp, wallet_id, portfolio_id, address_name, address_type) VALUES (?,?,?,?,?,?,?,?);"
							let newresults =  await execquery(sqladd, [address_id + latest_history.timeStamp, latest_history.total_usd_value, address_id, latest_history.timeStamp, latest_history.wallet_id, latest_history.portfolio_id, latest_history.address_name, latest_history.address_type])
								console.log("new", newresults);
								let sqlupdate = "UPDATE pms_user_balance SET total_usd_value=?, percent=?, timeStamp=? where  address_id=?;"
								let updatedres = await execquery(sqlupdate, [Math.floor(asset_data.total_usd_value), per, new Date().toUTCString(), address_id])
									console.log('updatedres', updatedres);
								try {
									// await change_price(address_id, res)
									var bal = 0;
									console.log(asset_data.chain_list);
									for (const assets of asset_data.chain_list) {
									if (assets.usd_value != 0) {
										console.log(asset_data.total_usd_value);
										console.log(assets.usd_value);
										let per = (assets.usd_value * 100) / asset_data.total_usd_value;
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
														console.log("get _token list");
													} catch (error) {
													console.log("NO Token Address .", error);
													}
													try {
														await get_simple_protocols(address_id, res)
														console.log("get simple protocols");
													} catch (error) {
													console.log("NO Simple Protocol .", error);
													}
													try {
														await transaction_history(address_id,res)
														console.log("transaction history");
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
						}
						else{
							console.log("NO Address history");
						}
				}
				catch(error){
					console.log(error);
				}
				connection.release()
      		})
		}catch(error){
			console.log(error);
		}
  }catch(error){
    console.log(error);
  }
}

//  get_simple_protocol()
module.exports = get_simple_protocol