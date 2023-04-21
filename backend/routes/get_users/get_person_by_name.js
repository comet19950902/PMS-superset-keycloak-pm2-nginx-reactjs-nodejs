
require('dotenv').config()
// const mysql = require('mysql');

var util = require('util')
const db = require('../../pool-connection')

const get_simple_protocol = async () => {
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
               const sqlSelect = "SELECT * FROM pms_party_list"
                let result = await execquery(sqlSelect)
                console.log(result) 
            } catch (error) {
              console.log(error);
            }
          connection.release()
        })
    } catch (error) {
        console.log(error);
    }             
}                          
     
    //  get_simple_protocol()
 module.exports = get_simple_protocol



  