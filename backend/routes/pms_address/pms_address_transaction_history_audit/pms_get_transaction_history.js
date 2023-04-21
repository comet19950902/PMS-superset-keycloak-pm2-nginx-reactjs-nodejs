// require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util')
const db = require('../../../pool-connection');
var access_key = process.env.DEBANK_ACCESS_KEY;
var assetList;
var allresult = [];

let offsetvalue = 10;
const get_address_audit_history_list = async()=>{
    try {
        db.getConnection(async (err, connection) => {
        if (err) throw err
        const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlSearch1 = "Select * from pms_wallet_transaction_history_list LIMIT 10 OFFSET "+offsetvalue;
                let searchresult1 =await execquery(sqlSearch1)      
                    console.log(searchresult1)
                    // res.send(all_audit_result)
            } catch (error) {
                console.log(error);
            }
            connection.release()
        })
    }catch(error){
        console.log(error);
    }
}


get_address_audit_history_list()
// module.exports = get_address_audit_history_list