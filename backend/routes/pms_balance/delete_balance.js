
const db = require('../../pool-connection');
var util = require('util')

const delete_pms_balance = async (id,res) => {
  console.log("___________________");
  try {
    await db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const execquery = util.promisify(connection.query.bind(connection));
        try {
            const sqlbalance = "SELECT * FROM pms_balance where id=?"
            let balance = await execquery(sqlbalance, [id]);
            console.log(balance);
            const sqlbalance_payment = "SELECT * FROM pms_payment ORDER BY payment_id DESC "
            let balance_pay = await execquery(sqlbalance_payment);
            // console.log(balance_pay);
            
            let pay_id = Number(balance_pay[0].payment_id)
            console.log("payyyy",pay_id)
            try {
                let sql = "REPLACE INTO pms_payment(payment_id,sender,reciever,amount,currency,exchange_rate,payment_type,result_usd,date_updated,comment) VALUES (?,?,?,?,?,?,?,?,?,?);"
                let exchange_rate = '';
                let payment_type = '';
                let comment = '--';
                let amount1 =''
          let resultdata = await execquery(sql, [pay_id+1,balance[0].creditor,balance[0].debtor,balance[0].amount,balance[0].currency,balance[0].rate,payment_type,balance[0].amount/balance[0].rate,new Date().toUTCString(),comment])
          console.log(pay_id+1,balance[0].creditor,balance[0].debtor,balance[0].amount,balance[0].currency,balance[0].rate,payment_type,balance[0].amount/balance[0].rate,new Date().toUTCString(),comment);
                // res.send(delete_result)
            } catch (error) {
                console.log(error);
                res.send(error);
            }
            try{
            let status = "Inactive"
            const sqlDelete = "Update pms_balance SET amount=?,date=?,status=? where id=?"
            let amount =0
            let delete_result = await execquery(sqlDelete, [amount,new Date().toUTCString(),status,id]);
            console.log(delete_result);
            res.send(delete_result)
            }
            catch (error) {
                console.log(error);
                res.send(error);
            }

        } catch (error) {
            console.log(error);
            res.send(error);
        }

        /////////////////////////////////////delete ledgre///////////////////////////////
        ////////////////////////////////////////////////////////////////////////////
        connection.release();
    })
} catch (error) {
    console.log(error);
    res.send(error);
}
}

module.exports = delete_pms_balance;