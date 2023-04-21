
require('dotenv').config()
// const mysql = require('mysql');
var util = require('util')
const db = require('../../../pool-connection');

const get_all_organisation = async (res,offsetno) => {
    let newoffset = offsetno ? parseFloat(offsetno) : 0;
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
               const sqlSelect = "SELECT * FROM pms_organisations_list ORDER BY updated_time DESC LIMIT 200 OffSET" +" "+newoffset
                let result = await execquery(sqlSelect)
                    console.log(result) 
                    res.send(result)
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
 module.exports = get_all_organisation



  