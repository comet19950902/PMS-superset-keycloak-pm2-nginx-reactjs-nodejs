// const axios = require('axios');
// require('dotenv').config()
// // var XLSX = require('xlsx')
// const db = require('../../pool-connection');
// var util = require('util')
// const v4 = require('uuid');
// const { uuid } = require('uuidv4');

// const upload_excel = async (share_holder, res) => {
//     console.log(share_holder);
//     let status = "A"
//     let game_id_of_table;
//     let game_of_table;
//     let result_usd;
//   let host_data;
//   let game_details_data;
//   let venue_data;
//   let creditor_data;
//   let player_name;
//   let type_data;
//   let date_created_data;
//   let owner_ship_data;
//   let share_holder_data;
//   let share_holder_data_id;
//   let week_data;
//     var id = v4()
//     console.log("id", id);
//     try {
//       db.getConnection(async (err, connection) => {
//         if (err) throw (err);
//         const execquery = util.promisify(connection.query.bind(connection))
//         try {
//           let resultupdated = [];
//           console.log("data");
//           for (i of share_holder) {
//             const sqlSelect1 = "SELECT * FROM  accountancy";
//             var result1 = await execquery(sqlSelect1)
//             console.log("res",result1);
//             for (let j=0;j<result1.length;j++){
//             game_id_of_table = result1[j].game_id;
//             let share_holder_id = i.share_holder_id ? i.share_holder_id : null;
//             let game_id = i.game_id ? i.game_id : null;
//             if (game_id == game_id_of_table && game_id != undefined && game_id!=null) {
//             //   const sqlSelect1 = "SELECT * FROM  accountancy WHERE game_id=?";
//             result_usd= result1[j].result;
//             host_data= result1[j].host;
//             game_of_table = result1[j].game;
//             game_details_data = result1[j].game_details;
//             venue_data = result1[j].venue;
//             type_data = result1[j].type;
//             creditor_data =  result1[j].creditor;
//             player_name = result1[j].player;
//             owner_ship_data = result1[j].owner_ship;
//             share_holder_data = result1[j].shareholders;
//             share_holder_data_id = result1[j].share_holder_id
//             console.log("resultupdated1",result_usd);
//             console.log("res",result_usd.result);
//             share_holder_data_id = result1[j].share_holder_id
//             let game = i.game ? i.game:game_of_table;
//             let game_details = i.game_details ? i.game_details:game_details_data;
//             let venue = i.venue ? i.venue:venue_data;
//             let type = i.type ? i.type:type_data;
//             let host = i.host ?i.host:host_data;
//             let creditor = i.creditor ?i.creditor:creditor_data;
//             let player = i.player ?i.player:player_name;
//             let result = i.result ? i.result:result_usd;
//             console.log("res",result);
//             let date_created = i.date_created ?i.date_created:date_created_data;
//             let share_holder_id = i.share_holder_id ?i.share_holder_id:share_holder_data_id;
//             // let status = i.status;
//             let week = i.week ? i.week:week_data;
//             // let share_holder_id = i.share_holder_id;
//               console.log("resultupdated1",result_usd);
//             console.log("res",result);
//               // let status = i.status;
//               let owner_ship = i.owner_ship ?i.owner_ship:owner_ship_data;
//               let shareholders = i.shareholders ?i.shareholders:share_holder_data;
  
//               // let share_holder_id = i.share_holder_id;
//             //   let owner_ship = i.owner_ship ;
//             //   let shareholders = i.shareholders;
//               const sqlSelect = "Update accountancy  SET game=? ,game_details=?,venue=?,type=?,host=?,creditor=?,player=?,shareholders=?,result=?,date_updated=?,owner_ship=?,week=?,date_created=?,share_holder_id=? WHERE game_id =?"
//               let resultdata = await execquery(sqlSelect, [game,game_details,venue,type,host,creditor,player,shareholders,result, new Date().toUTCString(),owner_ship,week,date_created,share_holder_id,game_id])
//               console.log("connection address");
//               let newresult = {};
//               console.log("resultupdated111", resultdata);
//               newresult = resultdata.affectedRows;
//               console.log("resultdata.affectedRows", resultdata.affectedRows);
//               console.log("newresult", newresult);
//               resultupdated.push(newresult);
//               newresult = {};
//               console.log(resultdata);
//             }
//             // else if (game_id != game_id_of_table && game_id != undefined && game_id!=null) {
//             //   let owner_ship = i.owner_ship;
//             //   let shareholders = i.shareholders;
//             //   const sqlSelect = "REPLACE INTO accountancy(game_share_id,game,game_details,venue,type,host,creditor,player,shareholders,result,game_id,date_updated,owner_ship,date_created,status,week,share_holder_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
//             //   let resultdata1 = await execquery(sqlSelect, [game_id+share_holder_id,game,game_details,venue,type,host,creditor,player,shareholders,result,game_id,new Date().toUTCString(),owner_ship,date_created,status,week,share_holder_id])
//             //   console.log("connection address");
//             //   console.log("resul", resultdata1);
//             //   let newresult1 = {};
//             //   newresult1 = resultdata1.affectedRows;
//             //   console.log("resultdata.affectedRows", resultdata1.affectedRows);
//             //   console.log("newresult", newresult1);
//             //   resultupdated.push(newresult1);
//             //   newresult1 = {};
//             // }
//         }
//         }
//           res.send(resultupdated)
//         }
//         catch (error) {
//           console.log(error);
//           res.send(error);
//         }
//         connection.release();
//       }
//       )
//     }
//     catch (error) {
//       console.log(error);
//       res.send(error);
//     }
//   }
//   module.exports = upload_excel;

