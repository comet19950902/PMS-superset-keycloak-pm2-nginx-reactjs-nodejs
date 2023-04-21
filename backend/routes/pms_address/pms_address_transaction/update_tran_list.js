const axios = require('axios');
// const mysql = require('mysql');
const db = require('../../../pool-connection');
var util = require('util')
const get_wallets_list = async (address_id,res) => {
  console.log(address_id);
  try {
    db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection))
        try {
          const sqlSelect = "SELECT * FROM pms_wallet_transaction_history_list  Where address_id=?"
          let resultdata1 = await execquery(sqlSelect,[address_id],async (err, newresult)=> {        
            if (err) throw (err);
            if (newresult && newresult.length!=0) {
              console.log(newresult);
              res.send("Address Trsansaction History Updated")
            }
            else{
              res.send("No Transaction History")
            }
          })
        } catch (error) {
          console.log("Transaction History Not Updated");
          res.send("Transaction History Not Updated")
        }
        connection.release();
    })
  }
  catch(error){
    console.log(error);
    res.send("address is empty")
  }
}
module.exports = get_wallets_list;

