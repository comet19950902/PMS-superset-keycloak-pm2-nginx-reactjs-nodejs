const db = require('../../pool-connection');
var util = require('util')
const fetch_address = async (address_id, wallet_id, portfolio_id,address_name,address_type,res) => {
  console.log(address_id);
  try {
    await  db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
          await connection.query (sqlSelect,[address_id],async (err, result)=> {        
          if (err) throw (err)
          // console.log(result);
          // console.log(result.length);
          if(result.length>=1){
            res.send("Address Already Exist With Another Wallet")
          }
          else if(result.length==0){
              // res.send("Address Added Successfully")
            if(address_name ==null || address_type==null || portfolio_id==null || wallet_id==null || address_id==null){
              res.send("Address Fields are empty. Please Give addess all requirements.")
              }
            else {
                if(address_type.toUpperCase()=='BTC' || address_type.toUpperCase()=='ETH' || address_type.toUpperCase()=='TRX'){
                // await addAddress(address_id,wallet_id,portfolio_id,address_name,address_type,res)
                  // await addnewaddress1(address_id, wallet_id, portfolio_id,address_name,address_type, res)
                  try {
                    await  db.getConnection( async (err, connection) => {
                    if (err) throw (err)
                    try {
                      const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
                      await connection.query (sqlSelect,[address_id], (err, updatedresult)=> {
                        if (err) throw (err)
                        console.log("updatedresult",updatedresult);
                        if(updatedresult && updatedresult.length>=1){
                          res.send(updatedresult);
                        }
                        else{
                          res.send("Not Updated")
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
                else{
                  res.send("Address Type is not Valid")
                }
              } 
            }
          })
          connection.release()
      })
} catch (error) {
 console.log(error);
}
}
module.exports = fetch_address;

