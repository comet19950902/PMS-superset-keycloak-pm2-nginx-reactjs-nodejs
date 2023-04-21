// var change_price = require('./debank_change_price')
require('dotenv').config()
// const axios = require('axios');
const mysql = require('mysql');
var host = process.env.DB_HOST;
var user = process.env.DB_USER;
var password = process.env.DB_PASSWORD;
var database = process.env.DB_DATABASE;
var access_key = process.env.DEBANK_ACCESS_KEY;

// const db = mysql.createPool({
// 	connectionLimit: 1000,
// 	host: host,
// 	user: user,
// 	password: password,
// 	database: database
// })
const db = require('./pool-connection')

const get_simple_protocol = async () => {
	try {
		await db.getConnection(async (err, connection) => {
			if (err) throw (err)
			try {
				const sqlSelect = "SELECT * FROM pms_party_list";
				await connection.query(sqlSelect, async (err, result) => {
					if (err) throw (err)
					let totalres = [];
					for (let user of result) {
						let party_portfolio_details = {};
						let party_id = user.party_id;
						party_portfolio_details.party_id = party_id;
						party_portfolio_details.user_id = user.belongs_to;
						party_portfolio_details.username = user.name;
						party_portfolio_details.category = user.category;
						let parties = [];
						try {
							newpartiedata = [];
							const sqlSelect2 = "SELECT * FROM pms_party_portfolio WHERE party_id=?";
							await connection.query(sqlSelect2, [party_id], async (err, result3) => {
								if (err) throw (err);
								var portfolioresult = result3;
								console.log(portfolioresult);
							})
							if (portfolioresult.length >= 1) {
								for (let i of portfolioresult) {
									let partydetails = {};
									partydetails.partyportfolioId = i.party_portfolio_id;
									partydetails.ownership_percent = i.ownership_percentage;
									partydetails.portfolio_id = i.portfolio_id;
									await parties.push(partydetails);
								}
								party_portfolio_details.parties = await parties;
							}
							console.log(party_portfolio_details);
							var newpersondata = party_portfolio_details;
							console.log(newpartiedata);
						} catch (error) {
							console.log(error);
						}
					}
				})
			} catch (error) {
				console.log(error);
			}
			connection.release()
		})
	} catch (error) {
		console.log(error);
	}
}

get_simple_protocol()
//  module.exports = get_simple_protocol