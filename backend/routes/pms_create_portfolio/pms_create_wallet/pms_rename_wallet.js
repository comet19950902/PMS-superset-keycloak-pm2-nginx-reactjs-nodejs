require('dotenv').config()
const {v4: uuidv4} = require('uuid')
const db = require('../../../pool-connection');
var util = require('util');
const { resolveSoa } = require('dns');
const get_simple_protocol = async (wallet_name,wallet_purpose, wallet_id, res) => {
	try {
		db.getConnection(async (err, connection) => {
			if (err) throw err
				const execquery = util.promisify(connection.query.bind(connection))
				try {
					// let searchquery1 = "SELECT * from pms_user_wallet WHERE wallet_name=?";
					// let searchres1 = await execquery(searchquery1,[wallet_name]);
					// if (searchres1 && searchres1.length>=1) {
					// 	res.send("Wallet already exist with this name.");
					// }
					// else{
						// try {
							const sqlUpdate = "UPDATE pms_user_wallet SET wallet_name=?,wallet_purpose=? Where walletId=?;"
                            let updatedresult = await execquery (sqlUpdate,[wallet_name,wallet_purpose,wallet_id])
                            console.log(updatedresult);
							try {
								let search2 = "SELECT * from pms_user_wallet WHERE walletId=?";
								let searchres = await execquery(search2,[wallet_id]);
									console.log(searchres);
									let walletresdata = searchres[0]
									console.log(walletresdata);
										if (walletresdata.length!=0) {
											res.send(walletresdata)
										}
										else{
											res.send("Wallet cannot be added.")
										}
								} catch (error) {
								console.log(error);
								res.send("Cannot Find Wallet.")
							}
						// } catch (error) {
						// 	console.log(error);
						// }	
					// }	
				} catch (error) {
					console.log(error);
					res.send("Unable to Add Address.")
				}
			connection.release()
		})
	} catch (error) {
		res.send(error)
	}

}

module.exports = get_simple_protocol