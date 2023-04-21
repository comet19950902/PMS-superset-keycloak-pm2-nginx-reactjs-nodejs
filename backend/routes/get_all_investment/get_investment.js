const db = require('../../pool-connection');
var util = require('util')
const get_investment = async (portfolio_id,res) => {
  console.log(portfolio_id);
  try {
    await  db.getConnection( async (err, connection) => {
        if (err) throw (err)
        try {
          const sqlSelect = "SELECT * FROM pms_add_investment where portfolio_id=?"
          await connection.query (sqlSelect,[portfolio_id], (err, result)=> {        
            if (err) throw (err)
          // console.log(result)
            res.send(result)
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
module.exports = get_investment;

