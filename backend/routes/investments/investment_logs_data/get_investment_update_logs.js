var util = require('util')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var access_key = process.env.DEBANK_ACCESS_KEY;
// const db= require('./pool-connection');  
const db = require('../../../pool-connection')  ;
// const { userInfo } = require('os');
// console.log("DB------------",db);


const getLogData = async function(newoffset,res)  {
    try {
        db.getConnection( async (err, connection) => {
         if (err) throw err  
         const execquery = util.promisify(connection.query.bind(connection))
            try {
                // let userInfo = 'admin';
                        const search_query = "Select * FROM pms_investment_data_logs ORDER BY timestamp DESC LIMIT 500 OffSET" +" "+newoffset
                        let search_resultdata = await execquery(search_query);
                        console.log(search_resultdata);
                        let search_query2 = "Select * FROM pms_users";
                        let user_data = await execquery(search_query2);
                        // console.log(user_data);
                            const upresult = search_resultdata.map(investment_data => {
                            const addressItem = user_data.find(name => name.user_id === investment_data.updated_by) 
                                investment_data.username = addressItem ? addressItem.username : null;
                                investment_data.user_type = addressItem ? addressItem.user_type : null;
                            return investment_data
                            })
                            // console.log(upresult);
                            // let newdatares = search_resultdata.sort(function (a, b) {
                            //     var dateA = new Date(a.updated_date), dateB = new Date(b.updated_date)
                            //     return  dateB -dateA
                            // });
                        res.send(upresult)
            } catch (error) {
                console.log(error);
            }
        // connection.end()
        connection.release()
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = getLogData
// getLogData()