require('dotenv').config()
var util = require('util')
const db = require('../../pool-connection');
const execquery = util.promisify(db.query.bind(db))
const Binance = require('binance-api-node').default
const axios = require('axios');

const update_exchange_daily = async( )=>{
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw err ;
            try {
                const search_query = "Select * FROM pms_exchange_api_key_credentials";
                let resultdata = await execquery(search_query);
                // console.log(resultdata);
                for (let i of resultdata) {
                    const element = i;
                    console.log(element);
                    let api_key = element.exchange_apikey;
                    let secret_key = element.exchange_secret_api_key;
                    console.log(api_key);
                    console.log(secret_key);
                        try {
                            const setlogs = "Select * from pms_user_exchange_info Where apikey =?"
                            let exchange_searchresult = await execquery(setlogs,[api_key])
                                // console.log("exchange_searchresult", exchange_searchresult);
                                for (let exch of exchange_searchresult) {
                                    const exchange_data = exch;
                                    console.log("exchange_data", exchange_data);
                                    var portfolio_id = exchange_data.portfolio_id ;
                                    var exchange_name = exchange_data.exchange_name;
                                    console.log(exchange_data.apikey);
                                    let currentTime = new Date().getTime();
                                        const set_exchange_logs ="INSERT INTO pms_exchange_data_logs(exchange_api_key_time, apikeyName, exchange_api_key, marketCommission, takerCommission, buyerCommission, sellerCommission, canTrade, canDeposit, canWithdraw, updateTime, accountType, assetName, free, locked,exchange_name,portfolio_id, exchange_type) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                                        let logs_updated_result  = await execquery(set_exchange_logs,[exchange_data.apikey + exchange_data.assetName + currentTime, exchange_data.apikeyName, exchange_data.apikey, exchange_data.marketCommission, exchange_data.takerCommission, exchange_data.buyerCommission, exchange_data.sellerCommission, exchange_data.canTrade, exchange_data.canDeposit, exchange_data.canWithdraw, exchange_data.updateTime, exchange_data.accountType, exchange_data.assetName, exchange_data.free, exchange_data.locked, exchange_data.exchange_name, exchange_data.portfolio_id, exchange_data.exchange_type ])
                                        console.log(logs_updated_result);
                                    }
                                    const client2 = Binance({
                                        apiKey: api_key,
                                        apiSecret: secret_key,
                                        verbose: true
                                    })
                                    let newexchange_type = 'binance';
                                    var account_result = await client2.accountInfo() //verified
                                    var allbalance =  account_result.balances ;
                                    let newData=[];
                                    let dataset={};
                                    // console.log(allbalance);
                                    let filteredvalue = allbalance.filter(i =>i.free !=0)
                                        console.log(filteredvalue);
                                        for (const a of filteredvalue){
                                            dataset.marketCommission = account_result.makerCommission ? account_result.makerCommission:null;
                                            dataset.takerCommission = account_result.takerCommission ? account_result.takerCommission: null;
                                            dataset.buyerCommission = account_result.buyerCommission ? account_result.buyerCommission: null;
                                            dataset.canTrade = account_result.canTrade ? account_result.canTrade: null;
                                            dataset.sellerCommission = account_result.sellerCommission ? account_result.sellerCommission: null;
                                            dataset.canWithdraw = account_result.canWithdraw ? account_result.canWithdraw:null;
                                            dataset.canDeposit = account_result.canDeposit ? account_result.canDeposit: null;
                                            dataset.updateTime = account_result.updateTime ? account_result.updateTime: null;
                                            dataset.accountType = account_result.accountType ? account_result.accountType: null;
                                            let assetName =a.asset ? a.asset :null;
                                            let free = a.free ? a.free :null;
                                            let locked = a.locked ? a.locked :null;
                                            dataset.assetName =assetName;
                                            dataset.free = free;
                                            dataset.locked = locked;
                                            //  console.log(dataset);
                                            try {
                                                let newres = await execquery('REPLACE INTO pms_user_exchange_info(apikeyName, apikey, marketCommission, takerCommission, buyerCommission, sellerCommission, canTrade, canDeposit, canWithdraw, updateTime, accountType, assetName, free, locked,exchange_name ,portfolio_id, exchange_type) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
                                                [api_key + assetName, api_key, account_result.makerCommission, account_result.takerCommission ,account_result.buyerCommission , account_result.sellerCommission, account_result.canTrade, account_result.canDeposit, account_result.canWithdraw, new Date().getTime(), account_result.accountType, assetName, free, locked, exchange_name, portfolio_id, newexchange_type])
                                                await newData.push(dataset);
                                                dataset ={};
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }
                                    
                        } catch (error) {
                            console.log(error);
                        }
                }
            } catch (error) {
                console.log(error);
            }
            connection.release()
        })
    } catch (error) {
        console.log(error);
    }

}

update_exchange_daily()