
const db = require('../../../pool-connection');
var util = require('util')

const get_tron_balance_wallet = async (portfolio_id,res) => {
  console.log('portfolio_id',portfolio_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        console.log("connection address");
        let sql = "Select * FROM tron_balance WHERE portfolio_id =?";
        let resultdata = await execquery(sql,[portfolio_id]);
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

module.exports = get_tron_balance_wallet;