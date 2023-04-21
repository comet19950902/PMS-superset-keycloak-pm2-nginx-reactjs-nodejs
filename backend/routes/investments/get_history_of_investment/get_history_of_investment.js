var util = require('util')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const db = require('../../../pool-connection')  ;


const getLogData = async function(investment_id,res)  {
    try {
        db.getConnection( async (err, connection) => {
         if (err) throw err  
         const execquery = util.promisify(connection.query.bind(connection))
            try {        
                console.log(investment_id);
                const search_query = "Select * FROM pms_investment_data_logs WHERE investment_id =?";
                let search_resultdata = await execquery(search_query,[investment_id]); 

                console.log("data will be",search_resultdata); 
                 let newdatares = search_resultdata.sort(function (a, b) {
                    var dateA = new Date(a.updated_date), dateB = new Date(b.updated_date)
                    return  dateB -dateA
                });   
                res.send(newdatares)
            } catch (error) {
                console.log(error);
            }
        connection.release()
        })
    } catch (error) {
        console.log(error);
    }
}

 module.exports = getLogData