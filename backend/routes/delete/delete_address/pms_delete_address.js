require('dotenv').config()

const axios = require('axios');
// const mysql = require('mysql');

const db = require('../../../pool-connection');
var util = require('util');
const delete_address_transaction = require('./delete_address_transaction');

const delete_address_data = async(address_id,res) => {
    console.log(address_id);
        try{
            await db.getConnection( async (err, connection) => {
            if (err) throw err 
            const execquery = util.promisify(connection.query.bind(connection));
                try {
                    const sqlDelete = "DELETE FROM pms_user_balance WHERE address_id=?"
                    let result = await execquery(sqlDelete,[address_id])
                    console.log("Number of records deleted:" + result.affectedRows);
                        try {
                            const sqlDelete2 = "DELETE FROM pms_user_history WHERE address_id=?"
                            let result2 = await execquery(sqlDelete2,[address_id])
                            console.log("Number of records deleted:" + result2.affectedRows);
                        } catch (error) {
                            console.log(error);
                        }
                        try {
                             const sqlDelete3 = "DELETE FROM pms_address_chain_list WHERE address_id=?"
                            let result3 = await execquery(sqlDelete3,[address_id])
                            console.log("Number of records deleted:" + result3.affectedRows);
                        } catch (error) {
                            console.log(error);
                        }
                       try {
                            // const sqlDelete4 = "DELETE FROM pms_wallet_transaction_history_list WHERE address_id=?"
                            // let result4 = await execquery(sqlDelete4,[address_id])
                            // console.log("Number of records deleted:" + result4.affectedRows);
                            await delete_address_transaction(address_id,res)
                       } catch (error) {
                        console.log(error);
                       }
                        try {
                            const sqlDelete5 = "DELETE FROM pms_wallet_chain_token_list WHERE address_id=?"
                                let result5 = await execquery(sqlDelete5,[address_id])
                            console.log("Number of records deleted:" + result5.affectedRows);
                        } catch (error) {
                            console.log(error);
                        }
                        try {
                            const sqlDelete6 = "DELETE FROM pms_wallet_simple_protocol WHERE address_id=?"
                            let result6 = await execquery(sqlDelete6,[address_id])
                            console.log("Number of records deleted:" + result6.affectedRows);
                        } catch (error) {
                            console.log(error);
                        }
                } catch (error) {
                    console.log(error);
                }
                connection.release();
            })
        }
        catch(error){
            res.send(error)
        }
}

module.exports = delete_address_data