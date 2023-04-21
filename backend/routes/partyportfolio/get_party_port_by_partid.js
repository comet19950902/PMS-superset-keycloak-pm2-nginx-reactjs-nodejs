const db = require('../../pool-connection');
var util = require('util')
const get_all_portfolio_party= async (party_id,res) => {
    console.log(party_id);
  try {
    await db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSelect = "SELECT * FROM pms_party_portfolio where party_id=?"
          connection.query (sqlSelect,[party_id],async (err, result)=> {        
            if (err) throw (err)  
            res.send(result) 
         })
         connection.release();
        })
} catch (error) {
 console.log(error);
}
}
module.exports = get_all_portfolio_party;

