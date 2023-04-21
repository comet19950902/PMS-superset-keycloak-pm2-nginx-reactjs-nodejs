

require('dotenv').config()
var util = require('util');
const db = require('../../../../../pool-connection');


const delete_manager_portfolios = async(portfolio_accountant_id,res) =>{
    try {
        console.log("accountant_id",portfolio_accountant_id);
        await db.getConnection( async (err, connection) => {
            if (err) throw (err);
            const execquery = util.promisify(connection.query.bind(connection))
                try {
                    let searchresult = await execquery('Delete FROM pms_portfolio_manager WHERE portfolio_account_id =?',[portfolio_accountant_id]);
                    console.log(searchresult);
                    res.send(searchresult);
                } catch (error) {
                    console.log(error);
                    res.send(error);
                }
                connection.release();
        });                       
    }catch(error){
        console.log(error);
        res.send(error)
    }
}

module.exports = delete_manager_portfolios