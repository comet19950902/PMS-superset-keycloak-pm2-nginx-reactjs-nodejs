require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util');
const db = require('../../pool-connection')
var access_key = process.env.DEBANK_ACCESS_KEY;
var allresult = [];
var assetList;



const protocol_logs = async(address_id,chain_id_of_address, res) =>{
    try {
		await db.getConnection(async (err, connection) => {
			if (err) throw (err)
			const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlSearchprotocol = "SELECT * FROM pms_wallet_simple_protocol where address_id=? and protocolChain =?"
				let protocol_log_result = await execquery(sqlSearchprotocol,[address_id, chain_id_of_address]);
                console.log("protocol_log_result, protocol_log_result");
                for (let protocol_data of protocol_log_result) {
                    let protocol_value = protocol_data;
                    let sqlINSERT = "INSERT INTO pms_wallet_simple_protocol_logs (protocol_chain_wallet_id_time, protocol_chain_wallet_id, protocolId, protocolName, protocolChain, protocolsiteUrl, protocolLogoUrl, tvlValue, net_usd_value, address_id, updated_date, created_date ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);"
					let simple_protocol_result = await execquery(sqlINSERT,[protocol_value.protocol_chain_wallet_id + new Date().getTime(), protocol_value.protocol_chain_wallet_id, protocol_value.protocolId, protocol_value.protocolName, protocol_value.protocolChain, protocol_value.protocolsiteUrl, protocol_value.protocolLogoUrl, protocol_value.tvlValue, protocol_value.net_usd_value,  protocol_value.address_id, protocol_value.updated_date, new Date().getTime() ])
                    console.log(simple_protocol_result);
                }
				await get_simple_protocol(address_id, res)
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

const get_simple_protocol = async (address_id, res) => {
	try {
		await db.getConnection(async (err, connection) => {
			 if (err) throw (err)
			const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlSelect = "SELECT * FROM pms_address_chain_list where address_id=?"
				let result = await execquery(sqlSelect,[address_id]);
					let assetList = result;
					console.log(assetList);
                    for (let chain of assetList) {
						let chain_id = chain.asset_id;
						console.log(chain_id);
						try {
							var chain_result = await axios.get('https://pro-openapi.debank.com/v1/user/simple_protocol_list?id=' + address_id + '&chain_id=' + chain_id,
							{	headers: {
									'Accesskey': access_key,
									'accept': 'application/json',
								}
							})
							console.log("debank_chain_result", chain_result.data);
						  //chain data of adress
							for (let protocol of chain_result.data) {
								console.log(protocol.id);
								var protocolId = protocol.id ? protocol.id : null;
								var protocolName = protocol.name ? protocol.name : null;
								var protocolChain = protocol.chain ? protocol.chain : chain_id;
								var protocolsiteUrl = protocol.site_url ? protocol.site_url : null;
								var protocolLogoUrl = protocol.logo_url ? protocol.logo_url : null;
								var tvlValue = protocol.tvlValue ? protocol.tvlValue : null;
								var net_usd_value = protocol.net_usd_value ? protocol.net_usd_value : null;
								try {
									let sql = "REPLACE INTO pms_wallet_simple_protocol (protocol_chain_wallet_id, protocolId, protocolName, protocolChain, protocolsiteUrl, protocolLogoUrl, tvlValue, net_usd_value, address_id, updated_date ) VALUES (?,?,?,?,?,?,?,?,?,?);"
									let simple_protocol_result = await execquery(sql, [address_id + chain_id + protocol.id, protocolId, protocolName, protocolChain, protocolsiteUrl, protocolLogoUrl, tvlValue, net_usd_value, address_id, new Date().toUTCString()])
									// allresult.push(simple_protocol_result.affectedRows)
								} catch (error) {
									console.log(error);
								}
							}
						} catch (error) {
							console.log(error);
						}
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


module.exports = protocol_logs