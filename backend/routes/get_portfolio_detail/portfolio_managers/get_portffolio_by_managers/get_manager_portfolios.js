

require('dotenv').config()
var util = require('util');
const db = require('../../../../pool-connection');


const get_manager_portfolios = async(accountant_id,res) =>{
    try {
        console.log("accountant_id",accountant_id);
        await db.getConnection( async (err, connection) => {
            if (err) throw (err);
            const execquery = util.promisify(connection.query.bind(connection))
                try {
                    let searchresult = await execquery('SELECT * FROM pms_portfolio_manager WHERE accountant_id =?',[accountant_id]);
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

module.exports = get_manager_portfolios