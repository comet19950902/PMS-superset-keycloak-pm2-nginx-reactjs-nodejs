
const db = require('../../../pool-connection');
var util = require('util')

const tron_add_chain = async (address_id,res) => {
  console.log(address_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        console.log("connection address");
        let sql = "Select * FROM tron_address_chain WHERE address_id =?";
        let resultdata = await execquery(sql,[address_id]);
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

module.exports = tron_add_chain;