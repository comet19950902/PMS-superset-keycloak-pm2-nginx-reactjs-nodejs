const axios = require('axios');
var util = require('util')
const v4 = require('uuid');
const { uuid } = require('uuidv4');

require('dotenv').config()
const db = require('../../pool-connection')

const accountancy_ledger = async(game_id,entity_type,res)=>{
    var id = v4()

    // let address_id = newaddress_id ? newaddress_id : null;
    try {
      db.getConnection(async (err, connection) => {
      if (err) throw err
      const execquery = util.promisify(connection.query.bind(connection))
          try {
              const sqlSearch1 = "SELECT * FROM accountancy WHERE  game_id=?"
              let searchresult1 =await execquery(sqlSearch1,[game_id]) 
            //   console.log("payment",searchresult1);     
            // console.log(searchresult1)
                //   for (i of searchresult1[1]){
                      let game_details_data = searchresult1[0];
                    //   let share_holder = game_details_data[i].shareholders
                    //   console.log("tran",searchresult1[1]);
                      const sqlInsert1 = "REPLACE into accountancy_ledger (ledger_id,host,entity_type,result,game_id,creditor,shareholders,share_holder_id,owner_ship,date_updated) Values (?,?,?,?,?,?,?,?,?,?)"
                      let insertresult =await execquery(sqlInsert1,[id,game_details_data.host,entity_type,game_details_data.result,game_details_data.game_id,game_details_data.creditor,game_details_data.shareholders,game_details_data.share_holder_id,game_details_data.owner_ship,new Date().getTime()])       
                          console.log(insertresult)
                        //   const sqlSelect2 = "Select * from accountancy Where  game_id=?"
                        //       let result2 =await execquery(sqlSelect2,[game_id])      
                        //           console.log(result2)
                                  res.send(insertresult)
                //   }
          } catch (error) {
              console.log(error);
          }
          connection.release()
          })
      }catch(error){
          console.log(error);
      }
  }
  
  
  
  module.exports = accountancy_ledger
