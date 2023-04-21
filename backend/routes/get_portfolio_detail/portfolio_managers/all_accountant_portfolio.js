

require('dotenv').config()
var util = require('util');
const db = require('../../../pool-connection');
const get_all_portfolios_accountant = async(res) =>{
    let search_portfolio;
        let searchresult;
    try {
        // let search_portfolio;
        // let searchresult;
        console.log("logggg");
        db.getConnection(async (err, connection) => {
            if (err) throw (err);
            console.log("logggg");

            const execquery = util.promisify(connection.query.bind(connection))
                try {
                    searchresult = await execquery('SELECT * FROM pms_portfolio_manager'); 
                    console.log("logggg1");
                    search_portfolio = await execquery('SELECT * FROM pms_portfolio');
                    // let search_accountant = await execquery('Select * from pms_users Where user_type like '%accountant%'')
                    let sql = "Select * from pms_users Where user_type like '%accountant%';"
                    let search_accountant =  await execquery(sql);
                    console.log(search_portfolio);
                     const all_audit_result = searchresult.map(accountantdata => {
                            const addressItem = search_portfolio.find(portfolios => portfolios.portfolio_id === accountantdata.portfolio_id) 
                                accountantdata.portfolio_name = addressItem ? addressItem.portfolio_name : null;
                            return accountantdata ;
                        })
                    const all_accountant_names = searchresult.map(accountantdata => {
                            const addressItem = search_accountant.find(portfolios => portfolios.user_id === accountantdata.accountant_id) 
                                accountantdata.accountant_name = addressItem ? addressItem.username : null;
                            return accountantdata ;
                        })
                        console.log(all_audit_result);
                        console.log(all_accountant_names);
                    res.send(searchresult);
                } catch (error) {
                    console.log(error);
                    res.send(error);
                }
                connection.release();
        });                       
    }catch(error){
        console.log(error);
        res.send(error);
    }
}

module.exports = get_all_portfolios_accountant