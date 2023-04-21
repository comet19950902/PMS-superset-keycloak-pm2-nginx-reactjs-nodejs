require('dotenv').config()

// const mysql = require('mysql');

const db = require('../../../pool-connection');
var util = require('util')
const execquery = util.promisify(db.query.bind(db))


const update_portfolio_name = async(portfolio_id,portfolio_name, res)=>{
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw err ;
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                let sqlsearch = "Select * from pms_portfolio Where portfolio_id=?"
                let searchres = await execquery(sqlsearch, [portfolio_id])
                console.log(searchres);
                    try {
                        const sqlEdit = "UPDATE pms_portfolio SET portfolio_name=? Where portfolio_id=?;"
                        let updatedresult = await execquery (sqlEdit,[portfolio_name,portfolio_id])
                        console.log(updatedresult);
                        try {
                            let updatedsearch = "Select * from pms_portfolio Where portfolio_id=?"
                            let updatedres = await execquery(updatedsearch, [portfolio_id])
                                console.log(updatedres);
                                res.send(updatedres)
                        } catch (error) {
                         console.log(error);   
                        }
                    } catch (error) {
                        console.log(error);
                    }
            } catch (error) {
                console.log(error);
            }
            connection.release()
        })
    }catch(error){
        console.log(error);
    }
}


module.exports = update_portfolio_name