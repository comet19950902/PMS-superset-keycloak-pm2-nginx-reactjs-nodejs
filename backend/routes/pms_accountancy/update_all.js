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
  let result_usd;
  let currency_data;
  let week_data;
  let host_data;
  let game_details_data;
  let venue_data;
  let group_data;
  let player_name;
  let type_data;
  let game_data;
  let date_created_data;
  let owner_ship_data;
  let share_holder_data;
  let share_holder_data_id;
  let status_data;
  var exchange_rate_data;
  let comment_data
  var id = v4()
  console.log("id", id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        let resultupdated = [];
        console.log();
        for (i of share_holder) {
          let share_holder_id = i.share_holder_id ? i.share_holder_id : null;
          let game_id = i.game_id ? i.game_id : null;
          if (game_id !=null && game_id!=undefined ){
            const sqlSelect1 = "SELECT * FROM  accountancy where game_id=?";
            var result1 = await execquery(sqlSelect1,game_id)
            /////////////////////////not id///////////////////////
            try{
            const sqlSelect_id = "SELECT * FROM  accountancy";
            var result_id = await execquery(sqlSelect_id)
            for (let j=0;j<result_id.length;j++){
              result_usd= result_id[j].result;
              week_data = result_id[j].week;
              host_data= result_id[j].host;
              currency_data = result_id[j].currency;
              game_details_data = result_id[j].game_details;
              venue_data = result_id[j].venue;
              type_data = result_id[j].type;
              game_data = result_id[j].game;
              status_data = result_id[j].status;
              group_data =  result_id[j].group_;
              date_created_data = result_id[j].date;
              player_name = result_id[j].player;
              owner_ship_data = result_id[j].shareholders_percentage;
              share_holder_data = result_id[j].shareholders;
              share_holder_data_id = result_id[j].share_holder_id;
              exchange_rate_data = result_id[j].exchange_rate;
              comment_data = result_id[j].comment;
              console.log("resultupdated1",result_usd);
              console.log("res",result_usd.result);
              let game_details = i.game_details ? i.game_details:game_details_data;
              let venue = i.venue ? i.venue:venue_data;
              let game = i.game ? i.game:game_data;
              let type = i.type ? i.type:type_data;
              let host = i.host ?i.host:host_data;
              let group_ = i.group_ ?i.group_:group_data;
              let player = i.player ?i.player:player_name;
              let result = i.result ? i.result:result_usd;
              console.log("res2",result);
              let date = i.date ?i.date:date_created_data;
              let share_holder_id = i.share_holder_id ?i.share_holder_id:share_holder_data_id;
              let status = i.status ? i.status:status_data;
              let exchange_rate = i.exchange_rate ? i.exchange_rate:exchange_rate_data;
              let comment = i.comment ? i.comment:comment_data;
              let week = i.week ? i.week:week_data; 
              console.log("exchange rate after if block",exchange_rate)
              // let share_holder_id = i.share_holder_id;
              let shareholders_percentage = i.shareholders_percentage ?i.shareholders_percentage:owner_ship_data;
              // console.log("ALLL SHARE DATA",shareholders_percentage_not_null);
              let shareholders = i.shareholders ?i.shareholders:share_holder_data;
              let currency = i.currency ? i.currency:currency_data;
              try{
              const sqlSelect = "REPLACE INTO accountancy(game_id,game,game_details,venue,type,host,group_,player,shareholders,result,date_updated,shareholders_percentage,date,status,week,share_holder_id,currency,exchange_rate,comment) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
              //   let resultdata = await execquery(sql, [game_id,game,game_details,venue,type,host,group_,player,shareholders_data,result,new Date().toUTCString(),shareholders_percentage_data,date,status,week,id+new Date().getTime(),currency,exchange_rate,comment])
              let resultdata = await execquery(sqlSelect, [game_id,game,game_details,venue,type,host,group_,player,shareholders,result,new Date().toUTCString(),shareholders_percentage,date,status,week,id+new Date().getTime(),currency,exchange_rate,comment])
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
              // res.send(resultupdated)
      }
      catch (error) {
        console.log(error);
        res.send(error);
      }
            ////////////////////////////////////////////////

            console.log("res1",result1);
            // console.log("exchange rate",result1[0].exchange_rate)
            for (let j=0;j<result1.length;j++){
            result_usd= result1[j].result;
            week_data = result1[j].week;
            host_data= result1[j].host;
            currency_data = result1[j].currency;
            game_details_data = result1[j].game_details;
            venue_data = result1[j].venue;
            type_data = result1[j].type;
            game_data = result1[j].game;
            status_data = result1[j].status;
            group_data =  result1[j].group_;
            date_created_data = result1[j].date;
            player_name = result1[j].player;
            owner_ship_data = result1[j].shareholders_percentage;
            share_holder_data = result1[j].shareholders;
            share_holder_data_id = result1[j].share_holder_id;
            exchange_rate_data = result1[j].exchange_rate;
            comment_data = result1[j].comment;
            console.log("resultupdated1",result_usd);
            console.log("res",result_usd.result);
            let game_details = i.game_details ? i.game_details:game_details_data;
            let venue = i.venue ? i.venue:venue_data;
            let game = i.game ? i.game:game_data;
            let type = i.type ? i.type:type_data;
            let host = i.host ?i.host:host_data;
            let group_ = i.group_ ?i.group_:group_data;
            let player = i.player ?i.player:player_name;
            let result = i.result ? i.result:result_usd;
            console.log("res2",result);
            let date = i.date ?i.date:date_created_data;
            let share_holder_id = i.share_holder_id ?i.share_holder_id:share_holder_data_id;
            let status = i.status ? i.status:status_data;
            let exchange_rate = i.exchange_rate ? i.exchange_rate:exchange_rate_data;
            let comment = i.comment ? i.comment:comment_data;
            let week = i.week ? i.week:week_data; 
            console.log("exchange rate after if block",exchange_rate)
            // let share_holder_id = i.share_holder_id;
            let shareholders_percentage = i.shareholders_percentage ?i.shareholders_percentage:owner_ship_data;
            // console.log("ALLL SHARE DATA",shareholders_percentage_not_null);
            let shareholders = i.shareholders ?i.shareholders:share_holder_data;
            let currency = i.currency ? i.currency:currency_data;
            try{
            const sqlSelect = "REPLACE INTO accountancy(game_id,game,game_details,venue,type,host,group_,player,shareholders,result,date_updated,shareholders_percentage,date,status,week,share_holder_id,currency,exchange_rate,comment) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
            //   let resultdata = await execquery(sql, [game_id,game,game_details,venue,type,host,group_,player,shareholders_data,result,new Date().toUTCString(),shareholders_percentage_data,date,status,week,id+new Date().getTime(),currency,exchange_rate,comment])
            let resultdata = await execquery(sqlSelect, [game_id,game,game_details,venue,type,host,group_,player,shareholders,result,new Date().toUTCString(),shareholders_percentage,date,status,week,id+new Date().getTime(),currency,exchange_rate,comment])
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

          }
          // else  if (){
          //   let game_details = i.game_details;
          //   let venue = i.venue;
          //   let game = i.game ;
          //   let type = i.type ;
          //   let host = i.host ;
          //   let group_ = i.group_;
          //   let player = i.player;
          //   let result = i.result ;
          //   console.log("res3",result);
          //   let date = i.date;
          //   // let share_holder_id = i.share_holder_id ?i.share_holder_id:share_holder_data_id;
          //   // let status = i.status;
          //   let exchange_rate = i.exchange_rate;
          //   let comment = i.comment ;
          //   let week = i.week ; 
          //   let game_id = i.game_id;
          //   // let shareholders_percentage = i.shareholders_percentage ?i.shareholders_percentage:owner_ship_data;
          //   // let shareholders = i.shareholders ?i.shareholders:share_holder_data;
          //   let currency = i.currency;
          //   let shareholders_percentage_data = i.shareholders_percentage;
          //   let shareholders_data = i.shareholders;
          //   try{ 
          //     let sql = "REPLACE INTO accountancy(game_id,game,game_details,venue,type,host,group_,player,shareholders,result,date_updated,shareholders_percentage,date,status,week,share_holder_id,currency,exchange_rate,comment) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
          //   let resultdata = await execquery(sql, [game_id,game,game_details,venue,type,host,group_,player,shareholders_data,result,new Date().toUTCString(),shareholders_percentage_data,date,status,week,id+new Date().getTime(),currency,exchange_rate,comment])
          // let newresult ={};
          // newresult = resultdata.affectedRows;
          // console.log("resultdata.affectedRows",resultdata.affectedRows);
          // console.log("newresult",newresult);
          // resultupdated.push(newresult);
          // newresult ={};
          // console.log(resultdata);
          //   }
          //   catch (error) {
          //     console.log(error);
          //     res.send(error);
          //   }
          // }
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
