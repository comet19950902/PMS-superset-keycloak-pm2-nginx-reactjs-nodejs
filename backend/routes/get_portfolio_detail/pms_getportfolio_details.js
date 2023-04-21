var change_price = require('../pms_address/pms_address_chainlist/debank_change_price')
var util = require('util')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');


const db= require('../../pool-connection'); 
const execquery = util.promisify(db.query.bind(db))
const getquerty = async function getquerty(res) {
    try{
        db.getConnection( async (err, connection) => {
         if (err) throw err 
        const search_query = " Select * FROM pms_portfolio";
        try {
            let resultdata = await execquery(search_query);
            var totalportfolio = [];
            for (let i of resultdata){
                var partydata =[];
                var netportdata =[];
                let portfolio_detail ={};
                portfolio_detail.portfolio_id =i.portfolio_id;
                portfolio_detail.portfolio_name =i.portfolio_name;
                portfolio_detail.updated_date = i.updated_date;
                portfolio_detail.walletsdata =[];
                var wallets =[];
                
                const search_query2 = "Select * FROM pms_user_wallet WHERE portfolio_id =?";
                try {
                partyportfoliores = await execquery(search_query2,[i.portfolio_id]);
                    for(let element of partyportfoliores){
                        let walletdata ={};
                        walletdata.portfolio_name = i.portfolio_name;
                        walletdata.portfolio_id = element.portfolio_id;
                        walletdata.wallet_id = element.walletId;
                        walletdata.wallet_name =element.wallet_name;
                        walletdata.addresseslistdata =[];
                        walletdata.totalwalletbalance =0;
                        walletdata.totalwalletbalance_btc =0;
                        walletdata.totalwalletbalance_tron =0;
                        try{
                        try{
                            const search_query3 = "Select * FROM pms_user_balance WHERE wallet_id = ?";
                            let partyres = await execquery(search_query3,[element.walletId]);
////////////////////////////////////////////////////btc///////////////////////////////////
                                /////////////////////////////////////////////////////btc

                                ///////////////////////////////////tron///////////////////////////////////
                                ///////////////////////////////////////////////////////////////////////////
                            // console.log(partyres);
                            var addresslist =[];
                            for(let addresselement of partyres){
                                let addressdata ={};
                                addressdata.address_id = addresselement.address_id ? addresselement.address_id: null;
                                addressdata.totalBalance = addresselement.total_usd_value ? addresselement.total_usd_value:null;
                                addressdata.address_type = addresselement.address_type ? addresselement.address_type:null;
                                addressdata.total_sent = addresselement.send_amount ? addresselement.send_amount:null;
                                addressdata.total_received = addresselement.recv_amount ? addresselement.recv_amount:null;
                                addressdata.transaction = addresselement.total_tran ? addresselement.total_tran:null;
                                addressdata.eth_last_time = addresselement.last_eth_time ? addresselement.last_eth_time:null;

                                // amt_rcv_eth,amt_rcv_usdt,amt_rcv_usdc,send_amt_eth,amt_send_usdc,amt_send_usdt,total_eth,total_usdt,total_usdc

                                addressdata.amt_rcv_eth = addresselement.amt_rcv_eth ? addresselement.amt_rcv_eth:null;
                                addressdata.amt_rcv_usdt = addresselement.amt_rcv_usdt ? addresselement.amt_rcv_usdt:null;
                                addressdata.amt_rcv_usdc = addresselement.amt_rcv_usdc ? addresselement.amt_rcv_usdc:null;
                                addressdata.send_amt_eth = addresselement.send_amt_eth ? addresselement.send_amt_eth:null;
                                addressdata.amt_send_usdc = addresselement.amt_send_usdc ? addresselement.amt_send_usdc:null;
                                addressdata.amt_send_usdt = addresselement.amt_send_usdt ? addresselement.amt_send_usdt:null;
                                addressdata.total_eth = addresselement.total_eth ? addresselement.total_eth:null;
                                addressdata.total_usdt = addresselement.total_usdt ? addresselement.total_usdt:null;
                                addressdata.total_usdc = addresselement.total_usdc ? addresselement.total_usdc:null;
                                addressdata.date_created = addresselement.timeStamp ? addresselement.timeStamp:null;

								addressdata.ref_address_number = addresselement.ref_address_number ? addresselement.ref_address_number : '0x'+addressdata.address_id;
                                walletdata.totalwalletbalance += parseFloat(addresselement.total_usd_value);
                                if(addressdata.address_id != undefined){
                                    var newres;
                                    newres = addressdata;
                                    // console.log(newres);
                                    addresslist.push(newres)
                                }
                                else if(partyportfoliodata.name == undefined){
                                    console.log("error");
                                    return;
                                }
                            }  
                        }
                        catch(error){
                            console.log(error); 
                        }
                            ////////////////////////////////btc

                            try{
                                const search_query4 = "Select * FROM btc_balance WHERE wallet_id = ?";
                                    let partyres4 = await execquery(search_query4,[element.walletId]);
                                    try{
                                    var usd_fee = await axios.get('https://blockchain.info/ticker', {
                                    headers: {}
        
                                        });
                                    var btcData_usd_fee = usd_fee.data.USD.last
                                    console.log("usd data",usd_fee.data.USD.last);
                                    }
                                    catch(error){
                                        console.log(error);
                                    }
                            for(let addresselement of partyres4){
                                //date_created
                                let addressdata ={};
                                let btcData_usd_final_balance = usd_fee.data.USD.last * ((addresselement?.final_balance)/100000000);
                                addressdata.address_id = addresselement.btc_address_id ? addresselement.btc_address_id: null;
                                addressdata.totalBalance = usd_fee.data.USD.last *((addresselement?.final_balance)/100000000) ? usd_fee.data.USD.last * ((addresselement?.final_balance)/100000000) :null;
                                //total_received=?,total_sent
                                addressdata.address_type = addresselement.address_type ? addresselement.address_type: null;
                                addressdata.total_received =addresselement.total_received ? addresselement.total_received: null;
                                addressdata.total_sent = addresselement.total_sent ? addresselement.total_sent: null;
                                addressdata.transaction = addresselement.transaction ? addresselement.transaction: null;
                                addressdata.date_created = addresselement.date_created ? addresselement.date_created: null;
                                addressdata.btc_last_time = addresselement.btc_last_time ? addresselement.btc_last_time: null;
                                addressdata.ref_address_number = addresselement.hash160 ? addresselement.hash160 : '0x'+addressdata.address_id;
                                walletdata.totalwalletbalance_btc += ((addresselement?.final_balance)/100000000) * usd_fee.data.USD.last;
                                console.log("all total ba",walletdata.totalwalletbalance_btc);
                                console.log("usd bal", addressdata.totalBalance);
                                console.log("btc final dta",btcData_usd_final_balance);
                                if(addressdata.address_id != undefined){
                                    var newres;
                                    newres = addressdata;
                                    // console.log(newres);
                                    addresslist.push(newres)
                                }
                                else if(partyportfoliodata.name == undefined){
                                    console.log("error");
                                    return;
                                }
                                console.log("btc data",addresselement);
                            } 
                        }
                        catch(error){
                            console.log(error); 
                        }
                            ////////////////////////////////////////////////

                            ////////////////////////////tron/////////////////////////
                            try{
                            const search_query5 = "Select * FROM  tron_balance WHERE wallet_id = ?";
                            let partyres2 = await execquery(search_query5,[element.walletId]);
                            console.log(partyres2);
                            for(let addresselement of partyres2){
                                                let addressdata ={};
                                                addressdata.address_id = addresselement.address_id ? addresselement.address_id: null;
                                                addressdata.address_type = addresselement.address_type ? addresselement.address_type: null;
                                                addressdata.transactions = addresselement.transactions ? addresselement.transactions: null;
                                                addressdata.date_created = addresselement.date_created ? addresselement.date_created: null;
                                                addressdata.totalBalance = addresselement.total_ammount ? addresselement.total_ammount:null;
                                				addressdata.ref_address_number = addresselement.tron_address_id ? addresselement.tron_address_id : '0x'+addressdata.address_id;
                                                addressdata.total_received = addresselement.rcv_amount ? addresselement.rcv_amount:null;
                                                addressdata.total_sent = addresselement.send_amount ? addresselement.send_amount:null;

                                                // amt_rcv_trx,amt_rcv_usdt,amt_rcv_usdc,send_amt_trx,amt_send_usdt,amt_send_usdc
                                                //total_trx,total_usdt,total_usdc
                                                addressdata.amt_rcv_trx = addresselement.amt_rcv_trx ? addresselement.amt_rcv_trx:null;
                                                addressdata.amt_rcv_usdt = addresselement.amt_rcv_usdt ? addresselement.amt_rcv_usdt:null;
                                                addressdata.amt_rcv_usdc = addresselement.amt_rcv_usdc ? addresselement.amt_rcv_usdc:null;
                                                addressdata.send_amt_trx = addresselement.send_amt_trx ? addresselement.send_amt_trx:null;
                                                addressdata.amt_send_usdt = addresselement.amt_send_usdt ? addresselement.amt_send_usdt:null;
                                                addressdata.amt_send_usdc = addresselement.amt_send_usdc ? addresselement.amt_send_usdc:null;

                                                addressdata.total_trx = addresselement.total_trx ? addresselement.total_trx:null;
                                                addressdata.total_usdt = addresselement.total_usdt ? addresselement.total_usdt:null;
                                                addressdata.total_usdc = addresselement.total_usdc ? addresselement.total_usdc:null;


                                                addressdata.tron_last_time = addresselement.tron_last_time ? addresselement.tron_last_time : null;
                                                walletdata.totalwalletbalance_tron += parseFloat(addresselement.total_ammount);
                                                if(addressdata.address_id != undefined){
                                                    var newres;
                                                    newres = addressdata;
                                                    // console.log(newres);
                                                    addresslist.push(newres)
                                                }
                                                else if(partyportfoliodata.name == undefined){
                                                    console.log("error");
                                                    return;
                                                }
                                            }   
                                        }
                                        catch(error){
                                            console.log(error); 
                                        }
                            /////////////////////////////////////////////////////////////


                            // console.log(addresslist);
                                if(addresslist != undefined){
                                    walletdata.addresseslistdata=addresslist
                                    wallets.push(walletdata)
                                    var allwallets =wallets;
                                    console.log("allwallets",wallets);
                                }   
                                           
                        }
                        catch(error){
                            console.log(error); 
                        }

                        //////////////////////////////////////////////////////////////btc

                        /////////////////////////////////////////////////////////////
                    } 
          
                    } catch (error) {
                        console.log(error);
                    }

                
                //////////////////////////////////////////////////////////////////

                /////////////////////////tron data ////////////////////////////////

                ///////////////////////////////////////////////////////////////
                    var total_exchange =[];
                    try {
                        await getexchanges(portfolio_detail.portfolio_id,total_exchange)
                        // console.log("exchange",total_exchange);
                        portfolio_detail.total_exchange =total_exchange;
                        } 
                    catch (error) {
                        console.log(error);    
                        }
                    var total_investments =[];
                    try {
                        await getinvestments(portfolio_detail.portfolio_id,total_investments)
                        // console.log("exchange",total_exchange);
                        portfolio_detail.total_investments =total_investments;
                        } 
                    catch (error) {
                        console.log(error);    
                        }   
                    portfolio_detail.walletsdata = wallets;
                    totalportfolio.push(portfolio_detail)
                    var portfolioresult =totalportfolio;
                    // console.log(portfolioresult);
                        portfolioresult.sort(function (a, b) {
                        var dateA = new Date(a.updated_date), dateB = new Date(b.updated_date)
                        return  dateB -dateA
                    });
            }
            console.log(portfolioresult);
            res.send(portfolioresult)
        } catch (error) {
            console.log(error)
        }
    connection.release()
    })
    }
    catch (error){
        console.log(error);
    }
    // connection.end()
   }


 const getexchanges = async function(portfolio_id,total_exchange) {
    try {
        const search_exchange = "Select * FROM pms_user_exchange_info WHERE portfolio_id=?";
        const resultexchange = await execquery(search_exchange,[portfolio_id]);
        // console.log(resultexchange);
        for(let i of resultexchange){
            let exchange_detail ={};
            exchange_detail.exchange_name = i.exchange_name? i.exchange_name:null;
            exchange_detail.account_type = i.accountType? i.accountType:null;
            exchange_detail.assent_name = i.assent_name? i.assent_name:null;
            exchange_detail.free_value  = i.free ? i.free:null;
            exchange_detail.locked_value = i.locked? i.locked:null;
            exchange_detail.api_key = i.apikey? i.apikey:null;
            exchange_detail.portfolio_id = i.portfolio_id ? i.portfolio_id:null;
            total_exchange.push(exchange_detail);
        }
    } catch (error) {
        console.log(error);
        
    }
    
}
   
    const getinvestments = async function(portfolio_id,total_investments) {
        try {
            const search_exchange = "Select * FROM pms_add_investment WHERE portfolio_id=?";
            const resultinvestments = await execquery(search_exchange,[portfolio_id]);
            // console.log(resultinvestments);
            for(let i of resultinvestments){
                total_investments.push(i)
            }
            // total_investments = resultinvestments;
        } catch (error) {
            console.log(error);
            
        }
    
    }


// getquerty()
 module.exports = getquerty



