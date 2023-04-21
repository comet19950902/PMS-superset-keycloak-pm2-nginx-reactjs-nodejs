
const db = require('../../../pool-connection');
var util = require('util')


const delete_exchange = async(api_key,res)=>{
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection));
            try {
                const sqlSelect = "DELETE FROM pms_user_exchange_info where apikey=?"
                let result = await  execquery(sqlSelect,[api_key]);
                console.log(result);
                try {
                    const sqlDelete = "DELETE FROM pms_exchange_api_key_credentials where exchange_apikey=?"
                    let delete_result = await execquery(sqlDelete,[api_key]);
                    console.log(delete_result);
                    try {
                          const sqlDelete2 = "DELETE FROM pms_exchange_data_logs where exchange_api_key=?"
                        let delete_result2 = await execquery(sqlDelete2,[api_key]);
                        console.log(delete_result2);
                    } catch (error) {
                        console.log(error);
                        // res.send(error)
                    }
                    //  res.send("DELETED");
                } catch (error) {
                    console.log(error);
                    // res.send(error);
                }
///echnage_history_delet//

//         try {
//             const deletexchangehistory = "DELETE FROM pms_user_exchange_trade_history where api_key =?"
//         let deleteresultexchangehistory =await execquery(deletexchangehistory,[api_key])
//     var wallets_list = deleteresultexchangehistory;
//     console.log("delete from pms_user_exchange_trade_history",wallets_list);
// } catch (error) {
//     console.log(error);
// }
            console.log(result)
            } catch (error) {
                console.log(error);
            }
        connection.release();
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports =delete_exchange
    