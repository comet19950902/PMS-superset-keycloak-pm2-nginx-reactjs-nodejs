
const db = require('../../pool-connection');
var util = require('util')
const v4 = require('uuid');
const { uuid } = require('uuidv4');

const update_shareholder = async (share_holder,res) => {
  console.log(share_holder);
  let status ="A"
  var id = v4()
  console.log("id",id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        let resultupdated =[];
        let resultupdated1 =[];

               console.log();
                for(i of share_holder){
                    let  share_holder_id= i.share_holder_id ?i.share_holder_id : null ;
                    let game_id = i.game_id ?i.game_id : null;
                    if (share_holder_id!=null && share_holder_id != undefined && game_id!=null && game_id != undefined) {
                        console.log(share_holder_id);
                        let shareholders_percentage = i.shareholders_percentage;
                        let  shareholders = i.shareholders;
                        // console.log(staus);
        const sqlSelect = "Update accountancy SET shareholders=?,shareholders_percentage=? ,date_updated=? WHERE share_holder_id=?"
        let resultdata =await execquery(sqlSelect,[shareholders,shareholders_percentage, new Date().toUTCString(),share_holder_id])       
        console.log("connection address");
        let newresult ={};
                                    newresult = resultdata.affectedRows;
                                    console.log("resultdata.affectedRows",resultdata.affectedRows);
                                    console.log("newresult",newresult);
                                    resultupdated.push(newresult);
                                    newresult ={};
        // let sql = "Select * FROM pms_accountancy WHERE  game_id=?";
        // let resultdata = await execquery(sql,[game_id,status]);
        // res.send(resultdata)
      } 
      else if ((share_holder_id ==null || share_holder_id == undefined) && (game_id!=null || game_id != undefined)){
        let shareholders_percentage = i.shareholders_percentage;
        let  shareholders = i.shareholders;
        console.log("owww",shareholders_percentage,shareholders);
        console.log("game",game_id);
        console.log("teja",game_id+new Date().toUTCString(),shareholders,game_id,new Date().toUTCString(),shareholders_percentage,new Date().toUTCString(),status,'cdknsfdjknjksanfdjsnf');
        const sqlSelect = "INSERT INTO accountancy (shareholders,game_id,date_updated,shareholders_percentage,date,status,share_holder_id) VALUES (?,?,?,?,?,?,?);"
        let resultdata1 =await execquery(sqlSelect,[shareholders,game_id,new Date().toUTCString(),shareholders_percentage,new Date().toUTCString(),status,id])       
        console.log("connection address");
        console.log("resul",resultdata1);
        let newresult1 ={};
                                    newresult1 = resultdata1.affectedRows;
                                    console.log("resultdata.affectedRows",resultdata1.affectedRows);
                                    console.log("newresult",newresult1);
                                    resultupdated.push(newresult1);
                                    newresult1 ={};
      }
      // res.send(resultupdated1)

    }
    res.send(resultupdated)

  }
//   res.send(resultdata)

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


module.exports = update_shareholder;