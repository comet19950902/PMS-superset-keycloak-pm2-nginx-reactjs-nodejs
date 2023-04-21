
const db = require('../../pool-connection');
var util = require('util')

const create_btc_transactions_comment = async (hash_id,comment,res) => {
  console.log(hash_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {

        const sqlSelect = "Update btc_txc SET comment=? ,date_create=? WHERE hash_id =?"
        let result =await execquery(sqlSelect,[comment, new Date().toUTCString() ,hash_id])       
        console.log("connection address");

        const sqlSelect_for_tran = "Update all_transaction_data SET comment=? ,updated_time=? WHERE hash_id =?"
        let result_for_tran =await execquery(sqlSelect_for_tran,[comment, new Date().toUTCString() ,hash_id])       
        console.log("connection address for all tran");

        let sql = "Select * FROM btc_txc WHERE hash_id =?";
        let resultdata = await execquery(sql,[hash_id]);
        console.log(resultdata);

        //////////////////////all comment///////////////

        let sql_all_tron = "Select * FROM all_transaction_data WHERE hash_id =?";
        let resultdata_all_tron = await execquery(sql_all_tron,[hash_id]);
        
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

module.exports = create_btc_transactions_comment;