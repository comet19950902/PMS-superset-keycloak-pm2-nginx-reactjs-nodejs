const db = require('../../pool-connection');
var util = require('util')
const get_all_user= async (user_id,res) => {
    console.log(user_id);
  try {
    await  db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSelect = "SELECT * FROM pms_users where user_id=?"
          await connection.query (sqlSelect,[user_id],async (err, result)=> {        
          if (err) throw (err)
          console.log(result)
          console.log(result[0].user_type);
          user_type = await result[0].user_type;
          if(user_type.toLowerCase()=="admin" || user_type.toLowerCase()=="accountant"){
            const sqlSelect = "SELECT * FROM pms_users"
              await connection.query (sqlSelect,[user_id],async (error, result)=> {        
                if (error) throw (error)
                console.log(result);
                res.send(result)
              })
            }
            else{
              console.log("You are not a Authorised User.");
                res.send("You are not a Authorised User.")
            }
          // res.send(result) 
          })
          connection.release();
      })
} catch (error) {
 console.log(error);
}
}
module.exports = get_all_user;

