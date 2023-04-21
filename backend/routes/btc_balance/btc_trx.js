
const db = require('../../pool-connection');
var util = require('util')

const btc_txc = async (btc_address_id,res) => {
  console.log(btc_address_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        console.log("connection address");
        let sql = "Select * FROM btc_txc WHERE btc_address_id =?";
        let resultdata = await execquery(sql,[btc_address_id]);
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

module.exports = btc_txc;