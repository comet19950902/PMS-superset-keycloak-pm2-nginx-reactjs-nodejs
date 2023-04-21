
const axios = require('axios');
var util = require('util')
const v4 = require('uuid');
const { uuid } = require('uuidv4');

require('dotenv').config()
const db = require('../../pool-connection')
const get_pms_balance = async (e_id,creditor,res) => {
  console.log(creditor);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      if((e_id == null) && (creditor==null)){
      try {
        console.log("connection accountancy_ledger");
        let sql = "Select * FROM pms_balance";
        let resultdata = await execquery(sql);
          console.log(resultdata);
          res.send(resultdata);
      } catch (error) {
          console.log(error);
          res.send(error);
      }
    }
    else if ((creditor!=null) && (e_id == null)){
      console.log("adddd")
      try {
        console.log("connection accountancy_ledger");
        let sql = "Select * FROM pms_balance where creditor=? or debtor=?";
        let resultdata = await execquery(sql,[creditor,creditor]);
          console.log(resultdata);
          res.send(resultdata);
      } catch (error) {
          console.log(error);
          res.send(error);
      }
    }
    ///////////////
    else if (e_id !=null){
      try {
        console.log("connection accountancy_ledger");
        let sql = "Select * FROM pms_balance where e_id=?";
        let resultdata = await execquery(sql,[e_id]);
          console.log(resultdata);
          res.send(resultdata);
      } catch (error) {
          console.log(error);
          res.send(error);
      }
    }
    //////////////////
      connection.release();
    })
  } catch (error) {
      console.log(error);
      res.send(error);
  }
}

module.exports = get_pms_balance;