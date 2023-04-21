require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid')
var util = require('util')
const db = require('../../../pool-connection');    
// const execquery = util.promisify(db.query.bind(db))

const get_simple_protocol = async (invest_name,invest_type,date_of_invest,created_date,quantity,userId,portfolio_id,comment,purchase_price,created_by_name,sell_nav,current_nav,sell_date,exchange_rate,currency,sell_type,purchase_type,sell_id,res) => {
  let current_value;
  let buy_value ;
  let status ="Active";
  let pnl;
  let exchange_value;
  var uuiddno =uuidv4();
  // let transaction_type;
  // let all_transaction_type;
  console.log(uuiddno);
        try{
          db.getConnection( async (err, connection) => {
            if (err) throw err  
            const execquery = util.promisify(connection.query.bind(connection))
              try{
                try {
                  const sqlSearchinv = "Select * from pms_add_investment WHERE investment_name=?"
                        let invres = await execquery(sqlSearchinv,[invest_name])
                        console.log(invres);
                        if (current_nav == null){
                          current_value = null;
                          pnl = null;

                        }
                        else{
                          current_value = current_nav * quantity
                          pnl = (current_nav * quantity)-(purchase_price * quantity)
                        }
                        if (exchange_rate !=null){
                          exchange_value = quantity * exchange_rate
                        }
                        else{
                          exchange_value = null;
                        }
                        let pay_trans = sell_type ? sell_type : null ;

                        let pay_all_tran = purchase_type ? purchase_type : null ;
                       
                        // if (invres && invres.length !=0) {
                        //   res.send("Investment Already Exist with this name.")
                        // }
                        // if (invres && invres.length ==0) {
                        //   res.send("Investment Already Exist with this name.")
                        // }
                        // else{
                          try {
                            
                              const sqlInsert = "INSERT INTO pms_add_investment (investment_id, investment_name, investment_type,quantity, date_of_investment, created_date, created_by, portfolio_id, updated_date, updated_by, comments,purchase_price,sell_nav,current_nav,sell_date,buy_value,current_value,pnl,exchange_rate,currency,exchange_value,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                              let result = await execquery(sqlInsert,[uuiddno, invest_name, invest_type, quantity, date_of_invest, created_date, userId ,portfolio_id, new Date().toUTCString(), userId, comment,purchase_price,sell_nav,current_nav,sell_date,purchase_price * quantity,current_value,pnl,exchange_rate,currency,exchange_value,status])
                                  console.log(result);
                                try {
                                  const sqlSearch = "Select * from pms_add_investment WHERE investment_id=?"
                                  let result2 = await execquery(sqlSearch,[uuiddno])
                                    console.log(result2);
                                    res.send(result2);
                                    var currentInvestment = result2[0];
                                    // console.log(currentInvestment.investment_id);                        
                                } catch (error) {
                                  console.log(error);    
                                }
                          } catch (error) {
                            console.log(error);
                          }
                          /////////////////new investment type data//////////////
                          try { 
                            const sqlInsertnew = "REPLACE INTO new_pms_add_investment (investment_id, investment_name, investment_type,quantity, date_of_investment, created_date, created_by, portfolio_id, updated_date, updated_by, comments,purchase_price,sell_nav,current_nav,sell_date,buy_value,current_value,pnl,exchange_rate,currency,exchange_value,sell_type,purchase_type,new_invest_id,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                            let resultnew = await execquery(sqlInsertnew,[uuiddno, invest_name, invest_type, quantity, date_of_invest, created_date, userId ,portfolio_id, new Date().toUTCString(), userId, sell_id,purchase_price,sell_nav,current_nav,sell_date,purchase_price * quantity,current_value,pnl,exchange_rate,currency,exchange_value,pay_trans,pay_all_tran,uuiddno,status])
                            console.log(resultnew);
                              try {
                                const sqlSearch = "Select * from new_pms_add_investment WHERE new_invest_id=?"
                                let resultnew2 = await execquery(sqlSearch,[uuiddno])
                                  console.log("newpms investment",resultnew2);
                                  // res.send(resultnew2);
                                  var currentInvestmentnew = resultnew2[0];
                              } catch (error) {
                                console.log(error);    
                              }
                        } catch (error) {
                          console.log(error);
                        }
                          //////sup///
                          try {
                            let updated_by_name = null;
                            let deleted_by = null;
                            const sqlInsert = "REPLACE INTO pms_investment_data_logs (investment_id_time_updated, previous_quantity, investment_Id, investment_name, updated_date, updated_by, date_of_investment, investment_type, portfolio_id, comments, new_quantity, new_investment_name, new_date_of_investment_modified, new_comment_modified, new_investment_type, timestamp,previous_purchase_price,new_purchase_price,created_by_name,buy_value,currency,exchange_value,new_buy_value,new_currency,new_exchange_value,sell_type,purchase_type,updated_by_name,sell_nav,deleted_by,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                            let inserteddata = await execquery( sqlInsert,[currentInvestment.investment_id + new Date().getTime(), currentInvestment.quantity, currentInvestment.investment_id, currentInvestment.investment_name, currentInvestment.updated_date, userId, currentInvestment.date_of_investment, currentInvestment.investment_type, currentInvestment.portfolio_id, sell_id,quantity, invest_name, new Date().toUTCString(), comment, invest_type, new Date().getTime(),currentInvestment.purchase_price,purchase_price,created_by_name,currentInvestment.buy_value,currentInvestment.currency,currentInvestment.exchange_value,purchase_price * quantity,currency,exchange_value,pay_trans,pay_all_tran,updated_by_name,sell_nav,deleted_by,status])
                                console.log(inserteddata);
                              try {
                                const sqlSearch = "Select * from  pms_investment_data_logs"
                                let result3 = await execquery(sqlSearch)
                                  console.log(result3);
                                  // res.send(result3);
                              } catch (error) {
                                console.log(error);    
                              }
                        } catch (error) {
                          console.log(error);
                        }////////////////////////////
                        // }
                } catch (error) {
                  console.log(error);
                }
              }
              catch(error){
                console.log(error);
              }
            connection.release()
          })
        }
        catch(error){
          res.send(error)
        }
  }                      




module.exports = get_simple_protocol