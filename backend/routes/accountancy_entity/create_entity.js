const axios = require('axios');
var util = require('util')
const v4 = require('uuid');
const { uuid } = require('uuidv4');

require('dotenv').config()
const db = require('../../pool-connection')

const create_entity = async (name, type, res) => {
  // console.log('*******',address_id);
  var date = new Date().toUTCString()
  console.log("gfff", date);
  var id = uuid();
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        ///////////////////
        let sql_name = "SELECT * FROM pms_entity where name=?"
        let resultdata_name = await execquery(sql_name, [name]);
        console.log(resultdata_name);
        if (resultdata_name.length >= 1) {
          try {
            res.send("Entity Name Already Exist")
          }
          catch (error) {
            console.log(error);
            res.send(error)
          }
        }
        else {
          try {
            //////////////////////
            let sql = "REPLACE INTO pms_entity(id,name,type,date_updated) VALUES (?,?,?,?);"
            let resultdata = await execquery(sql, [id, name, type, new Date().toUTCString()])
            console.log(resultdata);
            try {
              const sqlSearch1 = "SELECT * FROM accountancy"
              let searchresult1 = await execquery(sqlSearch1)

              for (let i = 0; i < searchresult1.length; i++) {
                let payment_id = null;
                var ledgre_type = 'Accountancy'
                let game_details_data_host = searchresult1[i].host;
                let game_details_data_group = searchresult1[i].group_;
                console.log("GROUP NAME", game_details_data_group);
                let game_details_data_share = searchresult1[i].shareholders
                console.log("share of one ", game_details_data_share);
                let game_result = searchresult1[i].result;
                let acc_bal_status = 'Active'
                let acc_bal_pay_id = '';
                // let share = searchresult1[i].shareholders.split(',');
                let re = (searchresult1[i].result) / (searchresult1[i].exchange_rate)
                if ((name == game_details_data_host)) {
                  console.log("if");
                  let per = "";
                  if (re > 0) {
                    console.log("if of if");
                    const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult = await execquery(sqlinsert, [id + new Date().getTime(), searchresult1[i].group_, game_details_data_host, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, per, id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                    console.log(insertresult)

                    /////////////////////balance acct///////////
                    const sqlInsert_bal_acc = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    var insertresult_bal_acc = await execquery(sqlInsert_bal_acc, [id + new Date().getTime(), searchresult1[i].group_, game_details_data_host, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, per, id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                    console.log(insertresult_bal_acc)
                    ///////////////////////////////////////////////////
                  }
                  else if (re < 0) {
                    console.log("else of if");
                    console.log("else -ve");
                    const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime(), searchresult1[i].host, searchresult1[i].group_, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, per, id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                    console.log(insertresult_group)


                    /////////////////////balance acct///////////
                    const sqlInsert_bal_gro = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    var insertresult_bal_grp = await execquery(sqlInsert_bal_gro, [id + new Date().getTime(), searchresult1[i].host, searchresult1[i].group_, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, per, id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                    console.log(insertresult_bal_grp)
                    ///////////////////////////////////////////////////
                  }
                  // res.send(insertresult)
                }
                else if ((name == game_details_data_group)) {
                  console.log("if");
                  let per = "";
                  if (re > 0) {
                    console.log("if of if");
                    const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult = await execquery(sqlinsert, [id + new Date().getTime() + 1, searchresult1[i].group_, game_details_data_host, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, per, id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                    console.log(insertresult)

                    /////////////////////balance acct///////////
                    const sqlInsert_bal_gr = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    var insertresult_bal_gr = await execquery(sqlInsert_bal_gr, [id + new Date().getTime() + 1, searchresult1[i].group_, game_details_data_host, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, per, id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                    console.log(insertresult_bal_gr)
                    ///////////////////////////////////////////////////
                  }
                  else if (re < 0) {
                    console.log("else of if");
                    console.log("else -ve");
                    const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime() + 2, searchresult1[i].host, searchresult1[i].group_, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, per, id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                    console.log(insertresult_group)

                    /////////////////////balance acct///////////
                    const sqlInsert_bal_grr = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    var insertresult_bal_grr = await execquery(sqlInsert_bal_grr, [id + new Date().getTime() + 2, searchresult1[i].host, searchresult1[i].group_, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, per, id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                    console.log(insertresult_bal_grr)
                    ///////////////////////////////////////////////////
                  }
                  // res.send(insertresult)

                  if (name == game_details_data_group) {
                    console.log("enter for  group");
                    if (re < 0) {
                      let shar = searchresult1[i].shareholders.split(',')
                      console.log("share after group", shar);
                      if (shar.length == 1) {
                        const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_d,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                        let insertresult = await execquery(sqlinsert, [id + new Date().getTime(), searchresult1[i].group_, shar[0], new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[0], id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                        console.log(insertresult)

                        /////////////////////balance acct///////////
                        const sqlInsert_bal_grr = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                        var insertresult_bal_grr = await execquery(sqlInsert_bal_grr, [id + new Date().getTime(), searchresult1[i].group_, shar[0], new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[0], id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                        console.log(insertresult_bal_grr)
                        ///////////////////////////////////////////////////

                      }
                      else if (shar.length > 1) {
                        console.log("len", shar.length);
                        for (let k = 0; k < shar.length; k++) {
                          console.log("len", shar.length);
                          const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                          let insertresult = await execquery(sqlinsert, [id + new Date().getTime() + k, searchresult1[i].group_, shar[k], new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[k], id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                          console.log(insertresult)


                          /////////////////////balance acct///////////
                          const sqlInsert_bal_grrw = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                          var insertresult_bal_grrw = await execquery(sqlInsert_bal_grrw, [id + new Date().getTime() + k, searchresult1[i].group_, shar[k], new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[k], id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                          console.log(insertresult_bal_grrw)
                          ///////////////////////////////////////////////////
                        }
                      }
                    }
                    else if (re > 0) {
                      let shar1 = searchresult1[i].shareholders.split(',')
                      if (shar1.length == 1) {
                        const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                        let insertresult = await execquery(sqlinsert, [id + new Date().getTime(), shar1[0], searchresult1[i].group_, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[0], id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                        console.log(insertresult)

                        /////////////////////balance acct///////////
                        const sqlInsert_bal_grre = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                        var insertresult_bal_grre = await execquery(sqlInsert_bal_grre, [id + new Date().getTime(), shar1[0], searchresult1[i].group_, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[0], id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                        console.log(insertresult_bal_grre)
                        ///////////////////////////////////////////////////

                      }
                      else if (shar1.length > 1) {
                        console.log("len", shar1.length);

                        for (let l = 0; l < shar1.length; l++) {
                          console.log("len", shar1.length);

                          const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                          let insertresult = await execquery(sqlinsert, [id + new Date().getTime() + l, shar1[l], searchresult1[i].group_, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[l], id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                          console.log(insertresult)


                          /////////////////////balance acct///////////
                          const sqlInsert_bal_grrr = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                          var insertresult_bal_grrr = await execquery(sqlInsert_bal_grrr, [id + new Date().getTime() + l, shar1[l], searchresult1[i].group_, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[l], id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                          console.log(insertresult_bal_grrr)
                          ///////////////////////////////////////////////////
                        }
                      }
                    }

                  }
                }
                else if (searchresult1[i].shareholders.split(',').includes(name)) {
                  if (re < 0) {
                    let index = searchresult1[i].shareholders.split(',').indexOf(name)
                    console.log("index", index);
                    console.log("else  shar", name);
                    const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime() + 1, game_details_data_group, name, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[index], id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                    console.log(insertresult_group)

                    ////////////////////balance acct///////////
                    const sqlInsert_bal_grrrt = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    var insertresult_bal_grrrt = await execquery(sqlInsert_bal_grrrt, [id + new Date().getTime() + 1, game_details_data_group, name, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[index], id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                    console.log(insertresult_bal_grrrt)
                    ///////////////////////////////////////////////////
                  }
                  else {
                    let index1 = searchresult1[i].shareholders.split(',').indexOf(name)
                    console.log("index", index1);
                    console.log("else  shar", name);
                    const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime() + 2, name, game_details_data_group, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[index1], id, ledgre_type, searchresult1[i].exchange_rate, payment_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                    console.log(insertresult_group)

                    ////////////////////balance acct///////////
                    const sqlInsert_bal_grrrtt = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    var insertresult_bal_grrrtt = await execquery(sqlInsert_bal_grrrtt, [id + new Date().getTime() + 2, name, game_details_data_group, new Date().getTime(), re, searchresult1[i].currency, searchresult1[i].type, searchresult1[i].game, searchresult1[i].game_details, searchresult1[i].venue, searchresult1[i].shareholders_percentage.split(',')[index1], id, acc_bal_status, searchresult1[i].exchange_rate, acc_bal_pay_id])
                    console.log(insertresult_bal_grrrtt)
                    ///////////////////////////////////////////////////
                  }
                }


              }
              // res.send(resultdata);

            } catch (error) {
              console.log(error);
              res.send(error)
            }

            //////////////////////////////////////////pay_ledgre////////////////////////
            try {
              ////////////////////payment//////////////////////////////////

              const sqlSearch_pay = "SELECT * FROM pms_payment"
              let searchresult_pay = await execquery(sqlSearch_pay)
              console.log("payments satrat")

              ////////////////////////////////////////////////////

              for (let i = 0; i < searchresult_pay.length; i++) {
                var ledgre_type1 = 'Payment'
                let share_holder = ''
                let pay_sender = searchresult_pay[i].sender;
                let pay_reciever = searchresult_pay[i].reciever;
                console.log("pay_reciever", pay_reciever);

                let result_usd = searchresult_pay[i].result_usd;
                let pay_game = '';
                let pay_game_details = '';
                let balnce_game = '';
                let pay_venue = '';
                let game_id = ''
                let balnce_status = 'Active';
                console.log("result uusd", result_usd)
                console.log("result of exchange rate", searchresult_pay[i].exchange_rate)

                if ((name == pay_reciever)) {
                  let re = (searchresult_pay[i].amount) / (searchresult_pay[i].exchange_rate)
                  console.log("if enter the block");
                  let per = "";
                  if (re > 0) {
                    console.log("if of if");
                    const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult = await execquery(sqlinsert, [id + new Date().getTime(), pay_reciever, searchresult_pay[i].sender, new Date().getTime(), re, searchresult_pay[i].currency, searchresult_pay[i].payment_type, pay_game, pay_game_details, pay_venue, per, id, ledgre_type1, searchresult_pay[i].exchange_rate, searchresult_pay[i].payment_id, game_id, share_holder])
                    console.log(insertresult)

                    // /////////////////////balnce ///////////////////////
                    // const sqlInsert_balnce = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                    // var insertresult_balnce = await execquery(sqlInsert_balnce, [id + new Date().getTime(), pay_reciever,searchresult_pay[i].sender,new Date().getTime(),re, searchresult_pay[i].currency, searchresult_pay[i].payment_type,balnce_game,pay_game_details,pay_venue, per,id,balnce_status,searchresult_pay[i].exchange_rate,searchresult_pay[i].payment_id])
                    // console.log(insertresult_balnce)

                    ///////////////////////////////////////
                  }
                  else if (re < 0) {
                    console.log("else of if");
                    console.log("else -ve");
                    const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime(), searchresult_pay[i].sender, pay_reciever, new Date().getTime(), re, searchresult_pay[i].currency, searchresult_pay[i].payment_type, pay_game, pay_game_details, pay_venue, per, id, ledgre_type1, searchresult_pay[i].exchange_rate, searchresult_pay[i].payment_id, game_id, share_holder])
                    console.log(insertresult_group)

                    // /////////////////////balnce ///////////////////////
                    // const sqlInsert_balnce_for_group = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                    // var insertresult_balnce_for_group = await execquery(sqlInsert_balnce_for_group, [id + new Date().getTime(), searchresult_pay[i].sender,pay_reciever,new Date().getTime(),re, searchresult_pay[i].currency,searchresult_pay[i].payment_type,balnce_game,pay_game_details,pay_venue, per,id,balnce_status,searchresult_pay[i].exchange_rate,searchresult_pay[i].payment_id])
                    // console.log(insertresult_balnce_for_group)

                    ///////////////////////////////////////
                  }
                  // res.send(insertresult)
                }
                else if ((name == pay_sender)) {
                  let re = (searchresult_pay[i].amount) / (searchresult_pay[i].exchange_rate)
                  // let re = (searchresult_pay[i].result_usd) / (searchresult_pay[i].exchange_rate)
                  console.log("if enter elese block");
                  let per = "";
                  if (re > 0) {
                    console.log("if of if");
                    const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult = await execquery(sqlinsert, [id + new Date().getTime() + 1, searchresult_pay[i].sender, pay_reciever, new Date().getTime(), re, searchresult_pay[i].currency, searchresult_pay[i].payment_type, pay_game, pay_game_details, pay_venue, per, id, ledgre_type1, searchresult_pay[i].exchange_rate, searchresult_pay[i].payment_id, game_id, share_holder])
                    console.log(insertresult)

                    //  /////////////////////balnce ///////////////////////
                    //  const sqlInsert_balnce_for_cre = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                    //  var insertresult_balnce_for_cre = await execquery(sqlInsert_balnce_for_cre, [id + new Date().getTime() + 1, searchresult_pay[i].sender, pay_reciever,new Date().getTime(),re, searchresult_pay[i].currency,searchresult_pay[i].payment_type,balnce_game,pay_game_details,pay_venue, per,id,balnce_status,searchresult_pay[i].exchange_rate,searchresult_pay[i].payment_id])
                    //  console.log(insertresult_balnce_for_cre)

                    ///////////////////////////////////////

                  }
                  else if (re < 0) {
                    console.log("else of if");
                    console.log("else -ve");
                    const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime() + 2, pay_reciever, searchresult_pay[i].sender, new Date().getTime(), re, searchresult_pay[i].currency, searchresult_pay[i].payment_type, pay_game, pay_game_details, pay_venue, per, id, ledgre_type1, searchresult_pay[i].exchange_rate, searchresult_pay[i].payment_id, game_id, share_holder])
                    console.log(insertresult_group)

                    /////////////////////balnce ///////////////////////
                    // const sqlInsert_balnce_for_cre = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                    // var insertresult_balnce_for_cre = await execquery(sqlInsert_balnce_for_cre, [id + new Date().getTime() + 2, pay_reciever,searchresult_pay[i].sender,new Date().getTime(),re, searchresult_pay[i].currency,searchresult_pay[i].payment_type,balnce_game,pay_game_details,pay_venue, per,id,balnce_status,searchresult_pay[i].exchange_rate,searchresult_pay[i].payment_id])
                    // console.log(insertresult_balnce_for_cre)

                    ///////////////////////////////////////
                  }
                  // res.send(insertresult)
                }

                ////////////////////name same for both the case////////////
                // for (let kl = 0; kl < searchresult_payment.length; kl++) {
                //     else if ((name == pay_sender) || (name == pay_reciever)) {
                //     for (lm = 1; lm < searchresult_pay.length; lm++) {
                //     console.log("else block lm nnn")
                //     if ((pay_reciever == searchresult_pay[lm].sender) && (pay_sender == searchresult_pay[lm].reciever)) {

                //       /////////////////////balnce ///////////////////////
                //       const sqlInsert_balnce_for_cre = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                //       var insertresult_balnce_for_cre = await execquery(sqlInsert_balnce_for_cre, [id + new Date().getTime() + 2, searchresult_pay[i].reciever, searchresult_pay[i].sender,new Date().getTime(),re, searchresult_pay[i].currency,searchresult_pay[i].payment_type,balnce_game,pay_game_details,pay_venue, per,balnce_status,searchresult_pay[i].exchange_rate,searchresult_pay[i].payment_id])
                //       console.log(insertresult_balnce_for_cre)

                //       ///////////////////////////////////////
                //     }
                //   }
                // }
              }
              // res.send(resultdata);

            } catch (error) {
              console.log(error);
              res.send(error)
            }
            res.send(resultdata);
          }
          catch (error) {
            console.log(error)
            res.send(error)
          }
        }
      }
      catch (error) {
        console.log(error)
        res.send(error)
      }

      /////////////////////////////////////////////////////////////////////////////////////
      connection.release();
    })
  } catch (error) {
    console.log(error);
    res.send(error);

  }

}

module.exports = create_entity;