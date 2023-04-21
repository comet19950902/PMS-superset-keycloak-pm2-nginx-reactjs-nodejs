require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');

const db = require('../../../../pool-connection');
const {v4: uuidv4} = require('uuid')
var util = require('util')

const get_simple_protocol = async (user_name, user_phone, email_id,user_id, res) => {
	var uuiddno = uuidv4();
	var base64uuid = Buffer(uuiddno).toString('base64');
	console.log(base64uuid);
	console.log(uuiddno);
	var username = user_name;
	var userphone = user_phone;
	var user_email_id = email_id;
	console.log(user_email_id);
	console.log(uuiddno);
	let uuid = uuiddno;
	let party_id = base64uuid;
	try {
		await db.getConnection(async (err, connection) => {
			if (err) throw err
			const execquery = util.promisify(connection.query.bind(connection))
			try {
				let sql = "INSERT INTO pms_person_list(id, name, phone, email_id, party_id,updated_by, updated_time) VALUES (?,?,?,?,?,?,?);"
				let resultdata =await execquery(sql, [uuid, username, userphone, user_email_id, party_id,user_id, new Date().getTime()])
					console.log(resultdata);
					const category = "person";
					try {
						let mysql = "INSERT INTO pms_party_list(party_id, belongs_to, created_at, name, category) VALUES (?,?,?,?,?);"
						let result =await execquery(mysql, [party_id, uuid, new Date().toUTCString(), username, category])
						console.log(result);
						try {
							let mysql = "Select * from pms_person_list WHERE party_id =?";
							let resultvalue =await execquery(mysql, [party_id])
							console.log(resultvalue);
							await res.send(resultvalue)
						} catch (error) {
							console.log(error);
						}
					} catch (error) {
						console.log(error);
					}
			}
			catch(error){
				console.log(error);
			}
			connection.release()
		})
	} catch (error) {
		res.send(error)
	}
}

module.exports = get_simple_protocol