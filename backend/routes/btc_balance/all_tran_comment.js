
const db = require('../../pool-connection');
var util = require('util')

const create_transactions_comment_for_all = async (hash_id, comment, res) => {
  console.log(hash_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {

        // const sqlSelect = "Update btc_txc SET comment=? ,date_create=? WHERE hash_id =?"
        // let result =await execquery(sqlSelect,[comment, new Date().toUTCString() ,hash_id])       
        // console.log("connection address");
        try {
          const sqlSelect_for_all = "Update all_transaction_data SET comment=? ,updated_time=? WHERE hash_id =?"
          let result_for_tran = await execquery(sqlSelect_for_all, [comment, new Date().toUTCString(), hash_id])
          console.log("connection address for all tran");
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
        try {

          const sqlSelect = "Update btc_txc SET comment=? ,date_create=? WHERE hash_id =?"
          let result = await execquery(sqlSelect, [comment, new Date().toUTCString(), hash_id])
          console.log("connection address");
        } catch (error) {
          console.log(error);
          res.send(error);
        }
        try {
          let sql_btc = "Select * FROM btc_txc WHERE hash_id =?";
          let resultdata_btc = await execquery(sql_btc, [hash_id]);
          console.log(resultdata_btc);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }

        //////////////////////all comment///////////////
        try {
          const sqlSelect_for_tron = "Update tron_transactions SET comment=? ,updated_time=? WHERE hash =?"
          let result_for_tron = await execquery(sqlSelect_for_tron, [comment, new Date().toUTCString(), hash_id])
          console.log("connection address");

        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
        try {
          let sql_tron = "Select * FROM tron_transactions WHERE hash =?";
          let resultdata_tron = await execquery(sql_tron, [hash_id]);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
        ////////////////////////////////////////////////////////
        try {
          let sql_all_tron = "Select * FROM all_transaction_data WHERE hash_id =?";
          let resultdata = await execquery(sql_all_tron, [hash_id]);
          res.send(resultdata);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
        //////////////////////for  dbank/////////////////
        try {
          const sqlSelect_dbank = "Update pms_wallet_transaction_history_list SET comments=? ,updated_time=? WHERE transaction_id =?"
          let result_dbank = await execquery(sqlSelect_dbank, [comment, new Date().toUTCString(), hash_id])
          console.log(result_dbank)
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
        try {
          const sqlSelect2 = "Select * from pms_wallet_transaction_history_list WHERE transaction_id =?"
          let result2 = await execquery(sqlSelect2, [hash_id])
          console.log(result2)
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
        // console.log(resultdata);
        // res.send(resultdata);
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

module.exports = create_transactions_comment_for_all;