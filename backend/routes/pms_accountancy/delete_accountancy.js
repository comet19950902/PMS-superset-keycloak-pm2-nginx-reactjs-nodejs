
const db = require('../../pool-connection');
var util = require('util')

const delete_accountancy = async (game_id,res) => {
  console.log("___________________");
  try {
    await db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection));
        try {
            const sqlDelete = "DELETE FROM  accountancy where game_id=?"
            let delete_result = await execquery(sqlDelete, [game_id]);
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

module.exports = delete_accountancy;