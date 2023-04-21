require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util')
const {v4: uuidv4} = require('uuid')
const db = require('../../pool-connection'); 

const get_simple_protocol = async (portfolio_name, person_id, res) => {
	let uuiddno = uuidv4();
	let base64uuid = Buffer(uuiddno).toString('base64');
	await db.getConnection(async (err, connection) => {
		if (err) throw err;
		const execquery = util.promisify(connection.query.bind(connection))
		try {
			let searchquery1 = "SELECT * from pms_portfolio WHERE portfolio_name=?";
				let searchres1 = await execquery(searchquery1,[portfolio_name]);
				if (searchres1 && searchres1.length>=1) {
					res.send("ALREADY EXIST");
				}
				else{
					try {
						let sql = "INSERT INTO pms_portfolio(portfolio_id ,portfolio_name,updated_date, updated_by) VALUES (?,?,?,?);"
					let resultdata =await execquery(sql, [base64uuid, portfolio_name, new Date().toUTCString(), person_id])
						console.log(resultdata);
						let search2 = "SELECT * from pms_portfolio WHERE portfolio_name=?";
						let searchres = await execquery(search2,[portfolio_name]);
							console.log(searchres);
							let portfolioresdata = searchres[0]
							console.log(portfolioresdata);
								if (portfolioresdata.length!=0) {
									res.send(portfolioresdata)
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
}


module.exports = get_simple_protocol