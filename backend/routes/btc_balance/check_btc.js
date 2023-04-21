
const db = require('../../pool-connection');
var util = require('util')
var btc_balance = require('./btc_balance_create_api');

const check_btc = async (btc_address_id,address_type,portfolio_id,wallet_id,address_name,res) => {
  console.log(btc_address_id);
  try {
    db.getConnection(async (err, connection) => {
    //     if (err) throw (err)
    //   const sqlSelect = "SELECT * FROM tron_balance where address_id=?"
    //     await connection.query (sqlSelect,[address_id],async (err, result)=> {        
    //     if (err) throw (err)
    //     if(result.length>=1){
    //       res.send("Address Already Exist With Another Wallet or Portfolio")
    //     }
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        console.log("connection address");
        let sql = "SELECT * FROM btc_balance where btc_address_id=?"
        let resultdata = await execquery(sql,[btc_address_id]);
        console.log(resultdata);
        if(resultdata.length>=1){
            res.send("Address Already Exist With Another Wallet or Portfolio")
        }
        else if(resultdata.length==0){
            console.log("elese")
            await btc_balance(btc_address_id,address_type,portfolio_id,wallet_id,address_name,res);
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

module.exports = check_btc;