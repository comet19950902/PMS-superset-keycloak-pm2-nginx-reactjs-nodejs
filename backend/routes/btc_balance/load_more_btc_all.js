
const axios = require('axios');
const db = require('../../pool-connection');
var util = require('util')

const create_btc_trx_load = async (btc_address_id, address_type,comment, res) => {
    let comment_data

    console.log("logggg",btc_address_id);
    var config = {
        method: 'get',
        url: `https://blockchain.info/multiaddr?active=`+ btc_address_id + '&n=2000',
        headers: {}
      };
      console.log("resss",config);
      let result = await axios(config);
      // console.log(result.data);
      // res.send(result.data);
      var btcData = result.data
      console.log("btc data");
      var date = new Date().toUTCString()
      console.log("gfff",date);
        var usd_fee = await axios.get('https://blockchain.info/ticker', {
            headers: {}

        });
        var btcData_usd_fee = usd_fee.data.USD.last
        console.log("usd data",btcData_usd_fee);

    // }catch (error) {
    //     console.log(error);
    //     res.send(error)
    // }
    // var transactionData = result.data;
    // var date = new Date().toUTCString()
    // console.log(date)

    try {
        db.getConnection(async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                let refrence_address = '0x' + btc_address_id;

                let sql = "Select * FROM btc_balance WHERE btc_address_id =?";
                let resultdata1 = await execquery(sql, [btc_address_id]);
                var portfolio_id = resultdata1[0].portfolio_id
                var wallet_id = resultdata1[0].wallet_id
                console.log("log",resultdata1)
                var final_balance = resultdata1[0].final_balance
                // var wallet_id = resultdata1[0].wallet_id
                console.log(resultdata1[0].final_balance);
                try{
                for (let i = 0; i < btcData.txs.length; i++) {
                    let btc_time;
                //     try{
                //     var usd_fee = await axios.get('https://blockchain.info/ticker', {
                //         headers: {}

                //     });
                //     var btcData_usd_fee = usd_fee.data.USD.last
                //     console.log("usd data",btcData_usd_fee);

                // }catch (error) {
                //     console.log(error);
                //     res.send(error)
                // }
                // try{
                //     var usd_result = await axios.get('https://blockchain.info/tobtc?currency=USD&value=' + btcData.txs[i].result, {
                //         headers: {}

                //     });
                //     var btcData_usd_result = usd_result.data

                // }
                //     catch (error) {
                //         console.log(error);
                //         res.send(error)
                //     }
                    btc_time = new Date([new Date(new Date((btcData.txs[i].time)*1000).toUTCString()).getFullYear(), new Date(new Date((btcData.txs[i].time)*1000).toUTCString()).getMonth() + 1, new Date(new Date((btcData.txs[i].time)*1000).toUTCString()).getDate()].join('/')).getTime() / 1000
                    console.log(btc_time)
                    console.log("tiem of time",btc_time)

                    var to_address = '--';
                    let cate_id ="";
                    let send_data ="";
                    let recieve_data ="";
                    let tron_fee ="";
                    // comment = comment ? comment:comment_data;
                    let btcData_usd_fee_for_tab = usd_fee.data.USD.last * ((btcData.txs[i].fee)/100000000)
                    let btcData_usd_result = usd_fee.data.USD.last * ((btcData.txs[i].result)/100000000)
                    // let btc_time = 
                    // let method_name = transactionData?.data[i]?.trigger_info?.methodName ? transactionData.data[i].trigger_info.methodName : ''
                    let sql = "REPLACE INTO btc_txc(hash_id,fee,time,final_balance,input_addr,address_type,btc_address_id,comment,output_addr,date_create,portfolio_id,wallet_id,result,usd_fee,usd_result,btc_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                    let resultdata = await execquery(sql, [btcData.txs[i].hash, btcData.txs[i].fee, Number(btcData.txs[i].time)*1000, final_balance,JSON.stringify(btcData.txs[i].inputs),address_type,btc_address_id,comment,JSON.stringify(btcData.txs[i].out),date, portfolio_id, wallet_id,btcData.txs[i].result,btcData_usd_fee_for_tab,btcData_usd_result,btc_time])
                    
                }
                res.send(btcData);
            }
            catch (error) {
                console.log(error);
                res.send(error)
            }
            
            try{
                for (let i = 0; i < btcData.txs.length; i++) {
                    var to_address = '--';
                    let cate_id ="";
                    let send_data ="";
                    let recieve_data ="";
                    let tron_fee ="";
                    let btcData_usd_fee_for_tab = usd_fee.data.USD.last * ((btcData.txs[i].fee)/100000000)
                    let btcData_usd_result = usd_fee.data.USD.last * ((btcData.txs[i].result)/100000000)
                    let tokenDecimal ="";
                    let symbol = "";
                    let tron_usd_fee = "";
                    let method ="";
                    let btc_time = new Date([new Date(new Date((btcData.txs[i].time)*1000).toUTCString()).getFullYear(), new Date(new Date((btcData.txs[i].time)*1000).toUTCString()).getMonth() + 1, new Date(new Date((btcData.txs[i].time)*1000).toUTCString()).getDate()].join('/')).getTime() / 1000
                    console.log(btc_time)
                    console.log("tiem of time",btc_time)
                    let usdt_token_value="";
                    let amount_trx = "";
                    let token_type ="BTC";
                    let eth_usdt ="";
                    var eth_fee ="";
                    var gas_fee ="";
                    var amount_returned ="";
                    let usdc_value = "";
                    let tokenAbbr = "";

                const sqlInsert_for_all = "REPLACE INTO all_transaction_data (hash_id,date,amount,comment,from_address,to_address,portfolio_id,wallet_id,tokenType,updated_time,cate_id,send_data,recieve_data,btc_fee,tron_fee,btc_usd_fee,btc_usd_result,symbol,tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr,token_type,eth_usdt,eth_fee,time_stamp,gas_fee,amount_returned) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                // let resultdata_for_all = await execquery(sqlInsert_for_all, [btcData.txs[i].hash, btcData.txs[i].fee, btcData.txs[i].time, final_balance,JSON.stringify(btcData.txs[i].inputs),address_type,btc_address_id,comment,JSON.stringify(btcData.txs[i].out),date, portfolio_id, wallet_id,btcData.txs[i].result])
                let resultdata_for_all = await execquery(sqlInsert_for_all, [btcData.txs[i].hash,btcData.txs[i].time,(btcData.txs[i].result)/100000000,comment,btc_address_id,to_address,portfolio_id, wallet_id,address_type,date,cate_id,send_data,recieve_data,btcData.txs[i].fee,tron_fee,btcData_usd_fee_for_tab,btcData_usd_result,symbol,tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr,token_type,eth_usdt,eth_fee,btc_time,gas_fee,amount_returned])
                    console.log("all tra",resultdata_for_all);
                    console.log(resultdata_for_all);
                }
            }
            catch (error) {
                console.log(error);
                res.send(error)
            }
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


module.exports = create_btc_trx_load; 
