
const db = require('../../../pool-connection');
var util = require('util')


const delete_tron_address = async (address_id, res) => {
    try {
        await db.getConnection(async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection));
            try {
                const sqlDelete = "DELETE FROM tron_balance where address_id=?"
                let delete_result = await execquery(sqlDelete, [address_id]);
                console.log(delete_result);
                res.send(delete_result)
            } catch (error) {
                console.log(error);
                res.send(error);
            }
//////////////////////////////delete tron tran////////////////////////////////
            try {
                const sqlDelete_tron_tran = "DELETE FROM tron_transactions where address_id=?"
                let delete_tron_tran = await execquery(sqlDelete_tron_tran, [address_id]);
                console.log(delete_tron_tran);
                // res.send(delete_result)
            } catch (error) {
                console.log(error);
                res.send(error);
            }
///////////////////////////////delete all tran////////////////////////
            try {
                const sqlDelete_for_all_tron = "DELETE FROM all_transaction_data WHERE from_address=?"
                let delete_result_for_tron = await execquery(sqlDelete_for_all_tron, [address_id]);
                console.log(delete_result_for_tron);
                // res.send(delete_result)
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

module.exports = delete_tron_address