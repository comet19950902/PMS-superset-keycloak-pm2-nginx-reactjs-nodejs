const db = require('../../pool-connection');
var util = require('util')
const get_wallets = async (portfolio_id,res) => {
  console.log(portfolio_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))

      // let portfolio_id_data=[];
      // portfolio_id_data.push(portfolio_id)
      // console.log(portfolio_id_data)
      if(portfolio_id !=null){
      try {
        console.log("connection address");
        let sql = "SELECT * FROM pms_user_wallet where (portfolio_id) IN (?)";
        let resultdata = await execquery(sql,[portfolio_id]);
          console.log(resultdata);
          res.send(resultdata);
      } 
    catch (error) {
          console.log(error);
          res.send(error);
      }
      }
      else{
        try {
          console.log("connection address");
          let sql_null = "SELECT * FROM pms_user_wallet";
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
}

module.exports = get_wallets;

