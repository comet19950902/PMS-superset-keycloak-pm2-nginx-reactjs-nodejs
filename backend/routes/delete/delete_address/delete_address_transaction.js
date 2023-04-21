require('dotenv').config()

const axios = require('axios');
// const mysql = require('mysql');

const db = require('../../../pool-connection');
var util = require('util')

const delete_address_transaction = async(address_id,res) => {
    console.log(address_id);
        try{
            await db.getConnection( async (err, connection) => {
            if (err) throw err 
            const execquery = util.promisify(connection.query.bind(connection));
            try {
                let sqlSearch1 = "SELECT * FROM pms_wallet_transaction_history_list Where address_id =?"
                let res =await execquery(sqlSearch1,[address_id]);
                console.log(res);
                try {
                    const sqlDelete4 = "DELETE FROM pms_wallet_transaction_history_list WHERE address_id=?"
                    let result4 = await execquery(sqlDelete4,[address_id])
                    console.log("Number of records deleted:" + result4.affectedRows);
                    for (let i of res) {
                        let transaction_id = i.transaction_id;
                        const sqlDelete4 = "DELETE FROM pms_address_transaction_audit_logs WHERE transaction_id=?"
                        let result4 = await execquery(sqlDelete4,[transaction_id]);
                        console.log(result4);
                    }   
                } catch (error) {
                    res.send(error);
                }
                try {
                    const sqlDelete_for_all_tron = "DELETE FROM all_transaction_data WHERE from_address=?"
                    let delete_result_for_tron = await execquery(sqlDelete_for_all_tron, [address_id]);
                    console.log(delete_result_for_tron);
                    // res.send(delete_result)
                } catch (error) {
                    console.log(error);
                    res.send(error);
                }
            } catch (error) {
                res.send(error)
            }
            connection.release()
            })
        }
        catch(error){
            res.send(error);
        } 
}


module.exports = delete_address_transaction
 
 
 
