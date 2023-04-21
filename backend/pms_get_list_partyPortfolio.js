require('dotenv').config()
const pms_delete_address = require('./pms_delete_address')
const axios = require('axios');
const mysql = require('mysql');



const db = require('./pool-connection');

const delete_portfolio_data = async(res) => {
        try{
            db.getConnection( async (err, connection) => {
            if (err) throw err 
                 const sqlSelect = "SELECT * FROM pms_person_list"
                    let personresult =  await connection.query (sqlSelect,[walletId])
                    console.log(personresult);
                    const sqlsearch2 = "SELECT * FROM pms_oranisations_list"
                    const search2_query = mysql.format(sqlsearch2,[wallet_id])
                    let orgresult =await connection.query (search2_query)
                        if (err) throw (err)
                        console.log(orgresult);                      
            })
        }
        catch(error){
            res.send(error)
        }
    }

module.exports = delete_portfolio_data