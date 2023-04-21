require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const Binance = require('binance-api-node').default


var util = require('util')
const db = require('../pool-connection');    
const execquery = util.promisify(db.query.bind(db))



const get_simple_protocol = async(portfolio_id,exchange_name,api_key,api_secret,exchange_type,user_id,res) => {
    console.log("portfolio_id",portfolio_id);
    var newapi_key =api_key;
    console.log("api_key", api_key);
    var newapi_secret = api_secret;
    console.log("api_secret",api_secret);
    var newexchange_type = exchange_type;
    const client2 = Binance({
        apiKey: newapi_key,
        apiSecret:  newapi_secret,
        verbose: true
    })
    newData=[];
    dataset={};
    try{
        var result = await client2.accountInfo() //verified
        var allbalance =  result.balances
        let filteredvalue = allbalance
        console.log("all balance",allbalance)
        console.log("filter data",filteredvalue);
        db.getConnection( async (err, connection) => {
            if(err) throw err;
            const sqlSearch = "SELECT * FROM pms_exchange_api_key_credentials where exchange_apikey=?"
            connection.query (sqlSearch,[newapi_key],async (err, exchangeApiRes)=> {
                if (err) throw (err)
                console.log("exchangeApiRes",exchangeApiRes);
                if (exchangeApiRes.length==0) {
                    const sqlInsert1 = "INSERT INTO pms_exchange_api_key_credentials(exchange_apikey, exchange_secret_api_key, created_by, portfolio_id, created_date, exchange_name) VALUES(?,?,?,?,?,?);"
                    connection.query (sqlInsert1,[newapi_key,newapi_secret,user_id,portfolio_id,new Date().getTime(), exchange_name],async (err, exchangeApiRes)=> {
                    console.log(exchangeApiRes);
                    // let assetList = result;
                    const sqlSearch1 = "SELECT * FROM pms_exchange_api_key_credentials where exchange_apikey=?"
                    connection.query (sqlSearch1,[newapi_key],async (err, exchangeApiRes1)=> {
                        if (err) throw (err)
                        console.log("exchangeApiRes1",exchangeApiRes1);
                        for (const a of filteredvalue){
                            dataset.marketCommission = result.makerCommission ? result.makerCommission:null;
                            dataset.takerCommission = result.takerCommission ? result.takerCommission: null;
                            dataset.buyerCommission = result.buyerCommission ? result.buyerCommission: null;
                            dataset.canTrade = result.canTrade ? result.canTrade: null;
                            dataset.sellerCommission = result.sellerCommission ? result.sellerCommission: null;
                            dataset.canWithdraw = result.canWithdraw ? result.canWithdraw:null;
                            dataset.canDeposit = result.canDeposit ? result.canDeposit: null;
                            dataset.updateTime = result.updateTime ? result.updateTime: null;
                            dataset.accountType = result.accountType ? result.accountType: null;
                            let assetName =a.asset ? a.asset :null;
                            let free = a.free ? a.free :null;
                            let locked = a.locked ? a.locked :null;
                            dataset.assetName =assetName;
                            dataset.free = free;
                            dataset.locked = locked;
                            //  console.log(dataset);
                                try {
                                    connection.query('INSERT INTO pms_user_exchange_info(apikeyName, apikey, marketCommission, takerCommission, buyerCommission, sellerCommission, canTrade, canDeposit, canWithdraw, updateTime, accountType, assetName, free, locked,exchange_name,portfolio_id, exchange_type) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
                                    [api_key + assetName, api_key, result.makerCommission, new Date().getTime() ,result.buyerCommission , result.sellerCommission, result.canTrade, result.canDeposit, result.canWithdraw, result.updateTime, result.accountType, assetName, free, locked, exchange_name, portfolio_id, newexchange_type],async (error, res) => {
                                        if (error)   throw error;
                                        console.log(res)
                                })
                                } catch (error) {
                                    console.log("error");
                                }
                                
                            // })
                            await newData.push(dataset);
                            dataset ={};
                            
                        }
                    
                        await res.send(newData)
                    })
                })
                } 

                else if(exchangeApiRes.length>=1){
                    res.send("Exchange_apikey Already Exist")
                }
                else{
                    res.send("Error");
                }
            })
            console.log(newData);
            // res.send("Updated")
            connection.release()
            })
        }
        catch(error){
            if (error.code == -1022){
                console.log("INVALID_SIGNATURE")
                res.send("INVALID_SIGNATURE")

            }
            else if (error.code == -2014){
                console.log("BAD_API_KEY_FMT")
                res.send("BAD_API_KEY_FMT")

            }
            else{
                console.log("err")
                res.send("BOTH KEY INVALID")

            }
            // res.send(error)
        }

}

module.exports = get_simple_protocol