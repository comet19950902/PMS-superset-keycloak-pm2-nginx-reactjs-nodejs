// require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util')
const db = require('../../../pool-connection');
var access_key = process.env.DEBANK_ACCESS_KEY;
var assetList;
var allresult = [];


const create_audit_history_list = async (user_id,transaction_id,comments, res) => {
    console.log("comm",comments)
    // let address_id = newaddress_id ? newaddress_id : null;
    try {
        db.getConnection(async (err, connection) => {
            if (err) throw err
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlSearch1 = "Select * from pms_wallet_transaction_history_list Where transaction_id =?"
                let searchresult1 = await execquery(sqlSearch1, [transaction_id])
                console.log(searchresult1)
                const sqlSearch2 = "Select * from pms_users Where user_id =?"
                let searchresult2 = await execquery(sqlSearch2, [user_id])
                console.log(searchresult2)
                let transaction_data = searchresult1[0]
                let userData = searchresult2[0]
                const sqlInsert1 = "INSERT into pms_address_transaction_audit_logs (transaction_id_timestamp, self_address_id, other_address_id, asset_chain, amount, transaction_time, transaction_type, cate_id, send_data, recieve_data, created_at, comments, updated_time, updated_by, new_comment_added, username,usertype, transaction_id,timestamp) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                let insertresult = await execquery(sqlInsert1, [transaction_id + new Date().getTime(), transaction_data.address_id, transaction_data.other_wallet_address, transaction_data.asset_chain, transaction_data.amount, transaction_data.transaction_time, transaction_data.transaction_type, transaction_data.cate_id, transaction_data.send_data, transaction_data.recieve_data, transaction_data.created_at, transaction_data.comments, new Date().toUTCString(), user_id, comments, userData.username, userData.user_type, transaction_id, new Date().getTime()])
                console.log("all tarn history",insertresult)
                const sqlSelect = "Update pms_wallet_transaction_history_list SET comments=? ,updated_time=? WHERE transaction_id =?"
                let result = await execquery(sqlSelect, [comments, new Date().toUTCString(), transaction_id])
                console.log("aftyer ediy",comments)
                ///////////////////////////////////////////////////////for all tran//////////////////////////
                const sqlSelect_for_tran = "Update all_transaction_data SET comment=? ,updated_time=? WHERE hash_id =?"
                let result_for_tran = await execquery(sqlSelect_for_tran, [comments, new Date().toUTCString(), transaction_id])
                console.log("connection address for all tran");

                /////////////////////////////////////////////////////////////////

                const sqlSelect2 = "Select * from pms_wallet_transaction_history_list WHERE transaction_id =?"
                let result2 = await execquery(sqlSelect2, [transaction_id])
                console.log(result2)
/////////////////////////////for all tron////////////////////////////////////
                let sql_all_tron = "Select * FROM all_transaction_data WHERE hash_id =?";
                let resultdata_all_tron = await execquery(sql_all_tron, [transaction_id]);
                
                res.send(result2)

            } catch (error) {
                console.log(error);
            }
            connection.release()
        })
    } catch (error) {
        console.log(error);
    }
}



module.exports = create_audit_history_list