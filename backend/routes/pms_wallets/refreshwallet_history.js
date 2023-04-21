const db = require('../../pool-connection');
var util = require('util')
const refresh_wallet_history = async (walletId,res) => {
  console.log(walletId);
  try {
    console.log("1");
         db.getConnection( async (err, connection) => {
            console.log("2");
          if (err) throw (err)
          const sqlSelect = "SELECT * FROM pms_user_history where walletId=?"
            await connection.query (sqlSelect,[walletId], (err, result)=> {
            if (err) throw (err)
             res.send(result)
           })
           connection.release();
          }) //
  } catch (error) {
      console.log(error);
      res.send(error);
  }
}
module.exports = refresh_wallet_history;

