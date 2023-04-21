// require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util')
const db = require('../../../pool-connection');
var access_key = process.env.DEBANK_ACCESS_KEY;
var assetList;
var allresult = [];


const create_tron_audit_history_list = async(user_id,hash,comment,res)=>{
  // let address_id = newaddress_id ? newaddress_id : null;
  try {
	db.getConnection(async (err, connection) => {
	if (err) throw err
    const execquery = util.promisify(connection.query.bind(connection))
        try {
            const sqlSearch1 = "Select * from tron_transactions Where hash =?"
            let searchresult1 =await execquery(sqlSearch1,[hash])      
                console.log(searchresult1)
                const sqlSearch2 = "Select * from pms_users Where user_id =?"
                let searchresult2 =await execquery(sqlSearch2,[user_id])      
                console.log(searchresult2)
                    let transaction_data = searchresult1[0]
                    let userData = searchresult2[0]
                    const sqlInsert1 = "INSERT into tron_transaction_audit_logs (hash_timestamp, block,portfolio_id,wallet_id,updated_time,token_logo,tokenName,address_id,address_type,ownerAddress,comments, updated_by, new_comment_added, username,usertype,hash,timestamp) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult =await execquery(sqlInsert1,[hash + new Date().getTime(), transaction_data.block, transaction_data.portfolio_id, transaction_data.wallet_id,new Date().getTime() ,transaction_data.token_logo, transaction_data.tokenName, transaction_data.address_id, transaction_data.address_type, transaction_data.ownerAddress, transaction_data.comment, user_id, comment, userData.username, userData.user_type, hash, new Date().getTime()])       
                        console.log(insertresult)
                        const sqlSelect = "Update tron_transactions SET comment=? ,updated_time=? WHERE hash =?"
                        let result =await execquery(sqlSelect,[comment, new Date().toUTCString() ,hash])       
                            console.log(result);

                            const sqlSelect_for_tran = "Update all_transaction_data SET comment=? ,updated_time=? WHERE hash_id =?"
                            let result_for_tran =await execquery(sqlSelect_for_tran,[comment, new Date().toUTCString() ,hash])       
                            console.log("connection address for all tran");
                        
                            const sqlSelect2 = "Select * from tron_transactions WHERE hash =?"
                            let result2 =await execquery(sqlSelect2,[hash])      
                                console.log(result2)

                                let sql_all_tron = "Select * FROM all_transaction_data WHERE hash_id =?";
                                let resultdata = await execquery(sql_all_tron,[hash]);
                                res.send(result2)
        } catch (error) {
            console.log(error);
        }
        connection.release()
        })
    }catch(error){
        console.log(error);
    }
}



module.exports = create_tron_audit_history_list