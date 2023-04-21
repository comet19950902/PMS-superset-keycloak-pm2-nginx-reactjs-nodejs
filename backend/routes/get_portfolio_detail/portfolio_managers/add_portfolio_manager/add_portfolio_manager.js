require('dotenv').config()
// const mysql = require('mysql');

var util = require('util');
const db = require('../../../../pool-connection');


const add_porfolio_manager = async(user_id,accountant_id,portfolio_id,res) =>{
    try {
        db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                let sql = "REPLACE INTO pms_portfolio_manager(portfolio_account_id, portfolio_id, accountant_id, created_at, created_by) VALUES (?,?,?,?,?);"
                let resultdata =await execquery(sql,[portfolio_id + accountant_id, portfolio_id, accountant_id, new Date().toUTCString(),  user_id])
                console.log(resultdata);
                try {
                    let searchresult = await execquery('SELECT * FROM pms_portfolio_manager WHERE portfolio_account_id =?',[portfolio_id + accountant_id]);
                    console.log(searchresult);
                    res.send(searchresult);
                } catch (error) {
                    console.log(error);
                    res.send(error);
                }
            } catch (error) {
                console.log(error);
                res.send(error);
            }
            connection.release();
        })                        
    }catch(error){
        console.log(error);
    }
}

module.exports = add_porfolio_manager