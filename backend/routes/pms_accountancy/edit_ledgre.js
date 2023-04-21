
const db = require('../../pool-connection');
var util = require('util')

const update_share = async (share_holder,res) => {
  console.log(share_holder);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        //////////////////entity////////////////
        const sqlSearch_entity = "SELECT * FROM ledgre_entity"
        let searchresult1 = await execquery(sqlSearch_entity)
        /////////////////////////////////////////////////////
        let resultupdated =[];
               console.log(share_holder);
                for(i of share_holder){
                    let game_id = i.game_id ?i.game_id : null ;
                    if (game_id!=null || game_id != undefined) {
                        console.log(game_id);
                        let creditor = i.creditor
                        for(let k=0;k < searchresult1.length;k++){
                          if(searchresult1[k].percentage!=""){
                        // let status = i.status;
                        // console.log(staus);
        const sqlSelect = "Update ledgre_entity SET creditor=? WHERE game_id=?"
        let resultdata = await execquery(sqlSelect,[creditor,game_id])       
        console.log("connection address");
        let newresult ={};
                                    newresult = resultdata.affectedRows;
                                    console.log("resultdata.affectedRows",resultdata.affectedRows);
                                    console.log("newresult",newresult);
                                    resultupdated.push(newresult);
                                    newresult ={};
      } 
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


module.exports = update_share;