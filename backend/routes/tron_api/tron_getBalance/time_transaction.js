
const axios = require('axios');
const db = require('../../../pool-connection');
var util = require('util')

const time_tron_transaction = async (address_id, address_type,start_timestamp,end_timestamp,comment, res) => {
    console.log(address_id);
    var config = {
        // https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=20&start=0&start_timestamp=1548000000000&end_timestamp=1548056638507
        url: 'https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=20&start=0&start_timestamp=' + start_timestamp +'&end_timestamp=' + end_timestamp + '&address=' + address_id,
        headers: {}
    };

    let result = await axios(config);
    console.log(result.data);
    var usdt_value;
    var usdc_value;
    // res.send(result.data);
    var transactionData = result.data;
    var date = new Date().toUTCString();
    var date_cur  = new Date().getTime();
    console.log(date);
    var usd_tron_fee = await axios.get('https://api3.binance.com/api/v3/klines?symbol=TRXUSDT&interval=1s&endTime='+ date_cur +'&limit=1', {
    headers: {}
    
    });
    var btcData_usd_fee_tron = usd_tron_fee.data
    console.log("usd data for tron",btcData_usd_fee_tron);
    console.log("after",usd_tron_fee.data[0]?.[2]);

    try {
        db.getConnection(async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                let refrence_address = '0x' + address_id;

                let sql = "Select * FROM tron_balance WHERE tron_address_id =?";
                let resultdata1 = await execquery(sql, [address_id]);
                console.log(resultdata1)
                var portfolio_id = resultdata1[0].portfolio_id
                var wallet_id = resultdata1[0].wallet_id
                console.log(resultdata1[0].portfolio_id);
                console.log(resultdata1[0].wallet_id);

                // res.send(resultdata1);
                // let sql = "REPLACE INTO tron_balance(tron_address_id,transactions,date_created, wallet_id,portfolio_id ) VALUES (?,?,?,?,?);"
                // let resultdata = await execquery(sql, [tronData.address, tronData.transactions,  tronData.date_created, wallet_id, portfolio_id])
                // console.log(resultdata);
                for (let i = 0; i < transactionData.data.length; i++) {
                    let cate_id ="";
                    let send_data ="";
                    let recieve_data ="";
                    let btc_fee ="";
                    let tron_fee ="";
                    let symbol = "";
                    let btc_usd_fee ="";
                    let btc_usd_result ="";
                    let tron_usd_fee = usd_tron_fee.data[0]?.[2]
                    let method_name = transactionData?.data[i]?.trigger_info?.methodName ? transactionData.data[i].trigger_info.methodName : 'TRX Transfer'
                    if (transactionData?.data[i]?.trigger_info?.parameter?._value){
                        usdt_value = transactionData?.data[i]?.trigger_info?.parameter?._value ? (transactionData.data[i].trigger_info.parameter._value) / 1000000 : null

                    }
                    else if (transactionData?.data[i]?.trigger_info?.parameter?.value){
                        usdc_value = transactionData?.data[i]?.trigger_info?.parameter?.value ? (transactionData.data[i].trigger_info.parameter.value) / 1000000 : null
                    }
                    else {
                        usdt_value = null;
                        usdc_value = null;
                    }
                    // let usdt_value = transactionData?.data[i]?.trigger_info?.parameter?._value ? (transactionData.data[i].trigger_info.parameter._value) / 1000000 : null
                    // console.log("usdt token value",usdt_value);

                    let tokenLogo = transactionData?.data[i]?.tokenInfo?.tokenLogo ? transactionData?.data[i]?.tokenInfo?.tokenLogo : ''
                    let tokenName = transactionData?.data[i]?.tokenInfo?.tokenName ? transactionData?.data[i]?.tokenInfo?.tokenName : ''
                    let tokenAbbr = transactionData?.data[i]?.tokenInfo?.tokenAbbr ? transactionData?.data[i]?.tokenInfo?.tokenAbbr : ''
                    let tokenDecimal = transactionData?.data[i]?.tokenInfo?.tokenDecimal ? transactionData?.data[i]?.tokenInfo?.tokenDecimal : ''
                    let sql = "REPLACE INTO tron_transactions(tron_address_id,block,tokenType,portfolio_id,wallet_id,updated_time,token_logo,tokenName,tokenAbbr,amount,energy_usage_total,energy_fee,net_fee,address_id,address_type,hash,ownerAddress,toAddress,timestamp,confirmed,result,tokenDecimal,methodName,comment,usdt_token_value,amount_trx,usdc_value) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"

                    // if ((tokenAbbr == 'trx') || ((tokenAbbr == null))){
                    let resultdata = await execquery(sql, [transactionData.data[i].hash+transactionData.data[i].block, transactionData.data[i].block, transactionData.data[i].tokenType, portfolio_id, wallet_id, date, tokenLogo,tokenName, tokenAbbr, transactionData.data[i].amount, transactionData.data[i].cost.energy_usage_total,usd_tron_fee.data[0]?.[2], transactionData.data[i].cost.net_fee, address_id, address_type, transactionData.data[i].hash, transactionData.data[i].ownerAddress, transactionData.data[i].toAddress, transactionData.data[i].timestamp, transactionData.data[i].confirmed, transactionData.data[i].result, tokenDecimal, method_name,comment,usdt_value,transactionData.data[i].amount/1000000,usdc_value])
                    console.log(resultdata);
                    const sqlInsert1 = "REPLACE INTO all_transaction_data (hash_id,date,amount,comment,from_address,to_address,portfolio_id,wallet_id,tokenType,updated_time,cate_id,send_data,recieve_data,btc_fee,tron_fee,btc_usd_fee,btc_usd_result,symbol,tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let resultdata1 = await execquery(sqlInsert1, [transactionData.data[i].hash,transactionData.data[i].timestamp,transactionData.data[i].amount,comment,address_id,transactionData.data[i].toAddress,portfolio_id, wallet_id,address_type,date,cate_id,send_data,recieve_data,btc_fee,tron_fee,btc_usd_fee,btc_usd_result,symbol,tokenDecimal,tron_usd_fee,method_name,usdt_value,transactionData.data[i].amount/1000000,usdc_value,tokenAbbr])
                    console.log("all tra",resultdata1);
                    console.log(resultdata);
                // }
                }
                res.send(transactionData);
            } catch (error) {
                console.log(error);
                res.send(error)
            }
            connection.release();
        })
    } catch (error) {
        console.log(error);
        res.send(error);

    }

}

module.exports = time_tron_transaction; 