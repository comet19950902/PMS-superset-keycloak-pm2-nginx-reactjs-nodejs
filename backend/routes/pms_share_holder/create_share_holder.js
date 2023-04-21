const axios = require('axios');
var util = require('util')
const v4 = require('uuid');
const { uuid } = require('uuidv4');

require('dotenv').config()
// const mysql = require('mysql');
const db = require('../../pool-connection')

const share_holder = async (share_holder_name, res) => {
  let sh_name= share_holder_name.trim()
  console.log('*******');
  // res.send(result.data);
  var date = new Date().toUTCString()
  console.log("gfff", date);
  var id = uuid();
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        let sql_name = "SELECT * FROM pms_share_holder where share_holder_name=?"
        let resultdata_name = await execquery(sql_name, [share_holder_name]);
        console.log(resultdata_name);
        if (resultdata_name.length >= 1) {
          try {
            res.send("Share Holder Name Already Exist")
          }
          catch (error) {
            console.log(error);
            res.send(error)
          }
        }
        else if ((resultdata_name.length == 0) && (sh_name.length !=0)) {
          console.log("elese")
          try {
            let sql = "REPLACE INTO pms_share_holder(share_holder_name,updated_time,holder_id) VALUES (?,?,?);"
            let resultdata = await execquery(sql, [share_holder_name, new Date().toUTCString(), id])
            console.log(resultdata);
            res.send(resultdata);
          } catch (error) {
            console.log(error);
            res.send(error)
          }
        }
        else if (sh_name.length == 0){
          try {
            res.send("Empty share holder name can not add")
          }
          catch (error) {
            console.log(error);
            res.send(error)
          }
        }
      }
      catch (error) {
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

module.exports = share_holder;