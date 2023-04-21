require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const Binance = require('binance-api-node').default
const ccxt = require ('ccxt')
var util = require('util')
const db = require('../../pool-connection');    
const symboldata = require('../../allsymbol.json');
const { time } = require('console');


const add_exchange_history = async() => {
    let apiKey ='PdneJzqTuhnNcB33okOMvzv57TsGbLVlUIdvdxFUpz5uCMF1IXis3dErTVUzV8Fj';
    let secretKey = 'OSfX7abFn8RrfkzPPHaZjyQwyufjG6RVdh4u6KtMOKWEPxaZpgV5CE83ynf166di';
    console.log(apiKey);
    // let apiKey ='OSfX7abFn8RrfkzPPHaZjyQwyufjG6RVdh4u6KtMOKWEPxaZpgV5CE83ynf166di';
    // let secretKey = 'PdneJzqTuhnNcB33okOMvzv57TsGbLVlUIdvdxFUpz5uCMF1IXis3dErTVUzV8Fj';
    // console.log(apiKey);
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
                            //  console.log(coin);
                            const exchangeId = 'binance', 
                                exchangeClass = ccxt[exchangeId], 
                                exchange = new exchangeClass ({
                                    'apiKey': apiKey,
                                    'secret': secretKey,
                                })
                                let fee = "0";
                                let fees = "0";
                                let user_id ="4312421";
                                try {
                                    let ordersvalue= await exchange.fetchMyTrades(symbol = 'ONE/BNB')
                                    console.log(ordersvalue);
                                    // for(let i of ordersvalue){
                                        // console.log("fee",i.fee);
                                        // console.log("fees",i.fees);
                                        // console.log(JSON.stringify(i.fees));
                                    if (ordersvalue && ordersvalue.length!=0) {
                                        for (let orderelement of ordersvalue) {
                                            // console.log("orderelement",orderelement);
                                            //  console.log("orderelement",orderelement.id);
                                            //  console.log("orderelement_order",orderelement.order);
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
                                                    let sqlAdddata2 = "REPLACE INTO pms_user_exchange_trade_history (symbol_order_id_api_key, symbol, timeStamp, id, datetime, side, takerOrMaker, price, amount, cost, type, created_time, created_by, updated_time, updated_by, fee, fees, info) Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                                                    let createddata =await execquery(sqlAdddata2,[orderelement.symbol+orderelement.order+orderelement.timestamp+'/'+orderelement.price, orderelement.symbol ,timestamp, id, date, side, takerOrMaker, price, amount, cost, type, new Date().getTime(), user_id, new Date().getTime(), user_id, JSON.stringify(orderelement.fee), JSON.stringify(orderelement.fees), JSON.stringify(orderelement.info) ])
                                               } catch (error) {
                                                    console.log(error);
                                                }
                                            // console.log(createddata);
                                        }
                                    }
                                } catch (error) {
                                    console.log("NO ORDER VALUE");
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


// module.exports = add_exchange_history
add_exchange_history()