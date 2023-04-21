// require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util');
var access_key = process.env.DEBANK_ACCESS_KEY;
const db = require('../../pool-connection');
var assetList;
var allresult = [];

const chain_token_logs = async(address_id,chain_id_of_address, res) =>{
    try {
        db.getConnection(async (err, connection) => {
			if (err) throw err
            const execquery = util.promisify(connection.query.bind(connection))
            try { 
                const sqlSelect = "SELECT * FROM pms_wallet_chain_token_list where address_id=? and token_chain_id =?";
                    let tokenresult =  await execquery(sqlSelect, [address_id,chain_id_of_address]);
                    console.log("tokenresult", tokenresult);
                    for(let tokendata of tokenresult){
                        console.log("tokendata");
                        let insertsql = "INSERT INTO pms_wallet_chain_token_logs (address_chain_token_time ,wallet_chain_token_id, token_id, token_name, token_symbol, token_optimized_symbol, token_chain_id, amount_time_at, token_amount, token_price, is_wallet, data_created_at, logo_url, raw_amount ,address_id, created_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
							let tokenlogres=  await execquery(insertsql, [tokendata.wallet_chain_token_id + new Date().getTime(), tokendata.wallet_chain_token_id, tokendata.token_id, tokendata.token_name, tokendata.token_symbol, tokendata.token_optimized_symbol, tokendata.token_chain_id, tokendata.amount_time_at, tokendata.token_amount, tokendata.token_price, tokendata.is_wallet, tokendata.data_created_at, tokendata.logo_url, tokendata.raw_amount, tokendata.address_id, new Date().getTime() ])
							console.log(tokenlogres);
                    }
                    await get_token_list(address_id, res)
            } catch (error) {
                console.log(error);
            }
            connection.release()
        })
    } catch (error) {
        console.log(error);
    }

}

const get_token_list = async (address_id, res) => {
	try {
		db.getConnection(async (err, connection) => {
			if (err) throw err
			const execquery = util.promisify(connection.query.bind(connection))
                try {
                    const sqlSelect = "SELECT * FROM pms_address_chain_list where address_id=?"
                    let result =  await execquery(sqlSelect, [address_id])
                    console.log(result);
                    let assetList = result;
                    for (const asset of assetList) {
                            let assetidinuse = asset.asset_id;
                            console.log("asset_in_use", assetidinuse);
                            var chainresult = await axios.get('https://pro-openapi.debank.com/v1/user/token_list?id=' + address_id + '&chain_id=' + assetidinuse + '&is_all=' + false + '&has_balance=' + true + '&time_at=' + new Date().getTime(), {
                                headers: {
                                    'Accesskey': access_key,
                                    'accept': 'application/json',
                                }
                            })
                            console.log(chainresult.data);
                            for (const element of chainresult.data) {
                                let history_list_data = element;
                                console.log("element_value", element);
                                let transTime = new Date(element.time_at * 1000);
                                var transactionDate = transTime.toUTCString();
                                let sql = "REPLACE INTO pms_wallet_chain_token_list (wallet_chain_token_id, token_id, token_name, token_symbol, token_optimized_symbol, token_chain_id, amount_time_at, token_amount, token_price, is_wallet, data_created_at, logo_url, raw_amount ,address_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                                let tokenres=  await execquery(sql, [address_id + element.chain + element.id, element.id, element.name, element.symbol, element.optimized_symbol, element.chain, element.time_at, element.amount, element.price, element.is_wallet, new Date().toUTCString(), element.logo_url, element.raw_amount, address_id])
                                    allresult.push(tokenres.affectedRows)
                            }
                    }
                } catch (error) {
                console.log(error);
            }
            connection.release();
    	})
	}
	catch(error){
		console.log(error);
	}
}

// chain_token_logs()
module.exports = chain_token_logs;