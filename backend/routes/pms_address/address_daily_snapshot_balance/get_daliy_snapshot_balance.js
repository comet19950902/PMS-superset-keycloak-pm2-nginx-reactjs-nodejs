
require('dotenv').config()
// const mysql = require('mysql');

var util = require('util')
const db = require('../../../pool-connection')

const get_address_daily_snapshot = async (address_id,res) => {
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
               const sqlSelect = "SELECT * FROM pms_address_daily_snapshot Where address_id =?"
                let result = await execquery(sqlSelect,[address_id])
                console.log(result) 
                    result.sort(function(a, b) {
						var dateA = new Date(a.timeStamp),
							dateB = new Date(b.timeStamp)
						return dateB - dateA
					});
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
     
module.exports = get_address_daily_snapshot
//  module.exports = get_simple_protocol



  