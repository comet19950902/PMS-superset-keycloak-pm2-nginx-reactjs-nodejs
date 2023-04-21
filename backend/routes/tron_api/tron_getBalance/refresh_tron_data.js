
require('dotenv').config()
var util = require('util')
const db = require('../../../pool-connection')

const transaction_history = async (address_id,res) => {
    try {
       await  db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection))
       try {
         const sqlSelect = "SELECT * FROM transaction_history_list where address_id=?"
          let result = await execquery(sqlSelect,[address_id])      
            res.send(result) 
       } catch (error) {
        res.send(error)
       }
        connection.release();
      }) 
    } catch (error) {
        console.log(error);
        res.send(error);
    }             
}                          
         //  get_simple_protocol()
 module.exports = transaction_history
