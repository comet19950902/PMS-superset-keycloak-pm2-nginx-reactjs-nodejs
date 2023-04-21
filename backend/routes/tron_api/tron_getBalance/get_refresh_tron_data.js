
const axios = require('axios');
const db = require('../../../pool-connection');
var util = require('util')

const tron_transaction_history = async (address_id, address_type,comment, res) => {
    console.log(address_id);
    var config = {
        method: 'get',
        url: `https://apilist.tronscan.org/api/transaction?address=` + address_id,
        headers: {}
    };

    let result = await axios(config);
    console.log(result.data);
    // res.send(result.data);
    var transactionData = result.data;
    var date = new Date().toUTCString()
    var usdt_value
    console.log(date)

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
                for (let i = 0; i < transactionData.data.length; i++) {
                    let method_name = transactionData?.data[i]?.trigger_info?.methodName ? transactionData.data[i].trigger_info.methodName : ''
                    // let usdt_value = (transactionData?.data[i]?.trigger_info?.parameter?._value)/1000000 ? (transactionData?.data[i]?.trigger_info?.parameter?._value)/1000000 : ''
                    // console.log("usdt token value",usdt_value);
                    if (transactionData?.data[i]?.trigger_info?.parameter?._value){
                        usdt_value = transactionData?.data[i]?.trigger_info?.parameter?._value ? (transactionData.data[i].trigger_info.parameter._value) / 1000000 : null

                    }
                    else if (transactionData?.data[i]?.trigger_info?.parameter?.value){
                        usdt_value = transactionData?.data[i]?.trigger_info?.parameter?.value ? (transactionData.data[i].trigger_info.parameter.value) / 1000000 : null
                    }
                    let sql = "REPLACE INTO tron_transactions(transaction_id,block,tokenType,portfolio_id,wallet_id,updated_time,token_logo,tokenName,tokenAbbr,amount,energy_usage_total,energy_fee,net_fee,address_id,address_type,hash,ownerAddress,toAddress,timestamp,confirmed,result,tokenDecimal,methodName,comment,usdt_token_value) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                    let resultdata = await execquery(sql, [transactionData.data[i].block + address_id+new Date().getTime(), transactionData.data[i].block, transactionData.data[i].tokenType, portfolio_id, wallet_id, date, transactionData.data[i].tokenInfo.tokenLogo, transactionData.data[i].tokenInfo.tokenName, transactionData.data[i].tokenInfo.tokenAbbr, transactionData.data[i].amount, transactionData.data[i].cost.energy_usage_total, transactionData.data[i].cost.energy_fee, transactionData.data[i].cost.net_fee, address_id, address_type, transactionData.data[i].hash, transactionData.data[i].ownerAddress, transactionData.data[i].toAddress, transactionData.data[i].timestamp, transactionData.data[i].confirmed, transactionData.data[i].result, transactionData.data[i].tokenInfo.tokenDecimal, method_name,comment,usdt_value])
                    console.log(resultdata);
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

module.exports = tron_transaction_history; 