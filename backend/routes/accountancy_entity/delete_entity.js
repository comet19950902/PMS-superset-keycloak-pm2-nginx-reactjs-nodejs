
const db = require('../../pool-connection');
var util = require('util')

const delete_entity = async (id,res) => {
  console.log("___________________");
  try {
    await db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection));
        try {
            const sqlDelete = "DELETE FROM  pms_entity where id=?"
            let delete_result = await execquery(sqlDelete, [id]);
            console.log(delete_result);
            res.send(delete_result)
        } catch (error) {
            console.log(error);
            res.send(error);
        }

        /////////////////////////////////////delete ledgre///////////////////////////////
        // try {
        //     const sqlDelete_ledgre_entity = "DELETE FROM ledgre_entity where e_id=?"
        //     let delete_ledgre_entity = await execquery(sqlDelete_ledgre_entity, [id]);
        //     console.log(delete_ledgre_entity);
        //     // res.send(delete_result)
        // } catch (error) {
        //     console.log(error);
        //     res.send(error);
        // }
        ////////////////////////////////////////////////////////////////////////////
        connection.release();
    })
} catch (error) {
    console.log(error);
    res.send(error);
}
}

module.exports = delete_entity;