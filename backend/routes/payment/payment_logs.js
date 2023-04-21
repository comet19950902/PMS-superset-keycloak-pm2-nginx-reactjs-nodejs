// require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util');
const db = require('../../pool-connection')
var access_key = process.env.DEBANK_ACCESS_KEY;
var assetList;
var allresult = [];


const payment_logs = async(user_id,payment_id,res)=>{
  // let address_id = newaddress_id ? newaddress_id : null;
  try {
	db.getConnection(async (err, connection) => {
	if (err) throw err
    const execquery = util.promisify(connection.query.bind(connection))
        try {
            const sqlSearch1 = "SELECT * FROM pms_payment WHERE payment_id =?"
            let searchresult1 =await execquery(sqlSearch1,[payment_id]) 
            console.log("payment",payment_id);     
                console.log(searchresult1)
                const sqlSearch2 = "Select * from pms_users WHERE user_id =?"
                let searchresult2 =await execquery(sqlSearch2,[user_id])      
                console.log(searchresult2)
                    let transaction_data = searchresult1[0]
                    console.log("tran",searchresult1);
                    let userData = searchresult2[0]
                    const sqlInsert1 = "INSERT into payment_logs (payment_id,date_updated,sender,reciever,amount,currency,exchange_rate,payment_type,result_usd,user_id,username,usertype,timestamp,comment,new_comment) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult =await execquery(sqlInsert1,[payment_id,transaction_data.date_updated, transaction_data.sender, transaction_data.reciever,transaction_data.amount, transaction_data.currency, transaction_data.exchange_rate, transaction_data.payment_type, transaction_data.result_usd,user_id,userData.username, userData.user_type, new Date().getTime(),transaction_data.comment,comment])       
                        console.log(insertresult)
                        const sqlSelect2 = "Select * from pms_payment Where payment_id =?"
                            let result2 =await execquery(sqlSelect2,[payment_id])      
                                console.log(result2)
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



module.exports = payment_logs