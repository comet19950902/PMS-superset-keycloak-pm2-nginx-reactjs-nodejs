const axios = require('axios');
var util = require('util')
require('dotenv').config()
const db = require('../../pool-connection')

const accountancy = async (game_id,game,game_details,venue,type,host,creditor,player,shareholders,owner_ship,result,date_created,week,share_holder,res) => {
    // console.log('*******',address_id);
    // res.send(result.data);
    var date = new Date().toUTCString()
    console.log("gfff",date);
    let status ="A"
    try {

      db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection))
        try {
          // let resultupdated =[];
              //  console.log();
                for(i of share_holder){
                    let share_holder_id = i.share_holder_id ?i.share_holder_id : null ;
                    if (share_holder_id!=null || share_holder_id != undefined) {
                        // console.log(share_holder_id);
                        // let share_holder_id = i.share_holder_id;
                        let owner_ship = i.owner_ship;
                        let  shareholders = i.shareholders;
          let sql = "REPLACE INTO pms_accountancy(game,game_details,venue,type,host,creditor,player,shareholders,result,game_id,date_updated,owner_ship,date_created,status,week,share_holder_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          let resultdata = await execquery(sql, [game,game_details,venue,type,host,creditor,player,shareholders,result,game_id+share_holder_id,new Date().toUTCString(),owner_ship,date_created,status,week,share_holder_id])
          console.log(resultdata);
          res.send(resultdata);
                    }
                  }
          ////sahre holder-------//////////////
          // try {
          //   let searchresult = await execquery('SELECT * FROM pms_accountancy');
          //   console.log(searchresult);
          //   for (let id of searchresult) {
          //     if (id.share_holder_id !=null && id.shareholders !=null && id.owner_ship !=null){
          //   // let share_holder_id = share_holder_id;
          //     console.log(id.share_holder_id);
          //            try {
          //               let sql = "REPLACE INTO pms_share_holder (share_holder_name,updated_time,share_holder_id,game_id,ownership) VALUES (?,?,?,?,?);"
          //               let newresult =  await execquery(sql, [id.shareholders,new Date().toUTCString(),id.share_holder_id,id.game_id,id.owner_ship])
          //                 console.log(newresult);
          //             } catch (error) {
          //               console.log(error);
          //             } 
          //           }
          //         }
          // } catch (error) {
          //   console.log(error);
          // } 

          /////////////////////////////////////////////
        } catch (error) {
          console.log(error);
          res.send(error)
        }
        connection.release();
      })
    } catch (error) {
      console.log(error);
      res.send(error);
  
    }
  
  }
  
module.exports = accountancy;