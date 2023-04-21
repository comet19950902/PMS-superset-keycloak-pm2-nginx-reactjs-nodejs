// const axios = require('axios');
// var util = require('util')
// const v4 = require('uuid');
// const { uuid } = require('uuidv4');

// require('dotenv').config()
// const db = require('../../pool-connection')

// const accountancy_ledger = async(res)=>{
//     var id = v4()

//     // let address_id = newaddress_id ? newaddress_id : null;
//     try {
//       db.getConnection(async (err, connection) => {
//       if (err) throw err
//       const execquery = util.promisify(connection.query.bind(connection))
//           try {
//               const sqlSearch1 = "SELECT * FROM accountancy"
//               let searchresult1 =await execquery(sqlSearch1) 

//               const sqlSearch_entity = "SELECT * FROM pms_entity"
//               let searchresult_entity = await execquery(sqlSearch_entity)

//               let entity_name = searchresult1[0].name;
           
//                 let game_details_data = searchresult1[0].host;
//                 // let all_game_details = se
//                  if ( entity_name == game_details_data){
                    
//                       const sqlinsert = "REPLACE into ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue) Values (?,?,?,?,?,?,?,?,?,?)"
//                       let insertresult =await execquery(sqlinsert,[id,entity_name,searchresult1[0].player,new Date().getTime(),searchresult1[0].result,searchresult1[0].currency,searchresult1[0].type,searchresult1[0].game,searchresult1[0].game_details,searchresult1[0].venue])       
//                         console.log(insertresult)
//                         res.send(insertresult)
//                  }
//                 //   }
//           } catch (error) {
//               console.log(error);
//           }
//           connection.release()
//           })
//       }catch(error){
//           console.log(error);
//       }
//   }
  
  
  
//   module.exports = accountancy_ledger
