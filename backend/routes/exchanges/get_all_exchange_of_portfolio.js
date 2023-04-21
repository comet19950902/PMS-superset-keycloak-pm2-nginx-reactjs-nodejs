require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const Binance = require('binance-api-node').default
const ccxt = require ('ccxt')
var util = require('util')
const db = require('../../pool-connection');    
const symboldata = require('../../allsymbol.json');


const get_all_portfolio_exchange = async(portfolio_id,res) => {
  
    // let portfolio_data =portfolio_id;
    // let secretKey = secret_key;

    // console.log(apiKey);
    try{
        await db.getConnection( async (err, connection) => {
            if(err) throw err;
            const execquery = util.promisify(connection.query.bind(connection))
            if(portfolio_id !=null){  
            try {
                let sqlSearch1 = "SELECT * FROM pms_exchange_api_key_credentials where portfolio_id=?"
                let exchangeApiRes =await execquery(sqlSearch1,[portfolio_id])
                    console.log("exchangeApiRes",exchangeApiRes);
                    res.send(exchangeApiRes)
            } catch (error) {
                console.log(error);
            }
        }
        else if(portfolio_id ==null){
            try {
              console.log("connection address");
              let sql_null = "SELECT * FROM pms_exchange_api_key_credentials"
              let resultdata_null = await execquery(sql_null);
                console.log(resultdata_null);
                res.send(resultdata_null);
            } 
          catch (error) {
                console.log(error);
                res.send(error);
            }
          }
            connection.release();
        })
    }
    catch(error){
        console.log(error);
    }
}


module.exports = get_all_portfolio_exchange
// add_exchange_history()