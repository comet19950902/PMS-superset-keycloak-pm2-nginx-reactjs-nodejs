const db = require('../../pool-connection')
var util = require('util')

const update_entity = async (id, name, type, res) => {
  console.log(id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        ///////////////
        let sql_name = "SELECT * FROM pms_entity where name=?"
        let resultdata_name = await execquery(sql_name, [name]);
        console.log(resultdata_name);
        if (resultdata_name.length >= 1) {
          try {
            res.send("Entity Name Already Exist")
          }
          catch (error) {
            console.log(error);
            res.send(error)
          }
        }
        else {
          try {
            /////////////
            const sqlSelect = "Update pms_entity SET name=? ,type=?,date_updated=? WHERE id =?"
            let result = await execquery(sqlSelect, [name, type, new Date().toUTCString(), id])
            console.log("connection address");
            let sql = "Select * FROM pms_entity WHERE id =?";
            let resultdata = await execquery(sql, [id]);
            console.log(resultdata);
            res.send(resultdata);
          }
          catch (error) {
            console.log(error);
            res.send(error);
          }
        }
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

module.exports = update_entity;