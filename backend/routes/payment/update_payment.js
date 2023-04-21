const db = require('../../pool-connection')
var util = require('util')

const update_payment = async (user_id,payment_id,sender,reciever,amount,currency,exchange_rate,payment_type,result_usd,comment,res) => {
  console.log(payment_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        const sqlSelect = "Update pms_payment SET sender=? ,reciever=?,amount=?,currency=?,exchange_rate=?,payment_type=?,result_usd=?,date_updated=?,comment=? WHERE payment_id =?"
        let result =await execquery(sqlSelect,[sender,reciever,amount,currency,exchange_rate,payment_type,result_usd, new Date().toUTCString(),comment,payment_id])       
        console.log("connection address");


        /////////ledgre/////////////////////
        const sqlSelect_ledgre = "Update ledgre_entity SET creditor=?,debtor=?,amount=?,currency=?,rate=?,type=?,date=? WHERE pay_id =?"
        let result_ledgre =await execquery(sqlSelect_ledgre,[sender,reciever,Number(amount)/Number(exchange_rate),currency,exchange_rate,payment_type, new Date().getTime(),payment_id])       
        console.log("connection address ledgre",result_ledgre);


        /////// balnce///////////


        const sqlSelect_balnce = "Update pms_balance SET creditor=?,debtor=?,amount=?,currency=?,rate=?,type=?,date=? WHERE pay_id =?"
        let result_balnce =await execquery(sqlSelect_balnce,[sender,reciever,Number(amount)/Number(exchange_rate),currency,exchange_rate,payment_type, new Date().getTime(),payment_id])       
        console.log("connection address ledgre",result_balnce);
        // let sql = "Select * FROM pms_payment WHERE payment_id =?";
        // let resultdata = await execquery(sql,[payment_id]);
        //   console.log(resultdata);
          // res.send(resultdata);
          try {
            const sqlSearch1 = "SELECT * FROM pms_payment WHERE payment_id =?"
            let searchresult1 =await execquery(sqlSearch1,[payment_id]) 
            console.log("payment",payment_id);     
                console.log(searchresult1)
                const sqlSearch2 = "Select * from pms_users WHERE user_id =?"
                let searchresult2 =await execquery(sqlSearch2,[user_id])      
                console.log(searchresult2)
                    let transaction_data = searchresult1[0]
                    console.log("tran",searchresult1);
                    let userData = searchresult2[0]
                    let created_by ="";
                    let deleted_by ="";
                    const sqlInsert1 = "INSERT into payment_logs (payment_id,date_updated,sender,reciever,amount,currency,exchange_rate,payment_type,result_usd,user_id,username,usertype,timestamp,pay_id,comment,new_comment,updated_by,created_by,deleted_by) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult =await execquery(sqlInsert1,[payment_id+new Date().getTime(),transaction_data.date_updated, transaction_data.sender, transaction_data.reciever,transaction_data.amount, transaction_data.currency, transaction_data.exchange_rate, transaction_data.payment_type, transaction_data.result_usd,user_id,userData.username, userData.user_type, new Date().getTime(),payment_id,transaction_data.comment,comment,userData.username,created_by,deleted_by])       
                        console.log(insertresult)
                        const sqlSelect2 = "Select * from pms_payment Where payment_id =?"
                            let result2 =await execquery(sqlSelect2,[payment_id])      
                                console.log(result2)
                                res.send(result2)
        } catch (error) {
            console.log(error);
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

module.exports = update_payment;