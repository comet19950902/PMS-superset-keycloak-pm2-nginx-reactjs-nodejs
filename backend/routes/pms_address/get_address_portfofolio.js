const db = require('../../pool-connection');
var util = require('util')
const get_address_portfolio= async (portfolio_id,res) => {
    console.log(portfolio_id);
  try {
    await  db.getConnection( async (err, connection) => {
        if (err) throw (err)
            const sqlSelect = "SELECT * FROM pms_user_balance where portfolio_id=?" 
              connection.query (sqlSelect,[portfolio_id],async (error, result)=> {        
                if (error) throw (error)
                console.log(result);
                res.send(result)
              })
        connection.release();
        })
} catch (error) {
 console.log(error);
}
}
module.exports = get_address_portfolio;

