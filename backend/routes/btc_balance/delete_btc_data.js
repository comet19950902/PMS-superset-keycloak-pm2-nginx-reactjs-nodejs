
const db = require('../../pool-connection');
var util = require('util')


const delete_btc_address = async (btc_address_id, res) => {
    try {
        await db.getConnection(async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection));
            try {
                const sqlDelete = "DELETE FROM btc_balance where btc_address_id=?"
                let delete_result = await execquery(sqlDelete, [btc_address_id]);
                console.log(delete_result);
                // let btc_address_id_trx = delete_result[0]

                ///////////////delete//////////////////////////////
                try {
                    const sqlDelete4 = "DELETE FROM btc_txc WHERE btc_address_id=?"
                    let result4 = await execquery(sqlDelete4,[btc_address_id]);
                    console.log(result4);
                res.send(delete_result)
                }
                catch (error) {
                    console.log(error);
                    res.send(error);
                }


                /////////////////////////////////////all tra///////////////////
                try {
                const sqlDelete_for_all_tron = "DELETE FROM all_transaction_data WHERE from_address=?"
                    let result_for_tran = await execquery(sqlDelete_for_all_tron,[btc_address_id]);
                    console.log(result_for_tran);
                // res.send(delete_result)
                }
                catch (error) {
                    console.log(error);
                    res.send(error);
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

module.exports = delete_btc_address