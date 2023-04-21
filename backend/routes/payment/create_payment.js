const axios = require('axios');
var util = require('util')
const v4 = require('uuid');
const { uuid } = require('uuidv4');
require('dotenv').config()
const db = require('../../pool-connection')

const create_payment = async (user_id, payment_id, sender, reciever, amount, currency, exchange_rate, payment_type, result_usd, comment, res) => {

  var date = new Date().toUTCString()
  console.log("gfff", date);
  let status = "Active"
  // var payment_id = uuid();
  // console.log("pay",payment_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        let sql = "REPLACE INTO pms_payment(payment_id,sender,reciever,amount,currency,exchange_rate,payment_type,result_usd,date_updated,comment,status) VALUES (?,?,?,?,?,?,?,?,?,?,?);"
        let resultdata = await execquery(sql, [payment_id, sender, reciever, amount, currency, exchange_rate, payment_type, result_usd, new Date().toUTCString(), comment, status])
        console.log(resultdata);

        /////////////////entity
        const sqlSearch_ent = "SELECT * FROM pms_entity"
        let searchresult_ent = await execquery(sqlSearch_ent)
        /////////////balnce///////////////
        // for(let kl=0;kl< sqlSearch_ent.length;kl++){
        //   if((sqlSearch_ent[kl].name == sender) ||  (sqlSearch_ent[kl].name == reciever)){
        let re_am = Number(amount) / Number(exchange_rate)
        let pay_game = '';
            let pay_game_details = '';
            let pay_venue = '';
            let game_id = ''
            let share_holder =''
            let balnce_status = 'Active';
            let per = "";
            let ee_id =''
        const sqlInsert_balnce = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                 var insertresult_balnce = await execquery(sqlInsert_balnce, [payment_id + new Date().getTime(), sender, reciever,new Date().getTime(), re_am, currency, payment_type, pay_game, pay_game_details, pay_venue, per,ee_id,balnce_status,exchange_rate, payment_id])
                 console.log(insertresult_balnce)
      //   }
      // }

        // res.send(resultdata)
        try {
          const sqlSearch1 = "SELECT * FROM pms_payment WHERE payment_id =?"
          let searchresult1 = await execquery(sqlSearch1, [payment_id])
          console.log("payment", payment_id);
          console.log(searchresult1)
          const sqlSearch2 = "Select * from pms_users WHERE user_id =?"
          let searchresult2 = await execquery(sqlSearch2, [user_id])
          console.log(searchresult2)
          let transaction_data = searchresult1[0]
          console.log("tran", searchresult1);
          let userData = searchresult2[0]
          let updated_by = "";
          let deleted_by ="";
          const sqlInsert1 = "INSERT into payment_logs (payment_id,date_updated,sender,reciever,amount,currency,exchange_rate,payment_type,result_usd,user_id,username,usertype,timestamp,pay_id,comment,new_comment,updated_by,created_by,deleted_by) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
          let insertresult = await execquery(sqlInsert1, [payment_id + new Date().getTime(), transaction_data.date_updated, transaction_data.sender, transaction_data.reciever, transaction_data.amount, transaction_data.currency, transaction_data.exchange_rate, transaction_data.payment_type, transaction_data.result_usd, user_id, userData.username, userData.user_type, new Date().getTime(), payment_id, transaction_data.comment, comment,updated_by,userData.username,deleted_by])
          console.log(insertresult)
          const sqlSelect2 = "Select * from pms_payment Where payment_id =?"
          let result2 = await execquery(sqlSelect2, [payment_id])
          console.log(result2)
          res.send(result2)
        } catch (error) {
          console.log(error);
        }


        ////////////

        try {
          ////////////////////payment//////////////////////////////////

          //////////////////entity////////////////
          const sqlSearch_entity = "SELECT * FROM pms_entity"
          let searchresult1 = await execquery(sqlSearch_entity)
          /////////////////////////////////////////////////////
          console.log("entity of the pay",searchresult1)
          ////////////////////////////////////////////////////

          for (let i = 0; i < searchresult1.length; i++) {
            var ledgre_type1 = 'Payment'
            // let pay_sender = sqlSearch_entity[i].sender;
            // let pay_reciever = searchresult_pay[i].reciever;
            // console.log("pay_reciever", pay_reciever);

            // let result_usd = searchresult_pay[i].result_usd;
            let pay_game = '';
            let pay_game_details = '';
            let pay_venue = '';
            let game_id = ''
            let share_holder =''
            let balnce_status = 'Active';

            console.log("result uusd", result_usd)
            // console.log("result of exchange rate", searchresult_pay[i].exchange_rate)

            if ((searchresult1[i].name == reciever)) {
              let re = Number(amount) / Number(exchange_rate)
              console.log("if enter the block");
              let per = "";
              if (re > 0) {
                console.log("if of if");
                ///

                // const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                // let insertresult = await execquery(sqlinsert, [id + new Date().getTime(),pay_reciever,searchresult_pay[i].sender, new Date().getTime(), re, searchresult_pay[i].currency, searchresult_pay[i].payment_type, pay_game, pay_game_details, pay_venue, per, id, ledgre_type1,searchresult_pay[i].exchange_rate,searchresult_pay[i].payment_id,game_id,share_holder])
                // console.log(insertresult)
                ////////////////
                const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                let insertresult = await execquery(sqlinsert, [payment_id + new Date().getTime(),reciever, sender,new Date().getTime(), re, currency, payment_type, pay_game, pay_game_details, pay_venue, per, searchresult1[i].id, ledgre_type1, exchange_rate, payment_id,game_id,share_holder])
                console.log(insertresult)

                //  /////////////////////balnce ///////////////////////
                //  const sqlInsert_balnce = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                //  var insertresult_balnce = await execquery(sqlInsert_balnce, [payment_id + new Date().getTime(), reciever, sender,new Date().getTime(), re, currency, payment_type, pay_game, pay_game_details, pay_venue, per,searchresult1[i].id,balnce_status,exchange_rate, payment_id])
                //  console.log(insertresult_balnce)
 
                //  ///////////////////////////////////////


              }
              else if (re < 0) {
                console.log("else of if");
                console.log("else -ve");
                const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                let insertresult_group = await execquery(sqlinsert_for_group, [payment_id + new Date().getTime(), sender,reciever, new Date().getTime(), re, currency, payment_type, pay_game, pay_game_details, pay_venue, per, searchresult1[i].id, ledgre_type1, exchange_rate, payment_id,game_id,share_holder])
                console.log(insertresult_group)

                /////////////////////balnce///////
                // /////////////////////balnce ///////////////////////
                // const sqlInsert_balnce_for_group = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                // var insertresult_balnce_for_group = await execquery(sqlInsert_balnce_for_group, [payment_id + new Date().getTime(), sender,reciever, new Date().getTime(), re, currency, payment_type,pay_game, pay_game_details, pay_venue, per,searchresult1[i].id,balnce_status,exchange_rate, payment_id])
                // console.log(insertresult_balnce_for_group)

                ///////////////////////////////////////

                ///////////////////////////


              }
              // res.send(insertresult)
            }
            else if ((searchresult1[i].name == sender)) {
              let re = Number(amount) / Number(exchange_rate)
              // let re = (searchresult_pay[i].result_usd) / (searchresult_pay[i].exchange_rate)
              console.log("if enter elese block");
              let per = "";
              if (re > 0) {
                console.log("if of if");
                const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                let insertresult = await execquery(sqlinsert, [payment_id + new Date().getTime() + 1, sender, reciever, new Date().getTime(), re, currency, payment_type, pay_game, pay_game_details, pay_venue, per, searchresult1[i].id, ledgre_type1, exchange_rate, payment_id,game_id,share_holder])
                console.log(insertresult)


                //  /////////////////////balnce ///////////////////////
                //  const sqlInsert_balnce_for_cre = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                //  var insertresult_balnce_for_cre = await execquery(sqlInsert_balnce_for_cre, [id + new Date().getTime() + 1, sender, reciever, new Date().getTime(), re, currency, payment_type,pay_game, pay_game_details, pay_venue, per,searchresult1[i].id,balnce_status,exchange_rate, payment_id])
                //  console.log(insertresult_balnce_for_cre)
 
                 ///////////////////////////////////////
              }
              else if (re < 0) {
                console.log("else of if");
                console.log("else -ve");
                const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                let insertresult_group = await execquery(sqlinsert_for_group, [payment_id + new Date().getTime() + 2, reciever,sender, new Date().getTime(), re, currency, payment_type, pay_game, pay_game_details, pay_venue, per, searchresult1[i].id, ledgre_type1, exchange_rate, payment_id,game_id,share_holder])
                console.log(insertresult_group)

                // /////////////////////balnce ///////////////////////
                // const sqlInsert_balnce_for_cre = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                // var insertresult_balnce_for_cre = await execquery(sqlInsert_balnce_for_cre, [id + new Date().getTime() + 2, reciever,sender, new Date().getTime(), re, currency, payment_type,pay_game, pay_game_details, pay_venue, per,searchresult1[i].id,balnce_status,exchange_rate, payment_id])
                // console.log(insertresult_balnce_for_cre)

                ///////////////////////////////////////

              }
              // res.send(insertresult)
            }

          }
          // res.send(resultdata);

        } catch (error) {
          console.log(error);
          res.send(error)
        }


        ///////////////
        } catch (error) {
      console.log(error);
      res.send(error)
    }
    connection.release();
  })
} catch (error) {
  console.log(error);
  res.send(error);

}
  
  }

module.exports = create_payment;