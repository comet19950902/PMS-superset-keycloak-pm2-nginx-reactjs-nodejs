// const mysql = require('mysql');
const mysql = require('mysql2');
// const mysql = require("mysql2/promise")
require('dotenv').config()
var host= process.env.DB_HOST;
var user= process.env.DB_USER;
var password= process.env.DB_PASSWORD;
var database= process.env.DB_DATABASE;
// var access_key = process.env.ACCESS_KEY;
const pool = mysql.createPool({
   connectionLimit: 151,
   host:host,
   user:user,
   password:password,
   database:database
})

pool.getConnection((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!',pool._allConnections._capacityMask);
});

 
module.exports = pool;

// module.exports = {
//     connect: function ()
//     {
//         return new Promise((resolve, reject) => {

//         let pool = Mysql.createPool({ //require configfile.js or just put connection detail here
//                 connectionLimit: 1000,
//                 host: host,
//                 user: user,
//                 password: password,
//                 database: database
//             });

//             pool.getConnection((err, connection) =>
//             {
//                 try
//                 {
//                     if (connection)
//                     {
//                         resolve({"status":"success", "data":"MySQL connected.", "con":pool});
//                         connection.release();
//                     }
//                 }
//                 catch (err)
//                 {
//                     reject({"status":"failed", "error":`MySQL error. ${err}`});
//                 }
//                 resolve({"status":"failed", "error":"Error connecting to MySQL."});
//             });
//         });
//     }

// }