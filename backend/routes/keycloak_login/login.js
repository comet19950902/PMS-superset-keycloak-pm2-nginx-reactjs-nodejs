const axios = require('axios');
var qs = require('qs');
var express = require("express");
var app = express();
const jwt_decode = require('jwt-decode');
// const mysql = require('mysql');
const { decode } = require('jsonwebtoken');
require('dotenv').config()
const db = require('../../pool-connection');
var decoded;
var userID ;
app.use(express.json())


const get_simple_protocol = async(user_response, user_role)=>{
 let accessToken =user_response["access_token"];
  decoded = jwt_decode(accessToken,{payload: true, headers:true});
  console.log(decoded);
  userID = decoded.sub;
  var Userrole = user_role.replace(/"/g, '');
  console.log(Userrole);
  try {
    db.getConnection( async (err, connection) => {
      try {
          connection.query('SELECT * FROM pms_users',async function (error, users_table_data){
          var h = users_table_data.filter(i=>i.user_id==decoded.sub)
          var result =h[0];
            if(result && result.user_id){
                let sql = 'UPDATE pms_users SET previous_login_time=? WHERE user_id=?';
                await  connection.query(sql,[new Date().toLocaleString(), result.user_id], function (error, results, fields) {
                  if (error) throw error;
                  console.log(results);
                    });
                  }
            else {
                let sql = "INSERT INTO pms_users ( user_id, created_date, party_id, username, email, user_type, previous_login_time) VALUES (?,?,?,?,?,?,?);"
                await connection.query(sql,[userID, new Date().toLocaleString(), userID, decoded.preferred_username ,decoded.email , Userrole.toLowerCase(), new Date().toUTCString()], function (error, results, fields) {
                  if (error) throw error; 
                  console.log(results);
                });
              }
          })
      } catch (error) {
        console.log(error);
      }
      connection.release()
    })
  } catch (error) {
    
  }
     
}
 module.exports = get_simple_protocol;
