var util = require('util')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var access_key = process.env.DEBANK_ACCESS_KEY;
const db= require('../../../pool-connection'); 
const { Console } = require('console');
// console.log(db);
// const newconnection = db.getConnection(connection);
const execquery = util.promisify(db.query.bind(db))
const updateInvest = async function(invest_name,invest_type,date_of_invest,created_date,quantity,userId,investment_id,comment,purchase_price,sell_nav,current_nav,sell_date,exchange_rate,currency,sell_type,purchase_type,updated_by_name,portfolio_id,sell_id,res){
    console.log("navvvvvvvv",current_nav)
    let buy_value;
    let current_value;
     let status = "Active";
    let pnl;
    let exchange_value;
    try{
        db.getConnection( async (err, connection) => {
         if (err) throw err  
        try {
            const search_query = "Select * FROM pms_add_investment Where investment_id =?";
            let resultdata = await execquery(search_query,[investment_id]);
            console.log(resultdata);
            console.log("result",resultdata);
            var currentInvestment = resultdata[0];
            console.log(currentInvestment.investment_id);
            console.log("setll type",currentInvestment.sell_type)

            const search_query_new = "Select * FROM new_pms_add_investment Where new_invest_id =?";
            let resultdata_new = await execquery(search_query_new,[investment_id]);
            console.log(resultdata_new);
            console.log("result",resultdata_new);
            var currentInvestment_new = resultdata_new[0];
            console.log(currentInvestment_new.investment_id);
            console.log("setll type",currentInvestment_new.sell_type)

            // try {
            //     const search_query11 = "Select * FROM pms_add_investment Where investment_name =?";
            //     let existdata = await execquery(search_query11,[invest_name]);
            //     console.log(existdata);
            //     console.log(existdata.length);
            //     if (existdata && existdata.length!=0) {
            //         res.send("Investment already exist with this name.")
            //     }
            //     else{
                    try {
                        if (current_nav == null){
                            current_value = null;
                            pnl = null;
                            console.log("current value",current_value,pnl)
  
                          }
                          else{
                            current_value = current_nav * quantity
                            pnl = (current_nav * quantity)-(purchase_price * quantity)
                            console.log("current value for elese",current_value,pnl)

                          }
                          if (exchange_rate !=null){
                            exchange_value = quantity * exchange_rate
                          }
                          else{
                            exchange_value = null;
                          }
                          let pay_trans = sell_type ? sell_type :  currentInvestment.sell_type;

                          let pay_all_tran = purchase_type ? purchase_type : currentInvestment.purchase_type ;
                        if ((currentInvestment.quantity != quantity) || (currentInvestment.purchase_price != purchase_price) || (currentInvestment.sell_nav != sell_nav) || (currentInvestment.exchange_rate != exchange_rate)){
                        let deleted_by = null;
                        const insert_query = "REPLACE INTO pms_investment_data_logs (investment_id_time_updated, previous_quantity, investment_Id, investment_name, updated_date, updated_by, date_of_investment, investment_type, portfolio_id, comments, new_quantity, new_investment_name, new_date_of_investment_modified, new_comment_modified, new_investment_type, timestamp,previous_purchase_price,new_purchase_price,created_by_name,buy_value,currency,exchange_value,new_buy_value,new_currency,new_exchange_value,sell_type,purchase_type,updated_by_name,sell_nav,deleted_by,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                        // const insert_query = "INSERT INTO pms_investment_data_logs (investment_id_time_updated,previous_quantity , investment_Id, investment_name, updated_date, updated_by, date_of_investment, investment_type, portfolio_id, comments, new_quantity, new_investment_name, new_date_of_investment_modified, new_comment_modified, new_investment_type, timestamp,previous_purchase_price,new_purchase_price,created_by_name,updated_by_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                        let inserteddata = await execquery(insert_query,[currentInvestment.investment_id + new Date().getTime(), currentInvestment.quantity, currentInvestment.investment_id, currentInvestment.investment_name, currentInvestment.updated_date, userId, currentInvestment.date_of_investment, currentInvestment.investment_type, currentInvestment.portfolio_id,sell_id ? sell_id : currentInvestment_new.sell_id,quantity, invest_name, new Date().toUTCString(), comment, invest_type, new Date().getTime(),currentInvestment.purchase_price,purchase_price,currentInvestment.created_by_name,currentInvestment.buy_value,currentInvestment.currency,currentInvestment.exchange_value,purchase_price * quantity,currency,exchange_value,pay_trans,pay_all_tran,updated_by_name,sell_nav,deleted_by,currentInvestment.status]);
                        console.log(inserteddata); 
                    }
                    if((currentInvestment_new.sell_type == sell_type) || (currentInvestment_new.purchase_type == purchase_type)){
                        console.log("else for check",)
                        try {
                            var newupdate_query = "UPDATE new_pms_add_investment SET investment_name=?, investment_type=?, date_of_investment=?,created_date=?, quantity=?, updated_date=?, updated_by=?,comments=?,purchase_price=?,sell_nav=?,current_nav=?,sell_date=?,buy_value =?,current_value =?,pnl =?,exchange_rate =?,currency =?,exchange_value =?,sell_type =?,purchase_type =?,status=? where new_invest_id=?"
                            let newupdateddata  =  await execquery(newupdate_query, [ invest_name, invest_type, date_of_invest,created_date, quantity,new Date().toUTCString(), userId, sell_id ? sell_id : currentInvestment_new.sell_id ,purchase_price,sell_nav,current_nav,sell_date,purchase_price * quantity,current_value,pnl,exchange_rate,currency,exchange_value,pay_trans,pay_all_tran,investment_id,status ]);
                            console.log(newupdateddata);
                            try {
                                const newsearch_query2 = "Select * FROM new_pms_add_investment Where new_invest_id =?";
                                let newupdated_resultdata = await execquery(newsearch_query2,[investment_id]);
                                console.log(newupdated_resultdata);
                                // res.send(newupdated_resultdata);
                            } catch (error) {
                                console.log(error);
                                res.send("ERROR!")
                            }
                        } catch (error) {
                            console.log(error);
                            res.send("ERROR!, NAME ALREADY EXIST. IN NEW TABLE")
                        }
                    }
                    else if ((currentInvestment_new.sell_type != sell_type) || (currentInvestment_new.purchase_type != purchase_type)){
                        console.log("else block",portfolio_id)
                        try{
                            const sqlInsertnew = "INSERT INTO new_pms_add_investment (investment_id, investment_name, investment_type,quantity, date_of_investment, created_date, created_by, portfolio_id, updated_date, updated_by, comments,purchase_price,sell_nav,current_nav,sell_date,buy_value,current_value,pnl,exchange_rate,currency,exchange_value,sell_type,purchase_type,new_invest_id,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                            let resultnew = await execquery(sqlInsertnew,[currentInvestment_new.investment_id + new Date().getTime(), invest_name ? invest_name:currentInvestment_new.investment_name,invest_type ? invest_type :currentInvestment_new.investment_type,quantity ? quantity :currentInvestment_new.quantity, date_of_invest ? date_of_invest :currentInvestment_new.date_of_investment,currentInvestment_new.created_date ? created_date :currentInvestment_new.created_date, userId ,currentInvestment_new.portfolio_id, new Date().toUTCString(), userId, sell_id ? sell_id : currentInvestment_new.sell_id,purchase_price ? purchase_price :currentInvestment_new.purchase_price,sell_nav ? sell_nav : currentInvestment_new.sell_nav,current_nav ? current_nav : currentInvestment_new.current_nav,sell_date ? sell_date :currentInvestment_new.sell_date,purchase_price * quantity,current_value,pnl,exchange_rate ? exchange_rate :currentInvestment_new.exchange_rate,currency ? currency :currentInvestment_new.currency,exchange_value ? exchange_value :currentInvestment_new.exchange_value,pay_trans,pay_all_tran,currentInvestment_new.new_invest_id,status])
                                console.log(resultnew);
                            }
                            catch (error) {
                                console.log(error);
                                res.send("ERROR! in NEW ADD")
                            }
                    }
                        ////////////////new investment/////////////////
                        if ((purchase_type !=null)){
                        try {
                            var update_query = "UPDATE pms_add_investment SET investment_name=?, investment_type=?, date_of_investment=?,created_date=?, quantity=?, updated_date=?, updated_by=?,comments=?,purchase_price=?,sell_nav=?,current_nav=?,sell_date=?,buy_value =?,current_value =?,pnl =?,exchange_rate =?,currency =?,exchange_value =? where investment_id=?"
                            let updateddata  =  await execquery(update_query, [ invest_name, invest_type, date_of_invest,created_date, quantity,new Date().toUTCString(), userId, comment ,purchase_price,sell_nav,current_nav,sell_date,purchase_price * quantity,current_value,pnl,exchange_rate,currency,exchange_value,investment_id ]);
                            console.log(updateddata);
                            try {
                                const search_query2 = "Select * FROM pms_add_investment Where investment_id =?";
                                let updated_resultdata = await execquery(search_query2,[investment_id]);
                                console.log(updated_resultdata);
                                res.send(updated_resultdata);
                            } catch (error) {
                                console.log(error);
                                res.send("ERROR!")
                            }
                        } catch (error) {
                            console.log(error);
                            res.send("ERROR!, NAME ALREADY EXIST.")
                        }

                        /////////////////////////qty update in 2nd table///////////

                        try {
                            var update_query_2ndnew = "UPDATE new_pms_add_investment SET  quantity=?, updated_date=?,purchase_price=?,buy_value =?,investment_type=? where investment_id=?"
                            let updateddata_2ndnew  =  await execquery(update_query_2ndnew, [ quantity,new Date().toUTCString(),purchase_price,purchase_price * quantity,invest_type,investment_id ]);
                            console.log(updateddata_2ndnew);
                            try {
                                const search_query_new2nd = "Select * FROM new_pms_add_investment Where investment_id =?";
                                let updated_resultdata_new = await execquery(search_query_new2nd,[investment_id]);
                                console.log(updated_resultdata_new);
                                // res.send(updated_resultdata_new);
                            } catch (error) {
                                console.log(error);
                                res.send("ERROR!")
                            }
                        } catch (error) {
                            console.log(error);
                            res.send("ERROR!, NAME ALREADY EXIST.")
                        }

                        /////////////////////////////////////////////////////////////////
                    }
                    else if ((sell_type !=null)){
                        try {
                            var update_query = "UPDATE pms_add_investment SET investment_name=?, investment_type=?, date_of_investment=?, updated_date=?, updated_by=?,purchase_price=?,sell_nav=?,sell_date=?,exchange_rate =?,currency =?,exchange_value =? where investment_id=?"
                            let updateddata  =  await execquery(update_query, [ invest_name, invest_type, date_of_invest,new Date().toUTCString(), userId ,purchase_price,sell_nav,sell_date,exchange_rate,currency,exchange_value,investment_id ]);
                            console.log(updateddata);
                            try {
                                const search_query2 = "Select * FROM pms_add_investment Where investment_id =?";
                                let updated_resultdata = await execquery(search_query2,[investment_id]);
                                console.log(updated_resultdata);
                                res.send(updated_resultdata);
                            } catch (error) {
                                console.log(error);
                                // res.send("ERROR!")
                            }
                        } catch (error) {
                            console.log(error);
                            res.send("ERROR!, NAME ALREADY EXIST.")
                        }
                    }
                    /////////////////////
                    if ((purchase_type != null)){
                        try {
                            var update_query_new = "UPDATE new_pms_add_investment SET investment_name=? where new_invest_id=?"
                            let updateddata_new  =  await execquery(update_query_new, [ invest_name,investment_id ]);
                            console.log(updateddata_new);
                            try {
                                const newsearch_query_new = "Select * FROM new_pms_add_investment Where new_invest_id =?";
                                let newupdated_resultdata_new = await execquery(newsearch_query_new,[investment_id]);
                                console.log(newupdated_resultdata_new);
                                // res.send(newupdated_resultdata);
                            } catch (error) {
                                console.log(error);
                                // res.send("ERROR!")
                            }
                        } catch (error) {
                            console.log(error);
                            res.send("ERROR!, NAME ALREADY EXIST. IN NEW TABLE")
                        }
                        ////////////////////

                        try {
                            var update_query = "UPDATE pms_add_investment SET investment_name=?,updated_date=? where investment_id=?"
                            let updateddata  =  await execquery(update_query, [ invest_name,new Date().toUTCString(),investment_id ]);
                            console.log(updateddata);
                            try {
                                const search_query2 = "Select * FROM pms_add_investment Where investment_id =?";
                                let updated_resultdata = await execquery(search_query2,[investment_id]);
                                console.log(updated_resultdata);
                                res.send(updated_resultdata);
                            } catch (error) {
                                console.log(error);
                                // res.send("ERROR!")
                            }
                        } catch (error) {
                            console.log(error);
                            res.send("ERROR!, NAME ALREADY EXIST.")
                        }
                    }
                    /////////////////
                    else if ((purchase_type == null) && (sell_type == null)){
                        try {
                            var update_query_new = "UPDATE new_pms_add_investment SET investment_name=?,comments=? where new_invest_id=?"
                            let updateddata_new  =  await execquery(update_query_new, [ invest_name,sell_id ? sell_id : currentInvestment_new.sell_id,investment_id ]);
                            console.log(updateddata_new);
                            try {
                                const newsearch_query_new = "Select * FROM new_pms_add_investment Where new_invest_id =?";
                                let newupdated_resultdata_new = await execquery(newsearch_query_new,[investment_id]);
                                console.log(newupdated_resultdata_new);
                                // res.send(newupdated_resultdata);
                            } catch (error) {
                                console.log(error);
                                // res.send("ERROR!")
                            }
                        } catch (error) {
                            console.log(error);
                            res.send("ERROR!, NAME ALREADY EXIST. IN NEW TABLE")
                        }
                        ////////////////////

                        try {
                            var update_query = "UPDATE pms_add_investment SET investment_name=?,updated_date=? where investment_id=?"
                            let updateddata  =  await execquery(update_query, [ invest_name,new Date().toUTCString(),investment_id ]);
                            console.log(updateddata);
                            try {
                                const search_query2 = "Select * FROM pms_add_investment Where investment_id =?";
                                let updated_resultdata = await execquery(search_query2,[investment_id]);
                                console.log(updated_resultdata);
                                res.send(updated_resultdata);
                            } catch (error) {
                                console.log(error);
                                // res.send("ERROR!")
                            }
                        } catch (error) {
                            console.log(error);
                            res.send("ERROR!, NAME ALREADY EXIST.")
                        }
                    }
                    ////////////////////////////
                        /////////////////////////////////////////
                    } catch (error) {
                        console.log(error);
                        res.send("ERROR!, Investment Cannot be Updated.")
                    }
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        } catch (error) {
            console.log(error);
        }
        connection.release()
    })
    }
    catch(error){
        console.log(error);
    }
}

module.exports = updateInvest;
