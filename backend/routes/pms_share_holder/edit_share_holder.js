const db = require('../../pool-connection')
var util = require('util')

const update_shareholder_name = async (share_holder_name,holder_id,res) => {
  console.log(holder_id);
  let sh_name= share_holder_name.trim()
  console.log('*******');
  let status = "Inactive"

  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      //////////////

      try {
        let sql_name = "SELECT * FROM pms_share_holder where share_holder_name=?"
        let resultdata_name = await execquery(sql_name, [share_holder_name]);
        console.log(resultdata_name);
        if (resultdata_name.length >= 1) {
          try {
            res.send("Share Holder Name Already Exist")
          }
          catch (error) {
            console.log(error);
            res.send(error)
          }
        }
      ///////////////////
      else if ((resultdata_name.length == 0) && (sh_name.length !=0)) {
        console.log("elese")
      try {
        const sqlSelect = "Update pms_share_holder SET share_holder_name=? ,updated_time=? WHERE holder_id =?"
        let result =await execquery(sqlSelect,[share_holder_name, new Date().toUTCString(),holder_id])       
        console.log("connection address");
        let sql = "Select * FROM pms_share_holder WHERE holder_id =?";
        let resultdata = await execquery(sql,[holder_id]);
          console.log(resultdata);
          res.send(resultdata);
        } catch (error) {
          console.log(error);
          res.send(error)
        }
      }
      else if (sh_name.length == 0){
        try {
          res.send("Empty share holder name can not add")
        }
        catch (error) {
          console.log(error);
          res.send(error)
        }
      }
    }catch (error) {
      console.log(error);
      res.send(error)
    }
      connection.release();
    })
  } catch (error) {
      console.log(error);
      res.send(error);
  }
}

module.exports = update_shareholder_name;