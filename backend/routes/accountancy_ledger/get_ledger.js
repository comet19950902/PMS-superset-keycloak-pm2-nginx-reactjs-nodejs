
const axios = require('axios');
var util = require('util')
const v4 = require('uuid');
const { uuid } = require('uuidv4');

require('dotenv').config()
const db = require('../../pool-connection')
const accountancy_ledger = async (res) => {
//   console.log(address_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        console.log("connection accountancy_ledger");
        let sql = "Select * FROM accountancy_ledger";
        let resultdata = await execquery(sql);
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

module.exports = accountancy_ledger;