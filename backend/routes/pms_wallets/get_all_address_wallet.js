const db = require('../../pool-connection');
var util = require('util')
const get_all_address_wallets = async (wallet_id,res) => {
  console.log(wallet_id);

  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))

      
      let portfolio_id_data=[];
      portfolio_id_data.push(wallet_id)
      console.log(portfolio_id_data)
      if(wallet_id !=null){
      try {
        console.log("connection address");
        let sql = "SELECT * FROM pms_user_balance where (wallet_id) IN (?)";
        let resultdata = await execquery(sql,[wallet_id]);
          console.log(resultdata);
          res.send(resultdata);
      } 
    catch (error) {
          console.log(error);
          res.send(error);
      }
      }
      else if(wallet_id ==null){
        try {
          console.log("connection address");
          let sql_null = "SELECT * FROM pms_user_balance";
          let resultdata_null = await execquery(sql_null);
            console.log(resultdata_null);
            res.send(resultdata_null);
        } 
      catch (error) {
            console.log(error);
            res.send(error);
        }
      }
      connection.release();
    })
  } catch (error) {
      console.log(error);
      res.send(error);
  }
  // try {
  //   await db.getConnection( async (err, connection) => {
  //   if (err) throw (err)
  //   const sqlSelect = "SELECT * FROM pms_user_balance where wallet_id=?"
  //     await connection.query (sqlSelect,[wallet_id], (err, result)=> {        
  //     if (err) throw (err)
  //     console.log(result)
  //     res.send(result) 
  //     })
  //     connection.release();
  //   })
  // } catch (error) {
  //     console.log(error);
  //     res.send(error);
  // }
}
module.exports = get_all_address_wallets;