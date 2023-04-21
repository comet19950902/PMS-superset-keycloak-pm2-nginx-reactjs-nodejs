require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const Binance = require('binance-api-node').default
const ccxt = require ('ccxt')
var util = require('util')
const db = require('../../pool-connection');    
const symboldata = require('../../allsymbol.json');


const add_exchange_history = async(user_id,api_key,secret_key, portfolio_id ,res) => {
    let apiKey =api_key;
    let secretKey = secret_key;
    console.log(apiKey);
        try{
            await db.getConnection( async (err, connection) => {
                if(err) throw err;
                const execquery = util.promisify(connection.query.bind(connection))
                try {
                    let sqlSearch1 = "SELECT * FROM pms_user_exchange_info where apikey=?"
                    let exchangeApiRes =await execquery(sqlSearch1,[apiKey])
                        console.log("exchangeApiRes",exchangeApiRes);
                        for(let i of exchangeApiRes){
                            let coin = i.assetName;
                             console.log(coin);
                            let quotefiltercoin = symboldata.filter(sym =>sym.quoteAsset ==coin)
                            let basefiltercoin = symboldata.filter(sym =>sym.baseAsset ==coin)
                            console.log(quotefiltercoin);
                            console.log(basefiltercoin);
                            const exchangeId = 'binance', 
                                exchangeClass = ccxt[exchangeId], 
                                exchange = new exchangeClass ({
                                    'apiKey': apiKey,
                                    'secret': secretKey,
                                })
                                let fee = "0";
                                let fees = "0";
                            for(let j of quotefiltercoin){
                                let baseasset = j.baseAsset;
                                let quoteAsset = j.quoteAsset;
                                let newSymbolGenerated = baseasset+'/'+coin;
                                console.log(newSymbolGenerated);
                                try {
                                    let ordersvalue= await exchange.fetchMyTrades(symbol = newSymbolGenerated)
                                    // console.log(ordersvalue);
                                    if (ordersvalue && ordersvalue.length!=0) {
                                        for (let orderelement of ordersvalue) {
                                            try {
                                                let type = orderelement.type ? orderelement.type : null;
                                                let order = orderelement.order ?  orderelement.order : null;
                                                let id = orderelement.id ? orderelement.id : null;
                                                let side =  orderelement.side ? orderelement.side : null;
                                                let timestamp = orderelement.timestamp ? orderelement.timestamp : null;
                                                let takerOrMaker = orderelement.takerOrMaker ? orderelement.takerOrMaker : null; 
                                                let price =  orderelement.price ? orderelement.price : null;
                                                let amount = orderelement.amount ? orderelement.amount : null;
                                                let cost = orderelement.cost ? orderelement.cost : null;
                                                let date =  new Date(orderelement.datetime).getTime(); 
                                                console.log('date', date);
                                                    try {  
                                                        let sqlAdddata2 = "REPLACE INTO pms_user_exchange_trade_history (symbol_order_id_api_key, symbol, timeStamp, id, datetime, side, takerOrMaker, price, amount, cost, type, created_time, created_by, updated_time, updated_by, fee, fees, info, api_key, portfolio_id) Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                                                        let createddata =await execquery(sqlAdddata2,[ apiKey+orderelement.symbol+orderelement.order+orderelement.timestamp+'/'+orderelement.price, orderelement.symbol ,timestamp, id, orderelement.datetime, side, takerOrMaker, price, amount, cost, type, new Date().getTime(), user_id, new Date().getTime(), user_id, JSON.stringify(orderelement.fee), JSON.stringify(orderelement.fees), JSON.stringify(orderelement.info), apiKey, portfolio_id])
                                                    } catch (error) {
                                                        console.log(error);
                                                    }
                                            } catch (error) {
                                                console.log("Database-Error,Cannot Add Data");
                                            }
                                        }
                                    }
                                } catch (error) {
                                    console.log("NO ORDER VALUE");
                                }
                            }
                            for(let j of basefiltercoin){
                                let baseasset = j.baseAsset;
                                let quoteAsset = j.quoteAsset;
                                console.log(baseasset);
                                console.log(quoteAsset);
                                let newSymbolGenerated = coin+'/'+quoteAsset;
                                console.log(newSymbolGenerated);
                                try {
                                    let ordersvalue= await exchange.fetchMyTrades(symbol = newSymbolGenerated)
                                    console.log(ordersvalue);
                                    if (ordersvalue && ordersvalue.length!=0) {
                                        for (let orderelement of ordersvalue) {
                                            try {
                                                let type = orderelement.type ? orderelement.type : null;
                                                let order = orderelement.order ?  orderelement.order : null;
                                                let id = orderelement.id ? orderelement.id : null;
                                                let side =  orderelement.side ? orderelement.side : null;
                                                let timestamp = orderelement.timestamp ? orderelement.timestamp : null;
                                                let takerOrMaker = orderelement.takerOrMaker ? orderelement.takerOrMaker : null; 
                                                let price =  orderelement.price ? orderelement.price : null;
                                                let amount = orderelement.amount ? orderelement.amount : null;
                                                let cost = orderelement.cost ? orderelement.cost : null;
                                                let date =  new Date(orderelement.datetime).getTime(); 
                                                console.log('date', date);
                                                    try {  
                                                        let sqlAdddata2 = "REPLACE INTO pms_user_exchange_trade_history (symbol_order_id_api_key, symbol, timeStamp, id, datetime, side, takerOrMaker, price, amount, cost, type, created_time, created_by, updated_time, updated_by, fee, fees, info, api_key, portfolio_id) Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                                                        let createddata =await execquery(sqlAdddata2,[apiKey+orderelement.symbol+orderelement.order+orderelement.timestamp+'/'+orderelement.price, orderelement.symbol ,timestamp, id, orderelement.datetime, side, takerOrMaker, price, amount, cost, type, new Date().getTime(), user_id, new Date().getTime(), user_id, JSON.stringify(orderelement.fee), JSON.stringify(orderelement.fees), JSON.stringify(orderelement.info), apiKey, portfolio_id])
                                                    } catch (error) {
                                                        console.log(error);
                                                    }
                                            } catch (error) {
                                                console.log("Database-Error,Cannot Add Data");
                                            }
                                        }
                                    }
                                } catch (error) {
                                    console.log("NO ORDER VALUE");
                                }
                            }
                        }
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


module.exports = add_exchange_history
// add_exchange_history()