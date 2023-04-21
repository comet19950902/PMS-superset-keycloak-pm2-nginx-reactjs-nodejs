require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const Binance = require('binance-api-node').default
const ccxt = require ('ccxt')
var util = require('util')
const db = require('../../pool-connection');    
const symboldata = require('../../allsymbol.json');


const get_exchange_history = async(api_key,res) => {
  
    let apiKey =api_key;
    // let secretKey = secret_key;
    // console.log(apiKey);
        try{
            await db.getConnection( async (err, connection) => {
                if(err) throw err;
                const execquery = util.promisify(connection.query.bind(connection))
                try {
                    let sqlSearch1 = "SELECT * FROM pms_user_exchange_trade_history where api_key=?"
                    let exchangeApiRes =await execquery(sqlSearch1,[apiKey])
                        console.log("exchangeApiRes",exchangeApiRes);
                        res.send(exchangeApiRes)
                } catch (error) {
                    console.log(error);
                }
                connection.release();
            })
    }
    catch(error){
        console.log(error);
    }
}


module.exports = get_exchange_history
// add_exchange_history()