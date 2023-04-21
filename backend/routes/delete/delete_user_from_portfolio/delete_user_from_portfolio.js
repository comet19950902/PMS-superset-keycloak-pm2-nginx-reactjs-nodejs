
const db = require('../../../pool-connection');
var util = require('util')

const  delete_portfolio_user = async(portfolio_id,party_id,res)=>{
    try {
        db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlDelete = "DELETE FROM pms_party_portfolio WHERE party_portfolio_id=?"
                let result = await execquery(sqlDelete,[portfolio_id+party_id])
                console.log("Number of records deleted:" + result.affectedRows);
                res.send(result) 
            } catch (error) {
                console.log(error);
              }
              connection.release();
        })
    } catch (error) {
     console.log(error);   
    }
}


module.exports =delete_portfolio_user;
