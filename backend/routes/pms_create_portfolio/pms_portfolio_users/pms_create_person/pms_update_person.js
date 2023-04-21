require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');

const db = require('../../../../pool-connection');
const {v4: uuidv4} = require('uuid')
var util = require('util')

const update_person = async(person_id,user_id,user_name,phone,email_id,res)=>{
	try {
        await db.getConnection(async (err, connection) => {
            if (err) throw err
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlSelect = "SELECT * FROM pms_users where user_id=?"
                let result = await execquery(sqlSelect,[user_id])
                console.log(result)      
                try {
                    let sqlupdate = "UPDATE pms_person_list SET name=?, phone=?, email_id=?,updated_by=?, updated_time=? where id=?"
                    let updatedres = await execquery(sqlupdate, [ user_name, phone, email_id,user_id, new Date().getTime(), person_id ])   
                    console.log(updatedres);
                    try {
                        let sqlupdate2 = "UPDATE pms_party_list SET name=? where belongs_to=?"
                        let updatedres2 =await execquery(sqlupdate2, [user_name, person_id]) 
                        console.log(updatedres2);
                        try {
                            const sqlSelect2 = "SELECT * FROM pms_person_list where id=?"
                            let getresult =await execquery(sqlSelect2,[person_id])
                            console.log(getresult)
                            res.send(getresult)
                        } catch (error) {
                            console.log(error);
                        }
                    } catch (error) {
                       console.log(error); 
                    }
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }   
            connection.release()     
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = update_person;

