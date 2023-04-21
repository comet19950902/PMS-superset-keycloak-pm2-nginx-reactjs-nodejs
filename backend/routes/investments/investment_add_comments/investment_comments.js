var util = require('util')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var access_key = process.env.DEBANK_ACCESS_KEY;
const db= require('../../../pool-connection'); 



const updateInvest = async function(comment,userId,investment_id,res){
    try{
        db.getConnection( async (err, connection) => {
         if (err) throw err  
         const execquery = util.promisify(connection.query.bind(connection))
            try {   
                const search_query = "Select * FROM pms_add_investment Where investment_id =?";
                let resultdata = await execquery(search_query,[investment_id]);
                console.log("result",resultdata);
                var currentInvestment = resultdata[0];
                try {
                    // const insert_query = "REPLACE INTO pms_investment_data_logs (investment_id_time_updated, previous_quantity, investment_Id, investment_name, updated_date, updated_by, date_of_investment, investment_type, portfolio_id, comments, new_quantity, new_investment_name, new_date_of_investment_modified, new_comment_modified, new_investment_type, timestamp,previous_purchase_price,new_purchase_price,created_by_name,buy_value,currency,exchange_value,new_buy_value,new_currency,new_exchange_value,sell_type,purchase_type,updated_by_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    // const insert_query = "INSERT INTO pms_investment_data_logs (investment_id_time_updated,previous_quantity, investment_Id, investment_name, updated_date, updated_by, date_of_investment, investment_type, portfolio_id, comments, new_quantity, new_investment_name, new_date_of_investment_modified, new_comment_modified, new_investment_type, timestamp,previous_purchase_price,new_purchase_price,created_by_name,updated_by_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    // console.log("inve logs");
                    // let inserteddata = await execquery(insert_query,[currentInvestment.investment_id + new Date().getTime(), currentInvestment.quantity, currentInvestment.investment_id, currentInvestment.investment_name, currentInvestment.updated_date, userId, currentInvestment.date_of_investment, currentInvestment.investment_type, currentInvestment.portfolio_id, currentInvestment.comments,currentInvestment.quantity,currentInvestment.investment_name, new Date().toUTCString(), comment, currentInvestment.investment_type, new Date().getTime(),currentInvestment.purchase_price,currentInvestment.purchase_price,currentInvestment.created_by_name,currentInvestment.buy_value,currentInvestment.currency,currentInvestment.exchange_value,currentInvestment.buy_value,currentInvestment.currency,currentInvestment.exchange_value,currentInvestment.sell_type,currentInvestment.purchase_type,currentInvestment.updated_by_name ]);
                    // console.log("inve log 22");
                    // console.log(inserteddata);
                    try {
                        const update_query = "UPDATE pms_add_investment SET comments=?, updated_date=?, updated_by=? Where investment_id =?";
                        let resultdata2 = await execquery(update_query,[comment, new Date().toUTCString(),userId, investment_id]);
                        console.log("result",resultdata2);
                        try {
                            const search_query = "SELECT * from pms_add_investment Where investment_id =?";
                            let searchresult = await execquery(search_query,[investment_id]);
                            console.log(searchresult);
                            res.send(searchresult)
                        }
                        catch(error){
                            console.log(error);
                            res.send("Investment cannot be added.")
                        }
                    }catch(error) {
                       console.log(error); 
                       res.send("Investment cannot be added.")
                    }
                    ///////////////////////new investment////////////////
                    // try {
                    //     const newupdate_query = "UPDATE new_pms_add_investment SET comments=?, updated_date=?, updated_by=? Where new_invest_id =?";
                    //     let newresultdata2 = await execquery(newupdate_query,[comment, new Date().toUTCString(),userId, investment_id]);
                    //     console.log("result",newresultdata2);
                    //     try {
                    //         const newsearch_query = "SELECT * from new_pms_add_investment Where new_invest_id =?";
                    //         let newsearchresult = await execquery(newsearch_query,[investment_id]);
                    //         console.log(newsearchresult);
                    //         // res.send(newsearchresult)
                    //     }
                    //     catch(error){
                    //         console.log(error);
                    //         res.send("Investment cannot be added. in new table")
                    //     }
                    // }catch(error) {
                    //    console.log(error); 
                    //    res.send("Investment cannot be added. in new table")
                    // }
                    ////////////////////////////////////////////
                }catch(error){
                    console.log(error);
                    res.send("Investment cannot be added.")
                }
            }
            catch(error){
                console.log(error);
                res.send("Investment cannot be added.")
            }
            connection.release();
        })
    }
    catch(error){
        console.log(error);
    }

}

 module.exports = updateInvest;
