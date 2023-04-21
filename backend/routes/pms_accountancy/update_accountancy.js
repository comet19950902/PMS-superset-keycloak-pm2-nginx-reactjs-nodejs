
const db = require('../../pool-connection');
var util = require('util')

const update_accountancy = async (game_id,game,game_details,venue,type,host,creditor,player,shareholders,result,owner_ship,date_created,res) => {
  console.log("___________________");
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {

        const sqlSelect = "Update accountancy SET game=? ,game_details=?,venue=?,type=?,host=?,creditor=?,player=?,shareholders=?,result=?,date_updated=?,owner_ship=?,date_created=? WHERE game_id =?"
        let result1 =await execquery(sqlSelect,[game,game_details,venue,type,host,creditor,player,shareholders,result, new Date().toUTCString(),owner_ship,date_created,game_id])       
        console.log("connection address");
        let sql = "Select * FROM accountancy WHERE game_id =?";
        let resultdata = await execquery(sql,[game_id]);
          console.log(resultdata);
          res.send(resultdata);
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

module.exports = update_accountancy;