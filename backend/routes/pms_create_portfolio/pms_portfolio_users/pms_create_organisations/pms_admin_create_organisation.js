require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const {
	v4: uuidv4
} = require('uuid')

const db = require('../../../../pool-connection');
var util = require('util')

const get_simple_protocol = async (org_name, address, tax_id, city, country,user_id, res) => {
	var uuiddno = uuidv4();
	console.log(uuiddno);
	var orgname = org_name ? org_name : null;
	var tax_id = tax_id ? tax_id : null;
	var address = address ? address : null;
	var country = country ? country : null;
	var city = city ? city : null;
	var base64uuid = Buffer(uuiddno).toString('base64');
	console.log(base64uuid);
	console.log(uuiddno);
	let uuid = uuiddno;
	let party_id = base64uuid;
	try {
		await db.getConnection(async (err, connection) => {
			if (err) throw err;
			const execquery = util.promisify(connection.query.bind(connection))
			try {
				let sql = "INSERT INTO pms_organisations_list(id, name, tax_id, address, country, city, party_id,updated_by, updated_time) VALUES (?,?,?,?,?,?,?,?,?);"
				let resultdata =await execquery(sql, [uuid, orgname, tax_id, address, country, city, party_id, user_id, new Date().getTime()])
					console.log(resultdata);
					const category = "organisation";
					try {
						let mysql = "INSERT INTO pms_party_list(party_id, belongs_to, created_at, name, category) VALUES (?,?,?,?,?);"
						let result = await execquery(mysql, [party_id, uuid, new Date().toUTCString(), orgname, category])
						console.log(result);
						try {
							let mysql2 = "Select * from pms_organisations_list WHERE party_id =?";
							let resultvalue = await execquery(mysql2, [party_id])
								console.log(resultvalue);
								res.send(resultvalue)
						} catch (error) {
							console.log(error);
						}
					} catch (error) {
						console.log(error);
					}
			} catch(error) {
				console.log("error",error);
				res.send("Organisation already exist with new Entry. Please use with different name")
			}
			connection.release()
		})
	} catch (error) {
		res.send(error)
	}

}

module.exports = get_simple_protocol