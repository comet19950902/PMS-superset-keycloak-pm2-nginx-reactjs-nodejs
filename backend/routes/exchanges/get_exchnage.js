const db = require('../../pool-connection');
var util = require('util')
const get_exchange = async (portfolio_id,res) => {
  console.log(portfolio_id);
  try{ 
    await db.getConnection( async (err, connection) => {
      if (err) throw (err)
        const sqlSelect = "SELECT * FROM pms_user_exchange_info where portfolio_id=?"
        connection.query (sqlSelect,[portfolio_id], (err, result)=> {
          if (err) throw (err)
          res.send(result) 
        })
        connection.release();
    }) //end of
  } catch (error) {
 console.log(error);
}
// try {
//   db.getConnection(async (err, connection) => {
//     if (err) throw (err)
//     const execquery = util.promisify(connection.query.bind(connection))
//     try {
//       console.log("connection address");
//       let sql = "Select * FROM pms_exchange_api_key_credentials WHERE portfolio_id =?";
//       let resultdata = await execquery(sql,[portfolio_id]);
//       console.log("YYYUU");
//       console.log(resultdata);
//       res.send(resultdata);
//     } catch (error) {
//       console.log(error);
//       res.send(error);
//     }
//     connection.release();
//   })
// } catch (error) {
//   console.log(error);
//   res.send(error);
// }
}
module.exports = get_exchange;

