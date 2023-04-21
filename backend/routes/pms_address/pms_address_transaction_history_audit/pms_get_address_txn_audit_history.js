// require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util')
const db = require('../../../pool-connection');
var access_key = process.env.DEBANK_ACCESS_KEY;
var assetList;
var allresult = [];


const get_address_audit_history_list = async(res)=>{
    try {
        db.getConnection(async (err, connection) => {
        if (err) throw err
        const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlSearch1 = "Select * from pms_address_transaction_audit_logs ORDER BY timestamp DESC"
                let searchresult1 =await execquery(sqlSearch1)      
                    // console.log(searchresult1)
                    let transaction_data = searchresult1;
                    const sqlSelect2 = "Select * from pms_user_balance"
                    let result2 =await execquery(sqlSelect2)  
                    // console.log(result2);    
                    let address_data = result2;
                        const all_audit_result = transaction_data.map(transactiondata => {
                            const addressItem = address_data.find(addresses => addresses.address_id === transactiondata.self_address_id) 
                                transactiondata.wallet_id = addressItem ? addressItem.wallet_id : null;
                                transactiondata.portfolio_id = addressItem ? addressItem.portfolio_id : null;
                                transactiondata.address_name = addressItem ? addressItem.address_name : null;
                            return transactiondata ;
                        })
                        // let newdatares = all_audit_result.sort(function (a, b) {
                        //         var dateA = new Date(a.updated_time), dateB = new Date(b.updated_time)
                        //         return  dateB -dateA
                        //     });
                        res.send(all_audit_result)
            } catch (error) {
                console.log(error);
            }
            connection.release()
        })
    }catch(error){
        console.log(error);
    }

}



module.exports = get_address_audit_history_list