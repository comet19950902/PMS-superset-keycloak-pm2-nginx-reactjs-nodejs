const db = require('../../pool-connection');
var util = require('util')
const fetch_wallets_balance = async (address_id,res) => {
  console.log(address_id);
  try {
    await  db.getConnection( async (err, connection) => {
     if (err) throw (err)
     try {
       const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
       await connection.query (sqlSelect,[address_id], (err, updatedresult)=> {
         if (err) throw (err)
         console.log(updatedresult);
         if(updatedresult && updatedresult.length>=1){
           res.send(updatedresult);
         }
       })
     } catch (error) {
       console.log(error);
     }
       connection.release();
     })
} catch (error) {
 console.log(error);
}
}
module.exports = fetch_wallets_balance;

