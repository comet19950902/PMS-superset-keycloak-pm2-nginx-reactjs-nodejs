const db = require('../../../pool-connection');
var util = require('util');

const update_satus_investments = async(investment_id,user_name,res) =>{
    let status = "InActive"
    console.log("id",investment_id,user_name)
    try {
        db.getConnection(async (err, connection) => {
          if (err) throw (err);
          console.log("err")
          const execquery = util.promisify(connection.query.bind(connection))
            try {
                console.log("errrr wil")
                try {
                    const sqlSearch_in_log = "Select * from pms_investment_data_logs WHERE investment_id=?"
                    let result2 = await execquery(sqlSearch_in_log,[investment_id])
                      console.log("logggg",result2);
                    //   res.send(result2);
                      var currentInvestment = result2[0];
                     
                    console.log("data will be",currentInvestment);    
                //   
                try{
                const sqlSelect_update = "Update pms_add_investment SET status=? ,updated_date=? WHERE investment_id=?"
                let resultdata_update = await execquery(sqlSelect_update,[status, new Date().toUTCString() ,investment_id])
                console.log("errrr wil")

                const newsqlDelete = "Update new_pms_add_investment SET status=? ,updated_date=? WHERE new_invest_id=?"
                const newdelete_result =await execquery( newsqlDelete,[status, new Date().toUTCString(),investment_id])
                ////////////////////////////////
                    // let updated_by_name = null;
                    // let deleted_by = null;
                    const sqlInsert = "INSERT INTO pms_investment_data_logs (investment_id_time_updated, previous_quantity, investment_Id, investment_name, updated_date, updated_by, date_of_investment, investment_type, portfolio_id, comments, new_quantity, new_investment_name, new_date_of_investment_modified, new_comment_modified, new_investment_type, timestamp,previous_purchase_price,new_purchase_price,created_by_name,buy_value,currency,exchange_value,new_buy_value,new_currency,new_exchange_value,sell_type,purchase_type,updated_by_name,sell_nav,deleted_by,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    let inserteddata =await execquery( sqlInsert,[currentInvestment.investment_id_time_updated+1, currentInvestment.previous_quantity, investment_id, currentInvestment.investment_name, currentInvestment.updated_date, currentInvestment.updated_by, currentInvestment.date_of_investment, currentInvestment.investment_type, currentInvestment.portfolio_id, currentInvestment.comments,currentInvestment.new_quantity,currentInvestment.new_investment_name, new Date().toUTCString(), currentInvestment.comment, currentInvestment.invest_type, new Date().getTime(),currentInvestment.previous_purchase_price,currentInvestment.new_purchase_price,currentInvestment.created_by_name,currentInvestment.buy_value,currentInvestment.currency,currentInvestment.exchange_value,currentInvestment.new_buy_value,currentInvestment.new_currency,currentInvestment.new_exchange_value,currentInvestment.sell_type,currentInvestment.purchase_type,currentInvestment.updated_by_name,currentInvestment.sell_nav,user_name,status])
                    console.log("chee")
                    console.log(inserteddata);
                }
                catch (error) {
                        console.log(error);    
                      }
                    //   try {
                    //     const sqlSearch = "Select * from  pms_investment_data_logs"
                    //     let result3 = await execquery(sqlSearch)
                    //       console.log(result3);
                    //       // res.send(result3);
                    //   } catch (error) {
                    //     console.log(error);    
                    //   }
               ///////////////////////////
                
                ////////////////////////////////////////////////////////
        
                let sql_all_inv = "Select * FROM pms_add_investment WHERE investment_id =?";
                let resultdata_all_tron = await execquery(sql_all_inv,[investment_id]);
                console.log(resultdata_all_tron);
                let sql_all_inv_new = "Select * FROM new_pms_add_investment WHERE new_invest_id =?";
                let resultdata_all_new = await execquery(sql_all_inv_new,[investment_id]);
                console.log(resultdata_all_tron);

                let sql_all_inv_log = "Select * FROM pms_investment_data_logs WHERE investment_id =?";
                let resultdata_all_log = await execquery(sql_all_inv_log,[investment_id]);
                console.log(resultdata_all_tron);
                console.log(resultdata_all_tron);
                res.send(resultdata_all_tron);
            } catch (error) {
                    console.log(error);    
                  }

            } catch (error) {
                console.log(error);
            }            
            connection.release();
        })
    } catch (error) {
        console.log(error);
        
        res.send(error);
    
    }
}

module.exports = update_satus_investments