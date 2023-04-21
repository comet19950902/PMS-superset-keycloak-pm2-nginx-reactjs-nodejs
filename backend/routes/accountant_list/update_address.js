require('dotenv').config()
const db= require('../../pool-connection'); 
var util = require('util')

const  update_address = async(res) =>{
    try {
        db.getConnection( async (err, connection) => {
            if (err) throw (err)
      const sqlSelect = "SELECT * FROM pms_users where user_id=?"
        await connection.query (sqlSelect,[admin_id],async (err, result)=> {        
          if (err) throw (err)
          console.log(result)
          console.log(result[0].user_type);
          user_type = await result[0].user_type;
            if(user_type.toLowerCase()=="admin" || user_type.toLowerCase()=="accountant"){
              let sql = "UPDATE pms_user_balance SET user_id=?, wallet_id=?, portfolio_id=?,  timeStamp=? where  address_id=?;"
                await db.query(sql, [user_id, wallet_id, new Date().toUTCString(), address_id ],async function (error, updatedres, updatedfields) {     
                  if (error) throw (error)
                  console.log(updatedres);
                  res.send(updatedres)
                })
              }
          else{
            console.log("You are not a Authorised User.");
            res.send("You are not a Authorised User.")
          }
        })
        connection.release();
      }) //end of connection.query()
    }catch(error){
        console.log(error);
        res.send(error);
    }

}
module.exports = update_address ;
