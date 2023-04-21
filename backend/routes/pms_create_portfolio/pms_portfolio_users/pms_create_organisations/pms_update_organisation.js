require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');

const db = require('../../../../pool-connection');
const {v4: uuidv4} = require('uuid')
var util = require('util')

const update_organisation = async(org_id,user_id,org_name,tax_id,address,city,country,res)=>{
	try {
        await db.getConnection(async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlSelect = "SELECT * FROM pms_users where user_id=?"
                let result =await execquery(sqlSelect,[user_id])
                console.log(result) 
                try {
                    let sqlupdate = "UPDATE pms_organisations_list SET name=?, address=?, tax_id=?, city=?, country=?,updated_time=?, updated_by=? where id=? "
                    let updatedres = await execquery(sqlupdate, [ org_name, address, tax_id, city, country, new Date().getTime(), user_id, org_id ])
                    console.log(updatedres);
                    try {
                        let sql = "UPDATE pms_party_list SET name=? where belongs_to=?"
                        let updatedres1 =await execquery(sql, [org_name, org_id]) 
                        console.log(updatedres1);
                        try {
                            const sqlSelect2 = "SELECT * FROM pms_organisations_list where id=?"
                            let getresult = await execquery(sqlSelect2,[org_id])
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
    }catch(error){
        console.log(error);
    }
}


module.exports = update_organisation