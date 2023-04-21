
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const Binance = require('binance-api-node').default


var util = require('util')
const db = require('../pool-connection');    
const execquery = util.promisify(db.query.bind(db))

var newapi_key = process.env.API_KEY
 var newapi_secret = process.env.API_SECRET

const get_simple_protocol = async(res) => {
    // var newexchange_type = exchange_type;
    const client2 = Binance({
        apiKey: newapi_key,
        apiSecret:  newapi_secret,
        verbose: true
    })
    let newData=[];
    let dataset={};
    try{
        var result = await client2.depositHistory(coin='ONE') //verified
        console.log(result);
        // var allbalance =  result.balances
        // let filteredvalue = allbalance.filter(i =>i.free !=0)
        // console.log(filteredvalue);
       
            // console.log(newData);
            // res.send("Updated")
         
        }
        catch(error){
            res.send(error)
        }

}

// module.exports = get_simple_protocol
get_simple_protocol()