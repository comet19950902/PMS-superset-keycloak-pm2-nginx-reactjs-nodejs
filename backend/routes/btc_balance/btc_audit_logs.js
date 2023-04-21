// require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util')
const db = require('../../pool-connection');
var access_key = process.env.DEBANK_ACCESS_KEY;
var assetList;
var allresult = [];


const create_btc_audit_logs = async(user_id,hash_id,comment,res)=>{
    let comment_data

  // let address_id = newaddress_id ? newaddress_id : null;
  try {
	db.getConnection(async (err, connection) => {
	if (err) throw err
    const execquery = util.promisify(connection.query.bind(connection))
        try {
            const sqlSearch1 = "Select * from btc_txc"
            let searchresult1 =await execquery(sqlSearch1,[hash_id]) 
            comment_data = searchresult1[0].comment; 
            console.log("comment data",comment_data)    
                console.log(searchresult1)
                const sqlSearch2 = "Select * from pms_users Where user_id =?"
                let searchresult2 =await execquery(sqlSearch2,[user_id])      
                console.log(searchresult2)
                    let transaction_data = searchresult1[0]
                    let userData = searchresult2[0]
                    comment = comment ? comment:comment_data;
                    console.log("comment",comment)

                    const sqlInsert1 = "INSERT into btc_audit_logs (hash_timestamp,fee,time,final_balance,input_addr,address_type,btc_address_id,comment,output_addr,date_create,new_comment,updated_by,username,usertype,hash_id,portfolio_id,wallet_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult =await execquery(sqlInsert1,[hash_id + new Date().getTime(), transaction_data.fee, transaction_data.time,transaction_data.final_balance, transaction_data.input_addr,transaction_data.address_type,transaction_data.btc_address_id,transaction_data.comment,transaction_data.output_addr,new Date().getTime(),comment,user_id, userData.username, userData.user_type, hash_id,transaction_data.portfolio_id, transaction_data.wallet_id])       
                        console.log(insertresult)
                        const sqlSelect = "Update btc_txc SET comment=? ,date_create=? WHERE hash_id =?"
                        let result =await execquery(sqlSelect,[comment, new Date().toUTCString() ,hash_id])       
                            console.log(result)

                            const sqlSelect_for_tran = "Update all_transaction_data SET comment=? ,updated_time=? WHERE hash_id =?"
                            let result_for_tran =await execquery(sqlSelect_for_tran,[comment, new Date().toUTCString() ,hash_id])       
                            console.log("connection address for all tran");
                    
                            const sqlSelect2 = "Select * from btc_txc WHERE hash_id =?"
                            let result2 =await execquery(sqlSelect2,[hash_id])      
                                console.log(result2)
                            
                                let sql_all_tron = "Select * FROM all_transaction_data WHERE hash_id =?";
                                let resultdata_all_tron = await execquery(sql_all_tron,[hash_id]);
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




module.exports = create_btc_audit_logs