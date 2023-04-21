require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var host= process.env.DB_HOST;
var user= process.env.DB_USER;
var password= process.env.DB_PASSWORD;
var database= process.env.DB_DATABASE;
var access_key = process.env.DEBANK_ACCESS_KEY;
// const db = mysql.createPool({
//    connectionLimit: 100,
//    host:host,
//    user:user,
//    password:password,
//    database:database
//   //  port: process.env.PORT
// //    port: DB_PORT
// })
const db = require('./pool-connection');
const wallet_refresh = async()=>{
    const user_id = req.query.user_id   
     db.getConnection( async (err, connection) => {
     if (err) throw (err)
     const sqlSelect = "SELECT * FROM pms_user_balance where user_id=?"
     const search_query = mysql.format(sqlSelect,[user_id])
        connection.query (search_query, (err, result)=> {
        if (err) throw (err)
       console.log ("--------> get data")
       for(var wal of result){
         var walletId=wal.walletId
        connection.query('SELECT * FROM pms_user_balance WHERE walletId = ?; SELECT * FROM pms_user_invest WHERE walletId = ?', [walletId, walletId], function(err, results) {
          // / if (err) console.log('err');
          if (err) return res.status(400).send("Wrong ");
          if(!err){
           
             return res.json({
                    message :"Statement",
                    rechargeDetails : results[0],
                    transactionDetail: results[0]
        
              })
          }
        })
       }
      
      })
      
      

// connection.query(sqlQuery1,
// function(err,rows,fields){
// if(err) throw err;
// res.send(rows);
// });
      
   connection.release()
      }) //end of db.getConnection()
}