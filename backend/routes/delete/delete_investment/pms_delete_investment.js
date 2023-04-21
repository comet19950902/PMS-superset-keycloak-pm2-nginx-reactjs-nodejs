const db = require('../../../pool-connection');
var util = require('util');

const delete_investments = async(investment_id,res) =>{
    try {
        db.getConnection( async (err, connection) => {
            const execquery = util.promisify(connection.query.bind(connection));
            try {
                // const sqlsearch = "SELECT *  FROM pms_add_investment WHERE investment_id=?"
                // const result = await execquery(sqlsearch,[investment_id])

                // const sqlsearch_new = "SELECT *  FROM new_pms_add_investment WHERE new_invest_id=?"
                // const result_new = await execquery(sqlsearch_new,[investment_id])

                // const sqlsearch_new_log = "SELECT *  FROM pms_investment_data_logs WHERE investment_id=?"
                // const result_new_log = await execquery(sqlsearch_new_log,[investment_id])
            
                const sqlDelete = "DELETE FROM pms_add_investment WHERE investment_id=?"
                const delete_result = execquery( sqlDelete,[investment_id])
                console.log("Number of records deleted: " + delete_result.affectedRows);
                res.send("Deleted")
               
                const newsqlDelete = "DELETE FROM new_pms_add_investment WHERE new_invest_id=?"
                const newdelete_result = execquery( newsqlDelete,[investment_id])

                const sqlDelete2 = "DELETE FROM pms_investment_data_logs WHERE investment_id=?"
                const delete_result2 = execquery( sqlDelete2,[investment_id])
                console.log(delete_result2);  
                    try {
                        const sqlDelete = "DELETE FROM pms_add_investment WHERE investment_id=?"
                        const delete_result = execquery( sqlDelete,[investment_id])
                        console.log("Number of records deleted: " + delete_result.affectedRows);
                        res.send("Deleted")

                        // const newsqlDelete = "DELETE FROM new_pms_add_investment WHERE new_invest_id=?"
                        // const newdelete_result = execquery( newsqlDelete,[investment_id])
                        // console.log("Number of records deleted: " + newdelete_result.affectedRows);
                        try {
                            const sqlDelete2 = "DELETE FROM pms_investment_data_logs WHERE investment_id=?"
                            const delete_result2 = execquery( sqlDelete2,[investment_id])
                            console.log(delete_result2);
                            
                        } catch (error) {
                            res.send(error)
                        }
                        console.log(error);
                    } catch (error) {
                        res.send(error);
                    }
                

            } catch (error) {
                console.log(error);
            }            
            connection.release();
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = delete_investments