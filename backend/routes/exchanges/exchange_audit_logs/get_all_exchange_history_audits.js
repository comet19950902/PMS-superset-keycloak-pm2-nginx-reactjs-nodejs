require('dotenv').config()
var util = require('util')
const db = require('../../../pool-connection');    



const get_exchange_history_logs = async(offset,res) => {
    let newoffset = offset ? offset: 0;
        try{
            await db.getConnection( async (err, connection) => {
                if(err) throw err;
                const execquery = util.promisify(connection.query.bind(connection))
                try {
                    let sqlSearch1 = "SELECT * FROM pms_exchange_history_audit_logs ORDER BY timestamp DESC LIMIT 500 OffSET" +" "+newoffset;
                    let exchangeApiRes =await execquery(sqlSearch1)
                        console.log("exchangeApiRes",exchangeApiRes);
                        res.send(exchangeApiRes)
                } catch (error) {
                    console.log(error);
                    res.send(error)
                }
                connection.release();
            })
    }
    catch(error){
        console.log(error);
        res.send(error)
    }
}


module.exports = get_exchange_history_logs
// add_exchange_history()