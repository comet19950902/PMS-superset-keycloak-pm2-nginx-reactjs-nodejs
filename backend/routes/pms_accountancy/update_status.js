
const db = require('../../pool-connection');
var util = require('util')

const update_status = async (status_detail,res) => {
  console.log(status_detail);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        let resultupdated =[];
               console.log(status_detail);
                for(i of status_detail){
                    let game_id = i.game_id ?i.game_id : null ;
                    if (game_id!=null || game_id != undefined) {
                        console.log(game_id);
                        let status = i.status;
                        // console.log(staus);
        const sqlSelect = "Update accountancy SET status=? ,date_updated=? WHERE game_id=?"
        let resultdata = await execquery(sqlSelect,[status, new Date().toUTCString() ,game_id])       
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


module.exports = update_status;