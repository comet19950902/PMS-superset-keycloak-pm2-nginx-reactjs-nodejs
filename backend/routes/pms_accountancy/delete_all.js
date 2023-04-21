
const db = require('../../pool-connection');
var util = require('util')

const delete_all = async (delete_game, res) => {
    console.log("___________________");
    try {

        db.getConnection(async (err, connection) => {
            if (err) throw (err);
            const execquery = util.promisify(connection.query.bind(connection))
            try {
              let resultupdated =[];
                     console.log(delete_game);
                      for(i of delete_game){
                          let game_id = i.game_id ?i.game_id : null ;
                          if (game_id!=null || game_id != undefined) {
                              console.log(game_id);
                            //   let status = i.status;
                              // console.log(staus);
                              const sqlDelete = "DELETE FROM  accountancy  WHERE (game_id) IN (?)"
                            let resultdata = await execquery(sqlDelete, [game_id]);
                            console.log(resultdata);
              let newresult ={};
                                          newresult = resultdata.affectedRows;
                                          console.log("resultdata.affectedRows",resultdata.affectedRows);
                                          console.log("newresult",newresult);
                                          resultupdated.push(newresult);
                                          newresult ={};
            } 
          }
          res.send(resultupdated)
      
        }
            catch (error) {
                console.log(error);
                res.send(error);
            }
            
            connection.release();
          }
          )
        } 
        catch (error) {
            console.log(error);
            res.send(error);
        }
      
      }




        
//         db.getConnection(async (err, connection) => {
//             if (err) throw (err)
//             const execquery = util.promisify(connection.query.bind(connection));
//             let game_id_data = [];
//             let resultupdated =[];
//             game_id_data.push(game_id)
            
//             for(i of game_id){
//                 let game_id = i.game_id ?i.game_id : null ;
//                 if (game_id!=null || game_id != undefined) {
//                     console.log(game_id);
//                     // let status = i.status;
//                     // console.log(staus);
//                     const sqlDelete = "DELETE FROM  accountancy  WHERE (game_id) IN (?)"
//                     let delete_result = await execquery(sqlDelete, [game_id]);
//                     console.log(delete_result);
//                     let newresult ={};
//                                 newresult = delete_result.affectedRows;
//                                 console.log("resultdata.affectedRows",delete_result.affectedRows);
//                                 console.log("newresult",newresult);
//                                 resultupdated.push(newresult);
//                                 newresult ={};
//   } 
// }
// res.send(resultupdated)
//             connection.release();
//         })
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// }

module.exports = delete_all;
