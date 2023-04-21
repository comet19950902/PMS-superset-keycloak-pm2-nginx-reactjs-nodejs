const db = require('../../pool-connection');
var util = require('util')
const get_all_portfolio = async (res) => {
    let date =new Date().toUTCString()
  try {
    await db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSelect = "SELECT * FROM pms_portfolio"
          connection.query (sqlSelect,[date],async (err, result)=> {        
            if (err) throw (err)  
            result.sort(function (a, b) {
            var dateA = new Date(a.updated_date), dateB = new Date(b.updated_date)
            return  dateB -dateA
            });
            res.send(result) 
          })
        connection.release();
      })
} catch (error) {
 console.log(error);
}
}
module.exports = get_all_portfolio;

