
const db = require('../../../pool-connection');
var util = require('util')

const update_tron_transactions_comment = async (hash,comment,res) => {
  console.log(hash);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {

        
        const sqlSelect = "Update tron_transactions SET comment=? ,updated_time=? WHERE tron_address_id =?"
        let result =await execquery(sqlSelect,[comment, new Date().toUTCString() ,hash])       
        console.log("connection address");
//////////////////////////////all_tron////////////////////////////////////////
        const sqlSelect_for_tran = "Update all_transaction_data SET comment=? ,updated_time=? WHERE hash_id =?"
        let result_for_tran =await execquery(sqlSelect_for_tran,[comment, new Date().toUTCString() ,hash])       
        console.log("connection address for all tran");

        let sql = "Select * FROM tron_transactions WHERE hash =?";
        let resultdata = await execquery(sql,[hash]);

        ////////////////////////////////////////////////////////

        let sql_all_tron = "Select * FROM all_transaction_data WHERE hash_id =?";
        let resultdata_all_tron = await execquery(sql,[hash]);
        console.log(resultdata);
          console.log(resultdata);
          res.send(resultdata);
      } catch (error) {
          console.log(error);
          res.send(error);
      }
      connection.release();
    })
  } catch (error) {
      console.log(error);
      res.send(error);
  }
}

module.exports = update_tron_transactions_comment;