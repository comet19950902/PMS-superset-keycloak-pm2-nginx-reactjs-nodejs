require('dotenv').config()
const db= require('../../pool-connection'); 
var util = require('util')

const  delete_address = async(address_id,res) =>{
    try {
        await  db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
              await connection.query (sqlSelect,[address_id],async (err, address_result)=> {   
                console.log(address_result);
                console.log(address_result.length);
                 if(address_result && address_result.length==0){
                  res.send("Address Deleted Successfully")
                 }
                 else{
                  res.send("Address Not Deleted")
                 }
              })
              connection.release()
          }) 
       //end of connection.query()
    }catch(error){
        console.log(error);
        res.send(error);
    }

}
module.exports = delete_address ;
