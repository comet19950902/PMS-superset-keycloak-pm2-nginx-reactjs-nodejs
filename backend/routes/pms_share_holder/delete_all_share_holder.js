
const db = require('../../pool-connection');
var util = require('util')

const delete_all_share_holder = async (share_id,res) => {
  console.log("___________________");
  try {
    await db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection));
        // let game_id_data=[];
        // game_id_data.push(game_id)
        // console.log(game_id_data)
        try {
            const sqlDelete = "DELETE FROM  pms_shareholder_data WHERE (share_id) IN (?)"
            let delete_result = await execquery(sqlDelete, [share_id]);
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

module.exports = delete_all_share_holder;