require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const Binance = require('binance-api-node').default
const ccxt = require ('ccxt')
var util = require('util')
const db = require('../../../pool-connection');    


const create_exchange_audit_history = async(user_id,symbol_order_id_api_key,comment,res) => {
    console.log(comment);
    try{
        await db.getConnection( async (err, connection) => {
            if(err) throw err;
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                let sqlSearch1 = "SELECT * FROM pms_user_exchange_trade_history where symbol_order_id_api_key=?"
                    let searchres1 = await execquery(sqlSearch1,[symbol_order_id_api_key])
                    console.log(searchres1);
                let sqlSearch2 = "SELECT * FROM pms_users where user_id=?"
                    let searchres2 = await execquery(sqlSearch2,[user_id])
                    console.log(searchres2);
                    try {
                        let sqlUpdate = "Update pms_user_exchange_trade_history SET comment=? WHERE symbol_order_id_api_key=?"
                        let updateres = await execquery(sqlUpdate,[comment,symbol_order_id_api_key])
                        console.log(updateres);
                        try {
                            let newDateadded = new Date().getTime()
                            let sqlInsert ="INSERT INTO pms_exchange_history_audit_logs (symbol_order_id_api_key_timestamp, symbol_order_id_api_key, created_by, created_time, timestamp, api_key, portfolio_id, previous_comment, new_comment, username, usertype, amount, price) Values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
                            let insertResult = await execquery(sqlInsert,[symbol_order_id_api_key+newDateadded, symbol_order_id_api_key ,user_id, new Date().toUTCString(), new Date().getTime(), searchres1[0].api_key, searchres1[0].portfolio_id, searchres1[0].comment ,comment, searchres2[0].username, searchres2[0].user_type, searchres1[0].amount, searchres1[0].price])
                                console.log(insertResult);
                                try {
                                    let auditsearch = "SELECT * FROM pms_exchange_history_audit_logs where symbol_order_id_api_key_timestamp=?"
                                    let auditres = await execquery(auditsearch,[symbol_order_id_api_key+newDateadded])
                                        console.log("exchangeauditresApiRes",auditres);
                                        res.send(auditres)
                                } catch (error) {
                                    console.log(error);
                                }
                        } catch (error) {
                            console.log(error);
                        }
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
        console.log(error);
    }
}


module.exports = create_exchange_audit_history
// add_exchange_history()