const axios = require('axios');
var util = require('util')
require('dotenv').config()
// const mysql = require('mysql');
const db = require('../../pool-connection')

const elliptic = async (address_id,wallet_id,portfolio_id,address_name,address_type,res) => {
    console.log('*******',address_id);
    // res.send(result.data);
    var date = new Date().toUTCString()
    console.log("gfff",date);
  
    try {
      db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection))
        try {
          let refrence_address = '0x' + address_id;
          let sql = "REPLACE INTO pms_elliptic_report(address_id,wallet_id,portfolio_id,address_name,address_type,date_updated) VALUES (?,?,?,?,?,?);"
          let resultdata = await execquery(sql, [address_id,wallet_id,portfolio_id,address_name,address_type,new Date().toUTCString()])
          console.log(resultdata);
          res.send(resultdata);
        } catch (error) {
          console.log(error);
          res.send(error)
        }
        connection.release();
      })
    } catch (error) {
      console.log(error);
      res.send(error);
  
    }
  
  }
  
module.exports = elliptic;