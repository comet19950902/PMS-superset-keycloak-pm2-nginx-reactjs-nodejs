require('dotenv').config()
const {v4: uuidv4} = require('uuid')
const db = require('../../../pool-connection');
var util = require('util');
const { resolveSoa } = require('dns');
const get_simple_protocol = async (walletName, wallet_purpose, portfolio_id, res) => {
	var uuiddno = uuidv4();
	console.log(uuiddno);
	var walletId = uuiddno;
	var wallet_name = walletName;
	try {
		db.getConnection(async (err, connection) => {
			if (err) throw err
				const execquery = util.promisify(connection.query.bind(connection))
				try {
					let searchquery1 = "SELECT * from pms_user_wallet WHERE wallet_name=?";
					let searchres1 = await execquery(searchquery1,[walletName]);
					if (searchres1 && searchres1.length>=1) {
						res.send("ALREADY EXIST");
					}
					else{
						try {
							let sql = "INSERT INTO pms_user_wallet(walletId, timeStamp, portfolio_id, wallet_name, wallet_purpose) VALUES (?,?,?,?,?);"
							let resultdata = await execquery(sql, [walletId, new Date().toUTCString(), portfolio_id, wallet_name, wallet_purpose])
								console.log(resultdata);
								let search2 = "SELECT * from pms_user_wallet WHERE wallet_name=?";
								let searchres = await execquery(search2,[walletName]);
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
						}	
					}	
				} catch (error) {
					console.log(error);
				}
			connection.release()
		})
	} catch (error) {
		res.send(error)
	}

}

module.exports = get_simple_protocol