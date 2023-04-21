const db = require('../../pool-connection');
var util = require('util')
const get_chain_list = async (address_id,res) => {
  console.log(address_id);
  try {

    db.getConnection(async (err, connection) => {
        if (err) throw (err);
        const execquery = util.promisify(connection.query.bind(connection))
        try {
          console.log("connection address");
          let sql = "SELECT * FROM pms_address_chain_list where address_id=?";
          let resultdata = await execquery(sql,[address_id]);
            console.log(resultdata);
            res.send(resultdata);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
        connection.release();
      })
 //end of connection.query()
  } catch (error) {
      console.log(error);
      res.send(error);
  }
}
module.exports = get_chain_list;