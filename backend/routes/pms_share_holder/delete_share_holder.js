
const db = require('../../pool-connection');
var util = require('util')

const delete_shareholder = async (holder_id,res) => {
  console.log("____________________________");
  try {
    await db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection));
        try {
            const sqlDelete = "DELETE FROM  pms_share_holder where holder_id=?"
            let delete_result = await execquery(sqlDelete, [holder_id]);
            console.log(delete_result);
            res.send(delete_result)
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

module.exports = delete_shareholder;