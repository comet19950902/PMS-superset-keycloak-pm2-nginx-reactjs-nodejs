
const db = require('../../../pool-connection');
var util = require('util')
const tron_balance = require('./get_tronBalance');

const check_tron = async (address_id,wallet_id,portfolio_id,address_name,address_type,res) => {
  console.log(address_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        console.log("connection address");
        let sql = "SELECT * FROM tron_balance where address_id=?"
        let resultdata = await execquery(sql,[address_id]);
        console.log(resultdata);
        if(resultdata.length>=1){
            res.send("Address Already Exist With Another Wallet or Portfolio")
        }
        else if(resultdata.length==0){
            console.log("elese")
            await tron_balance(address_id, wallet_id, portfolio_id,address_name,address_type,res);
        }
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

module.exports = check_tron;