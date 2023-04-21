
const db = require('../../pool-connection');
var util = require('util')

const update_acc = async (game_id,game,game_details,venue,type,host,creditor,player,shareholders,result,owner_ship,date_created,share_holder,res) => {
  console.log("___________________");
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      console.log("=================================");
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        let resultupdated =[];
        console.log();
        for(i of share_holder){
            let share_holder_id = i.share_holder_id ?i.share_holder_id : null ;
            if (share_holder_id!=null || share_holder_id != undefined) {
              // console.log(share_holder_id);
            //   let share_holder_id = i.share_holder_id;
              let owner_ship = i.owner_ship;
              let  shareholders = i.shareholders;
        const sqlSelect = "Update accountancy SET game=? ,game_details=?,venue=?,type=?,host=?,creditor=?,player=?,shareholders=?,result=?,date_updated=?,owner_ship=?,date_created=?,share_holder_id =?WHERE  game_id=?"
        let result1 =await execquery(sqlSelect,[game,game_details,venue,type,host,creditor,player,shareholders,result, new Date().toUTCString(),owner_ship,date_created,share_holder_id,game_id])       
        console.log("connection address");
        let sql = "Select * FROM pms_accountancy WHERE  game_id=?";
        let resultdata = await execquery(sql,[game,game_details,venue,type,host,creditor,player,shareholders,result, new Date().toUTCString(),owner_ship,date_created,share_holder_id,game_id]);
        console.log(resultdata);
        let newresult ={};
          newresult = resultdata.affectedRows;
          console.log("resultdata.affectedRows",resultdata.affectedRows);
          console.log("newresult",newresult);
          resultupdated.push(newresult);
          newresult ={};
          console.log(resultdata);
          // res.send(resultdata);
                    }
                  }
                  res.send(resultupdated)
      } catch (error) {
          console.log(error);
          res.send(error);
      }
      connection.release();
    })
  } catch (error) {
      console.log(error);
      res.send(error);
  }
}

module.exports = update_acc;