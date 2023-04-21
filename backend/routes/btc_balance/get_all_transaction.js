
const db = require('../../pool-connection');
var util = require('util')

const get_all_transaction_data = async (portfolio_id,res) => {
  console.log(portfolio_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      if(portfolio_id !=null){
      try {
        console.log("connection address");
        let sql = "Select * FROM all_transaction_data WHERE portfolio_id=?";
        let resultdata = await execquery(sql,[portfolio_id]);
        console.log(resultdata);
        res.send(resultdata);
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }
    else if(portfolio_id == null){
      try {
        console.log("connection address");
        let sql_for_null = "Select * FROM all_transaction_data";
        let resultdata_for_null = await execquery(sql_for_null);
        console.log(resultdata_for_null);
        res.send(resultdata_for_null);
      } catch (error) {
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


module.exports = get_all_transaction_data;