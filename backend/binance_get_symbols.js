require('dotenv').config()
var axios = require('axios');
const express = require('express');
const { response } = require('express');
const Binance = require('binance-api-node').default
const client = Binance();
// const mysql = require('mysql');
const app = express();
var host= process.env.DB_HOST;
var user= process.env.DB_USER;
var password= process.env.DB_PASSWORD;
var database= process.env.DB_DATABASE;
var access_key = process.env.DEBANK_ACCESS_KEY;
// const db = mysql.createPool({
//    connectionLimit: 1000,
//    host:host,
//    user:user,
//    password:password,
//    database:database
//   //  port: process.env.PORT
// //    port: DB_PORT
// })
const db = require('./pool-connection');
var alldata;
var filterdata;
var usdt_symbols=[];
var usdt_data =[];
var symbolname={};

var asset_id;
var symbol;
 var symbol_responsedata ;
 var exchange_id ;
//  var wallet_id ='0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85';
 var exchange_asssts_list
var getdata  = async (wallet_id,res)=>{ 
   result =await  axios.get('https://api.binance.com/api/v3/exchangeInfo')
        // console.log(JSON.stringify(result.data.symbols));
        alldata = result.data.symbols;
         filterdata = result.data.symbols.filter(i =>i.quoteAsset =='USDT')
        // filterasset = filterdata.filter(h => h.symbol =='ETHUSDT')
        for(const getsymbol of filterdata){
            symbolname ={};
          symbolname['asset_id']  = getsymbol.baseAsset;  
           symbolname['symbol']   = getsymbol.symbol; 
           usdt_symbols.push(symbolname)
         }
            var currentDayInitialTime = new Date();
            var currentTimeDay = currentDayInitialTime.getTime();
            var currentDay=currentDayInitialTime.setHours(0,0,0,0);
         console.log("1 USDT SYMBOL",usdt_symbols);
        //  wallet_assets = 
       await db.query('SELECT * FROM pms_address_chain_list WHERE address_id =?',[wallet_id],async function (error, wallet_assets_list, fields) {
            if (error) return  console.log("error");
            exchange_asssts_list =await wallet_assets_list ;
            console.log("assets LIST", exchange_asssts_list);
            for (const exchange of exchange_asssts_list){
                exchange_id = exchange.asset_id;
                console.log("CURRENT EXCHANGE ID",exchange_id);
                console.log("USDT",usdt_symbols);
                let filtered_data = usdt_symbols.filter(x =>x.asset_id.toLowerCase() ==exchange_id)
                console.log("Filtered Data",filtered_data);
                    // console.log(filtered_data.length);
                    if(filtered_data && filtered_data.length>=1){
                       var asset_symbol = JSON.stringify(filtered_data[0].symbol);
                       var asset_name = JSON.stringify(filtered_data[0].asset_id);
                        // console.log(asset_symbol);
                    // var b = asset_symbol.replace("\"", "'");
                      var symbol_value = asset_symbol.replace(/"/g, "");
                      var symbol_asset = asset_name.replace(/"/g, "");
                        // console.log(symbol_value);
                        // console.log(JSON.stringify(filtered_data[0]));
                         
                        symbol_responsedata = await client.candles({ symbol: symbol_value, interval:'1h', startTime: currentDay, endTime: currentTimeDay})
                        
                        // console.log(symbol_responsedata.push(symbol_asset));
                        // console.log(symbol_responsedata);
                        for (const symbol_time of symbol_responsedata){

                            console.log("OPEN TIME", symbol_time.openTime);
                                symboluse ={};
                                symboluse['id']  = symbol_asset;  
                                symboluse['symbol']  = symbol_value; 
                                symboluse['closeTime']=new Date(symbol_time.closeTime).toLocaleString(); 
                                symboluse['close']= symbol_time.close;
                                symboluse['openTime'] =new Date(symbol_time.openTime).toLocaleString();
                                symboluse['open'] =symbol_time.open;
                                symboluse['symbolat'] = symbol_time.closeTime + symbol_asset;
                                symboluse['created_date'] =new Date().toLocaleString()
                                // console.log(symbol_time.closeTime + symbol_asset);
                                usdt_data.push(symboluse)

                                 let sql = "REPLACE INTO binance_usdt(symbol_at, closeTime, close, openTime, open, asset_id, asset_symbol, created_date) VALUES (?,?,?,?,?,?,?,?);"
                                await db.query(sql, [symbol_time.closeTime + symbol_asset, new Date(symbol_time.closeTime).toLocaleString(), symbol_time.close, new Date(symbol_time.openTime).toLocaleString(), symbol_time.open, symbol_asset, symbol_value, new Date().getTime()],async function (error, results, fields) {
                                   if (error) throw error;
                                        console.log("RESULT", results);  
                                        // res.send(updated_binance_history) 
                                // if (error.errno=1062){
                                //         let sql = "UPDATE binance_usdt SET created_date=?, closeTime=?,close=?, openTime=?, open=? WHERE symbol_at=?"
                                //         db.query(sql, [new Date().toLocaleString(), symbol_time.closeTime, symbol_time.close,symbol_time.openTime, symbol_time.open, symbol_time.closeTime + symbol_asset, ], function (error, results, fields) {
                                //         if (error) throw error;
                                //         console.log(results);
                                //         });
                                //         }
                                })
                                // console.log(results);

                                // if(){
                                //     let sql = "UPDATE binance_usdt SET created_date=?, closeTime=?,close=?, openTime=?, open=? WHERE symbol_at=?"
                                //     db.query(sql, [new Date().toLocaleString(), symbol_time.closeTime, symbol_time.close,symbol_time.openTime, symbol_time.open, symbol_time.closeTime + symbol_asset, ], function (error, results, fields) {
                                //     if (error) throw error;
                                //     console.log(results);
                                //     });
                                // }
                                // else{
                                // let sql = "INSERT INTO binance_usdt(symbol_at, closeTime, close, openTime, open, asset_id, asset_symbol, created_date) VALUES (?,?,?,?,?,?,?,?);"
                                // await db.query(sql, [symbol_time.closeTime + symbol_asset, symbol_time.closeTime, symbol_time.close, symbol_time.openTime, symbol_time.open, symbol_asset, symbol_value, new Date().toLocaleString()], function (error, results, fields) {
                                // if (error) throw error;
                                // console.log(results);
                                // });
                                // }
                        } 
                       
                                // console.log(usdt_data);
                    }
            }
        })

}


module.exports = getdata

//  app.get('/gethistory', function(req, res){
// //    res.send(usdt_symbols);
//    res.send(symbol_responsedata)
// });

// app.listen(8184, 
// ()=> console.log(`Server Started on port ${8184}...`)
// )
