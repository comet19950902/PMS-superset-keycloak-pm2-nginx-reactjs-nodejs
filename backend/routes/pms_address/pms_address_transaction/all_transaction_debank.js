// require('dotenv').config()
const axios = require('axios');
const { json } = require('body-parser');
const { Console } = require('console');
// const mysql = require('mysql');
var util = require('util')
const db = require('../../../pool-connection');
var access_key = process.env.DEBANK_ACCESS_KEY;
// var assetList;
var allresult = [];
var transaction_history = require ('./debank_wallet_user_history_list')


const get_all_eth_transaction = async (address_id, res) => {
    var assetidinuse = 'eth';
    let last_eth_time;
    let eth_tran = 0;
    let send_amount_all =0;
    let receives_amount_all = 0;
    let comment_data;
    try {
        db.getConnection(async (err, connection) => {
            if (err) throw err
            const execquery = util.promisify(connection.query.bind(connection))
            // try {
            //     db.getConnection(async (err, connection) => {
            //         if (err) throw err
            //         const execquery = util.promisify(connection.query.bind(connection))
            try {

                var chainresult = await axios.get('https://pro-openapi.debank.com/v1/user/history_list?id=' + address_id + '&chain_id=' + assetidinuse + '&start_time=' + new Date().getTime() + '&page_count=' + 20, {
                    headers: {
                        'Accesskey': access_key,
                        'accept': 'application/json',
                    }
                });
                // console.log("now chain list will be", chainresult.data);
                let symbol_of_data = chainresult.data
                // console.log("symbol", symbol_of_data.token_dict)
                var date_cur = new Date().getTime();
                // console.log("time current", chainresult.data.history_list.length)

                // let time_att = chainresult.data.history_list[tran_time].time_at
                // console.log("data of history", chainresult.data.history_list);

                let s = 0;
                try {
                    for (const ele of chainresult.data.history_list) {
                        // let tran_time = ele.length-1
                        // console.log('ele', ele)
                        // let time_att = chainresult.data.history_list.slice(-1)[0].time_at

                        if (ele.id != null) {


                            // console.log("all tran")
                            // s = s + i
                            chainresult = await axios.get('https://pro-openapi.debank.com/v1/user/history_list?id=' + address_id + '&chain_id=' + assetidinuse + '&start_time=' + chainresult.data.history_list.slice(-1)[0]?.time_at + '&page_count=' + 20, {
                                headers: {
                                    'Accesskey': access_key,
                                    'accept': 'application/json',
                                }
                            });
                            // let time_att = ele.slice(-1)[0].time_at

                            // time_att = ele[tran_time].time_at

                            console.log("start")
                            eth_tran = eth_tran + chainresult.data.history_list.length
                           
                            // console.log("iii",i)

                            // try {
                            // 	db.getConnection(async (err, connection) => {
                            // 		if (err) throw err
                            //     const execquery = util.promisify(connection.query.bind(connection))
                            try {
                                const sqlSelect = "SELECT * FROM pms_address_chain_list where address_id=?"
                                const result = await execquery(sqlSelect, [address_id])
                                //////////////////////////////////////////////////////////////////////
                                const sqlSelect_por = "SELECT * FROM pms_user_balance where address_id=?"
                                const result_por = await execquery(sqlSelect_por, [address_id])
                                let portfolio_id1 = result_por[0].portfolio_id;
                                let wallet_id1 = result_por[0].wallet_id;
                                // console.log("wallll", wallet_id1);





                                ////////////////////////////////////////////////////////////////
                                // console.log(result);
                                // console.log(result);
                                let assetList = result;
                                // let allresult = [];
                                let send_amount;
                                let eth_fee;
                                let gas_fee;
                                let token_type;
                                let eth_usd_gas;
                                let amount_returned;
                                let total_amount = [];
                                let senddd_ammount;
                                let result_ammount;
                                // for (const asset of assetList) {
                                try {

                                    for (const element of chainresult.data.history_list) {

                                        let history_list_data = element;
                                        // console.log("element_value", element);
                                        let transTime = new Date(element.time_at * 1000);
                                        // console.log("time of tran", transTime);

                                        // console.log("time of tran", transTime);
                                        var eth_time = new Date([new Date(transTime.toUTCString()).getFullYear(), new Date(transTime.toUTCString()).getMonth() + 1, new Date(transTime.toUTCString()).getDate()].join('/')).getTime()
                                        // console.log(eth_time)
                                        // console.log("tiem of time", eth_time);
                                        var transactionDate = transTime.toUTCString()
                                        // console.log("time ofoooooooooooooo", transactionDate);
                                        //usd value////////////////////////
                                        var usd_eth_fee = await axios.get('https://api3.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1s&endTime=' + element.time_at * 1000 + '&limit=1', {
                                            headers: {}


                                        });
                                        var btcData_usd_fee_eth = usd_eth_fee.data
                                        // console.log("usd data for eth", btcData_usd_fee_eth);
                                        // console.log("after", usd_eth_fee.data[0]?.[2]);
                                        let result_ammount_eth_id = element.receives.map(({ token_id }) => token_id)
                                        let send_ammount_eth_id = element.sends.map(({ token_id }) => token_id)

                                        // console.log("token reci id", result_ammount_eth_id, send_ammount_eth_id)
                                        // console.log("usd value ", usd_eth_fee)
                                        /////////////////////////////////
                                        result_ammount = element.receives.map(({ amount }) => amount);
                                        let result_ammount_for_eth = element.receives.map(({ amount }) => amount)
                                        last_eth_time = chainresult.data.history_list.slice(0)[0]?.time_at

                                        let obj = element.receives.find(o => o.token_id === 'eth');
                                        let obj1 = element.sends.find(o => o.token_id === 'eth');

                                        let obj11 = element.receives.find(o => o.token_id != 'eth');
                                        let obj12 = element.sends.find(o => o.token_id != 'eth');
                                        // console.log("ethhhh value", obj, obj1);

                                        ////////////////return amount ////

                                        let send_amount = element.sends.map(({ amount }) => amount);
                                        let receives_amount = element.receives.map(({ amount }) => amount);





                                        ////////////////////////
                                        const tokenId = JSON.stringify(element.receives) != '[]' ? result_ammount_eth_id == 'eth' ? 'ETH' : Object.values(JSON.parse(JSON.stringify(symbol_of_data.token_dict))).filter(i => i.id == result_ammount_eth_id)[0]?.symbol : JSON.stringify(element.sends) != '[]' ? send_ammount_eth_id == 'eth' ? 'ETH' : Object.values(JSON.parse(JSON.stringify(symbol_of_data.token_dict))).filter(i => i.id == send_ammount_eth_id)[0]?.symbol : '-'

                                        // console.log("token id", tokenId)
                                        let rs_amount = JSON.parse(JSON.stringify(element.receives))[0]?.amount
                                        let sd_amount = JSON.parse(JSON.stringify(element.sends))[0]?.amount

                                        /////////////////AMOUNT/////////
                                        if (rs_amount) {
                                            amount_returned = rs_amount;
                                        }
                                        else if (sd_amount) {
                                            amount_returned = sd_amount;
                                        }
                                        else if (rs_amount && sd_amount) {
                                            // total_amount.push(rs_amount.sd_amount)
                                            // amount_returned = total_amount;
                                            amount_returned = [sd_amount, rs_amount]
                                        }
                                        else {
                                            amount_returned = null
                                        }
                                        // console.log("return amount", amount_returned)

                                        // let a_receeve = Object.values(JSON.parse(JSON.stringify(symbol_of_data.token_dict)).filter(i => i.id == result_ammount_eth_id))
                                        eth_usd_gas = JSON.parse(JSON.stringify(element.tx))
                                        gas_fee = eth_usd_gas?.usd_gas_fee ? eth_usd_gas?.usd_gas_fee : null;
                                        // console.log("gas fee", gas_fee)

                                        let result_ammount_eth = element.receives.map(({ token_id }) => token_id)

                                        // let  amount_address = JSON.parse(JSON.stringify(element.tx))
                                        // console.log("amount address",amount_address.to_addr)
                                        senddd_ammount = element.sends.map(({ amount }) => amount);
                                        let senddd_ammount_for_eth = element.sends.map(({ amount }) => amount)
                                        // console.log("ssennn", senddd_ammount, result_ammount_eth, result_ammount);
                                        let eth_usdt
                                        if (obj) {
                                            // console.log("forrr");
                                            // send_amount = result_ammount
                                            eth_usdt = usd_eth_fee.data[0]?.[2] * result_ammount
                                            send_amount_all = send_amount_all + eth_usdt;
                                            // console.log("usdt value", eth_usdt);
                                            eth_fee = result_ammount_for_eth
                                            // token_type = 'ETH';
                                            // console.log("usdteth fee", eth_usdt)


                                        }
                                        else if (obj1) {
                                            eth_usdt = usd_eth_fee.data[0]?.[2] * senddd_ammount;
                                            receives_amount_all = receives_amount_all + eth_usdt;
                                            eth_fee = senddd_ammount_for_eth
                                            // token_type = 'ETH';
                                            // console.log("usdteth fee", eth_usdt)

                                            // send_amount = senddd_ammount
                                        }
                                        else {
                                            eth_fee = null;

                                        }
                                         
                                        
                                        //////////////////////////////////////////

                                        // let sql_for_commennt = "Select * FROM pms_wallet_transaction_history_list WHERE address_id =?";
                                        // let resultdata_comment = await execquery(sql_for_commennt, [address_id]);
                                        // for (let j = 0; j < resultdata_comment.length; j++) {
                                        //     if (resultdata_comment[j].transaction_id == element.id) {
                                        //         comment_data = resultdata_comment[j].comment;
                                        //         console.log("commmmm", comment_data)

                                        //     }
                                        // }

                                        // var send_amount = element?.sends?.amount ? element.sends.amount : element.receives.amount

                                        // let comments = i.comments ? i.comments : comment_data;

                                        //
                                        try {
                                            let sql = "REPLACE INTO pms_wallet_transaction_history_list (transaction_id, other_wallet_address, asset_chain, amount, transaction_time, cate_id, address_id, send_data, recieve_data, created_at,symbol,usdt_eth,eth_fee,token_type,eth_time,gas_fee,amount_returned) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                                            let newresult = await execquery(sql, [element.id, element.other_addr, element.chain, JSON.stringify(element.tx), transactionDate, element.cate_id, address_id, JSON.stringify(element.sends), JSON.stringify(element.receives), new Date().toUTCString(), JSON.stringify(symbol_of_data.token_dict), eth_usdt, eth_fee, tokenId, eth_time, gas_fee, amount_returned])
                                            allresult.push(newresult)
                                            // console.log("allres", allresult);
                                            // res.send(newresult)
                                        }
                                        catch (error) {
                                            console.log(error);
                                        }

                                        /////////////////all tran//////////////////////////
                                        try {
                                            let comments = "";
                                            let btc_fee = "";
                                            let tron_fee = "";
                                            let btc_usd_fee = "";
                                            let btc_usd_result = "";
                                            let tokenDecimal = "";
                                            let tron_usd_fee = "";
                                            let method = "";
                                            let usdt_token_value = "";
                                            let amount_trx = "";
                                            let usdc_value = "";
                                            let tokenAbbr = "";
                                            let token_type = "";
                                            let eth_time_stamp = eth_time / 1000
                                            const sqlInsert1 = "REPLACE INTO all_transaction_data (hash_id,date,amount,comment,from_address,to_address,portfolio_id,wallet_id,tokenType,updated_time,cate_id,send_data,recieve_data,btc_fee,tron_fee,btc_usd_fee,btc_usd_result,symbol,tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr,token_type,eth_usdt,eth_fee,time_stamp,gas_fee,amount_returned) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
                                            if (tokenId == 'ETH' || tokenId == 'USDC' || tokenId == 'USDT') {

                                                let resultdata1 = await execquery(sqlInsert1, [element.id, element.time_at, JSON.stringify(element.tx), comments, address_id, element.other_addr, portfolio_id1, wallet_id1, element.chain, new Date().toUTCString(), element.cate_id, JSON.stringify(element.sends), JSON.stringify(element.receives), btc_fee, tron_fee, btc_usd_fee, btc_usd_result, JSON.stringify(symbol_of_data.token_dict), tokenDecimal, tron_usd_fee, method, usdt_token_value, amount_trx, usdc_value, tokenAbbr, tokenId, eth_usdt, eth_fee, eth_time_stamp, gas_fee, amount_returned])
                                                // console.log("all tra", resultdata1);
                                            }

                                            ///////////////////////////////////////////////////////////

                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }
                                    // res.send(allresult)

                                } catch (error) {
                                    console.log(error);
                                }
                                // const sqlSelect_eth = "Update pms_user_balance SET last_eth_time=?,recv_amount=?,send_amount=?,total_tran=? WHERE address_id =?"
                                //         let result_eth =await execquery(sqlSelect_eth,[last_eth_time,receives_amount_all,send_amount_all,eth_tran,address_id])       
                                //         console.log("connection address",result_eth);
                                // console.log("send and recive amount",receives_amount_all,send_amount_all)
                                // res.send(allresult)
                                // } 

                            }

                            catch (error) {
                                console.log(error);
                                res.send(error)
                            }


                        }
                        

                       
                        // res.send(allresult)

                    }
                    console.log("last time of eth",last_eth_time,eth_tran)
                    res.send(allresult)
                    
                } catch (error) {
                    console.log(error);
                    res.send(error)
                }
                // res.send(allresult)
            }
            catch (error) {
                console.log(error);
                res.send(error)
            }
            try {
                await transaction_history(address_id, res)
            } catch (error) {
                console.log("No transaction .", error);
              }
            // res.send(chainresult.data)
            console.log("close data will be")
            // res.send(allresult)
            connection.release();
        })
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = get_all_eth_transaction