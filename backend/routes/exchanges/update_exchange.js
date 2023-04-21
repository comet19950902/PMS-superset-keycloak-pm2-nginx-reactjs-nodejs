
const db = require('../../pool-connection');
var util = require('util')


const update_exchange = async (exchange_name,apikey,res) => {
  console.log(exchange_name);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
     // pms_exchange_api_key_credentials
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        const sqlSelect = "Update pms_user_exchange_info SET exchange_name=? ,updateTime=? WHERE apikey =?"
        let result =await execquery(sqlSelect,[exchange_name, new Date().toUTCString() ,apikey])       
        // console.log("connection address");
        // console.log(result);
        res.send(result);
      } catch (error) {
          console.log(error);
          res.send(error);
      }
      ////////////////////////exchange name update/////////////
      try {
        const sqlSelect_credentials = "Update pms_exchange_api_key_credentials SET exchange_name=? ,created_date=? WHERE exchange_apikey =?"
        let result_credentials =await execquery(sqlSelect_credentials,[exchange_name, new Date().toUTCString() ,apikey])       
        console.log("connection address 2");
        console.log(result_credentials);
        // res.send(result);
      } catch (error) {
          console.log(error);
          res.send(error);
      }
      /////////////////////////////////
      connection.release();
    })
  } catch (error) {
      console.log(error);
      res.send(error);
  }
}

module.exports = update_exchange;