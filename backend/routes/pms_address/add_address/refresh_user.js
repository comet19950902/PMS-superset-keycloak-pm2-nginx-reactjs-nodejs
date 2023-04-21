const db = require('../../../pool-connection');
var util = require('util')
const refresh_user = async (address_id,res) => {
  console.log(wallet_id);
  try {
      await db.getConnection( async (err, connection) => {
          if (err) throw (err)
            const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
            await connection.query (sqlSelect,[address_id], (err, result)=> {
              if (err) throw (err)
              res.send(result) 
            })
            connection.release();
        }) //end of
  } catch (error) {
      console.log(error);
      res.send(error);
  }
}
module.exports = refresh_user;