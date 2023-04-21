const db = require('../../pool-connection');
var util = require('util')
const get_all_portfolio = async (portfolio_id,res) => {
    console.log(portfolio_id);
  try {
    await db.getConnection( async (err, connection) => {
        if (err) throw (err)
        try {
          const sqlSelect = "SELECT * FROM pms_party_portfolio where portfolio_id=?"
           connection.query (sqlSelect,[portfolio_id],async (err, result)=> {        
            if (err) throw (err)  
            res.send(result) 
          })
        } catch (error) {
         console.log(release); 
        }
        connection.release();
      })
} catch (error) {
 console.log(error);
}
}
module.exports = get_all_portfolio;

