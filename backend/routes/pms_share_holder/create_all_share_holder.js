const axios = require('axios');
var util = require('util')
const v4 = require('uuid');
const { uuid } = require('uuidv4');

require('dotenv').config()
// const mysql = require('mysql');
const db = require('../../pool-connection')

const all_share_holder = async (holder_id,name,res) => {
    // console.log('*******',address_id);
    // res.send(result.data);
    var date = new Date().toUTCString()
    console.log("gfff",date);
    var id = uuid();
    try {
      db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection))
        try {
          let sql = "REPLACE INTO pms_shareholder_data(share_id,updated_time,holder_id,name) VALUES (?,?,?,?);"
          let resultdata = await execquery(sql, [id,new Date().toUTCString(),holder_id,name])
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
  
module.exports = all_share_holder;