const axios = require('axios');
var util = require('util')
require('dotenv').config()
const db = require('../../pool-connection')
const v4 = require('uuid');
const { uuid } = require('uuidv4');
const { type } = require('os');

const update_all = async (share_holder, res) => {
  console.log(share_holder);
  let status = "A"
  var id = v4()
  console.log("id", id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        let sqlSelect1 = "SELECT * FROM  accountancy";
        var result1 = await execquery(sqlSelect1)
        console.log("all data",result1);
        let resultupdated = [];
        console.log();
        for (i of share_holder) {
          let share_holder_id = i.share_holder_id ? i.share_holder_id :result1[0].share_holder_id ;
          let game_id = i.game_id ? i.game_id : null;
          if (game_id == result1[k].game_id){
            console.log('abc',game_id,result1[k].game_id)
            // const sqlSelect1 = "SELECT * FROM  accountancy WHERE game_id=?";
            // var result1 = await execquery(sqlSelect1,[game_id])
            // console.log("res",result1);
            const game_details = i.game_details ? i.game_details : result1[k].game_details;
            const venue = i.venue ? i.venue : result1[k].venue;
            const game = i.game ? i.game : result1[k]?.game;
            let type = i.type ? i.type : result1[k].type;
            let host = i.host ?i.host : result1[k].host;
            let group_ = i.group_ ?i.group_ : result1[k].group_;
            let player = i.player ?i.player : result1[k].player;
            let result = i.result ? i.result : result1[k].result;
            console.log("res",result);
            let date = i.date ?i.date : result1[k].date;
            let share_holder_id = i.share_holder_id ? i.share_holder_id : result1[k].share_holder_id;
            let status = i.status ? i.status:result1[k].status;
            let exchange_rate = i.exchange_rate ? i.exchange_rate : result1[k].exchange_rate;
            let comment = i.comment ? i.comment : result1[k].comment;
            let week = i.week ? i.week : result1[k].week; 
            // let share_holder_id = i.share_holder_id;
            let shareholders_percentage = i.shareholders_percentage==" " ? result1[k].shareholders_percentage : i.shareholders_percentage ;
            console.log("ALLL SHARE DATA",shareholders_percentage);
            let shareholders = i.shareholders=='' ? result1[k].shareholders : i.shareholders;
            let currency = i.currency ? i.currency : currency_data;
            try{
            const sqlSelect = "Update accountancy SET game_details=?,game=?,venue=?,type=?,host=?,group_=?,player=?,result=?,date=?,status=?,week=?,shareholders=?,shareholders_percentage=?,date_updated=?,currency=?,exchange_rate=?,comment=?,share_holder_id=?  WHERE game_id=?"
            let resultdata = await execquery(sqlSelect, [game_details,game, venue, type, host, group_, player, result, date, status, week, shareholders, shareholders_percentage, new Date().toUTCString(), currency,exchange_rate,comment,share_holder_id,game_id])
            console.log("connection address");
            let newresult = {};
            console.log("resultupdated111", resultdata);
            newresult = resultdata.affectedRows;
            console.log("resultdata.affectedRows", resultdata.affectedRows);
            console.log("newresult", newresult);
            resultupdated.push(newresult);
            newresult = {};
            console.log(resultdata);
            }
            catch (error) {
              console.log(error);
              res.send(error);
            }
          }
          else {
            let game_details1 = i.game_details;
            let venue1 = i.venue;
            let game1 = i.game ;
            let type1 = i.type ;
            let host1 = i.host ;
            let group1_ = i.group_;
            let player1 = i.player;
            let result1 = i.result ;
            // console.log("res",result);
            let date1 = i.date;
            // let share_holder_id = i.share_holder_id ?i.share_holder_id:share_holder_data_id;
            // let status = i.status;
            let exchange_rate1 = i.exchange_rate;
            let comment1 = i.comment ;
            let week1 = i.week ; 
            let game_id1 = i.game_id;
            // let shareholders_percentage = i.shareholders_percentage ?i.shareholders_percentage:owner_ship_data;
            // let shareholders = i.shareholders ?i.shareholders:share_holder_data;
            let currency1 = i.currency;
            let shareholders_percentage1 = i.shareholders_percentage;
            let shareholders1 = i.shareholders;
            try{ 
              let sql = "REPLACE INTO accountancy(game_id,game,game_details,venue,type,host,group_,player,shareholders,result,date_updated,shareholders_percentage,date,status,week,share_holder_id,currency,exchange_rate,comment) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
            let resultdata = await execquery(sql, [game_id1,game1,game_details1,venue1,type1,host1,group1_,player1,shareholders1,result1,new Date().toUTCString(),shareholders_percentage1,date1,status,week1,id+new Date().getTime(),currency1,exchange_rate1,comment1])
          let newresult ={};
          newresult = resultdata.affectedRows;
          console.log("resultdata.affectedRows",resultdata.affectedRows);
          console.log("newresult",newresult);
          resultupdated.push(newresult);
          newresult ={};
          console.log(resultdata);
            }
            catch (error) {
              console.log(error);
              res.send(error);
            }
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
module.exports = update_all;
