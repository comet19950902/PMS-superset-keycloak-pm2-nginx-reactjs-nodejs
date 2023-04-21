const axios = require('axios');
var util = require('util')
require('dotenv').config()
const db = require('../../pool-connection')
const { uuid } = require('uuidv4');

const pms_accountancy = async (game_id, game, game_details, venue, type, host, group_, player, shareholders, shareholders_percentage, result, date, week, share_holder, currency, exchange_rate, comment, res) => {
  // console.log('*******',address_id);
  // res.send(result.data);
  var date1 = new Date().toUTCString()
  var id = uuid();
  console.log("gfff", date);
  let status = "A"
  try {

    db.getConnection(async (err, connection) => {
      if (err) throw (err)
      const execquery = util.promisify(connection.query.bind(connection))
      try {
        let resultupdated = [];
        console.log();
        //////////////////entity////////////////
        const sqlSearch_entity = "SELECT * FROM pms_entity"
        let searchresult1 = await execquery(sqlSearch_entity)
        /////////////////////////////////////////////////////
        // let resultupdated =[];
        //  console.log();
        for (i of share_holder) {
          let share_holder_id = i.share_holder_id ? i.share_holder_id : null;
          if (share_holder_id != null || share_holder_id != undefined) {
            // console.log(share_holder_id);
            // let share_holder_id = i.share_holder_id;
            // let owner_ship = i.owner_ship;
            var owner_ship1 = JSON.stringify(i.shareholders_percentage);
            // let  shareholders = i.shareholders;
            var shareholders1 = JSON.stringify(i.shareholders);
            var shareholders_percentage = owner_ship1.replace(/"/g, "");
            var shareholders = shareholders1.replace(/"/g, "");

            let sql = "REPLACE INTO accountancy(game_id,game,game_details,venue,type,host,group_,player,shareholders,result,date_updated,shareholders_percentage,date,status,week,share_holder_id,currency,exchange_rate,comment) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
            let resultdata = await execquery(sql, [game_id, game, game_details, venue, type, host, group_, player, shareholders, result, new Date().toUTCString(), shareholders_percentage, date, status, week, share_holder_id, currency, exchange_rate, comment])
            let newresult = {};
            newresult = resultdata.affectedRows;
            console.log("resultdata.affectedRows", resultdata.affectedRows);
            console.log("newresult", newresult);
            resultupdated.push(newresult);
            newresult = {};
            console.log(resultdata);

            // res.send(resultdata);
          }
        }
        //     //////////////////////////////////////////////ledgre/////////////////////////////////////

        ////////////id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id


        for (let i = 0; i < searchresult1.length; i++) {
          let pay_id = null;
          var ledgre_type = 'Accountancy'
          let paym_id = '';
          let bal_status = 'Active'
          let re = (result) / (exchange_rate)
          if (searchresult1[i].name == host) {
            console.log("if");
            let per = "";
            if (re > 0) {
              console.log("if of if");
              const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
              let insertresult = await execquery(sqlinsert, [id + new Date().getTime(), group_, host, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, per, searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
              console.log(insertresult)

              ////////////balnce//////////////

                 const sqlInsert_balnce = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

                 var insertresult_balnce = await execquery(sqlInsert_balnce, [id + new Date().getTime(), group_, host,new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, per,searchresult1[i].id,bal_status,exchange_rate, pay_id])
                 console.log(insertresult_balnce)
              ///////////////////////////////////////
            }
            else if (re < 0) {
              console.log("else of if");
              console.log("else -ve");
              const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
              let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime(), host, group_, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, per, searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
              console.log(insertresult_group)

               ////////////balnce//////////////

               const sqlInsert_balnceh = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

               var insertresult_balnceh = await execquery(sqlInsert_balnceh, [id + new Date().getTime(), host, group_,new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, per,searchresult1[i].id,bal_status,exchange_rate, pay_id])
               console.log(insertresult_balnceh)
            ///////////////////////////////////////
            }
            // res.send(insertresult)
          }
          else if ((searchresult1[i].name == group_)) {
            console.log("if");
            let per = "";
            if ((result) / (exchange_rate) > 0) {
              console.log("if of if");
              const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
              let insertresult = await execquery(sqlinsert, [id + new Date().getTime() + 1, group_, host, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, per, searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
              console.log(insertresult)


              ////////////balnce//////////////

              const sqlInsert_balnce_gr = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

              var insertresult_balnce_gr = await execquery(sqlInsert_balnce_gr, [id + new Date().getTime()+1, group_, host,new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, per,searchresult1[i].id,bal_status,exchange_rate, pay_id])
              console.log(insertresult_balnce_gr)
           ///////////////////////////////////////
            }
            else if ((result) / (exchange_rate) < 0) {
              console.log("else of if");
              console.log("else -ve");
              const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
              let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime() + 2, host, group_, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, per, searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
              console.log(insertresult_group)

               ////////////balnce//////////////

               const sqlInsert_balnce_grr = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

               var insertresult_balnce_grr = await execquery(sqlInsert_balnce_grr, [id + new Date().getTime() + 2, host, group_, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, per,searchresult1[i].id,bal_status,exchange_rate, pay_id])
               console.log(insertresult_balnce_grr)
            ///////////////////////////////////////
            }
            // res.send(insertresult)

            if (searchresult1[i].name == group_) {
              console.log("enter for  group");
              if ((result) / (exchange_rate) < 0) {
                let shar = shareholders.split(',')
                console.log("share after group", shar);
                if (shar.length == 1) {
                  const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                  let insertresult = await execquery(sqlinsert, [id + new Date().getTime(), group_, shar[0], new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, shareholders_percentage.split(',')[0], searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                  console.log(insertresult)

                   ////////////balnce//////////////

               const sqlInsert_balnce_grrh = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

               var insertresult_balnce_grrh = await execquery(sqlInsert_balnce_grrh, [id + new Date().getTime(), group_, shar[0], new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, shareholders_percentage.split(',')[0], searchresult1[i].id,bal_status,exchange_rate, pay_id])
               console.log(insertresult_balnce_grrh)
            ///////////////////////////////////////

                }
                else if (shar.length > 1) {
                  console.log("len", shar.length);
                  for (let k = 0; k < shar.length; k++) {
                    console.log("len", shar.length);
                    const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult = await execquery(sqlinsert, [id + new Date().getTime() + k, group_, shar[k], new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, shareholders_percentage.split(',')[k], searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                    console.log(insertresult)

                    ////////////balnce//////////////

               const sqlInsert_balnce_grrhw = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

               var insertresult_balnce_grrhw = await execquery(sqlInsert_balnce_grrhw, [id + new Date().getTime() + k, group_, shar[k], new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, shareholders_percentage.split(',')[k], searchresult1[i].id,bal_status,exchange_rate, pay_id])
               console.log(insertresult_balnce_grrhw)
            ///////////////////////////////////////
                  }
                }
              }
              else if ((result) / (exchange_rate) > 0) {
                let shar1 = shareholders.split(',')
                if (shar1.length == 1) {
                  const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                  let insertresult = await execquery(sqlinsert, [id + new Date().getTime(), shar1[0], group_, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, shareholders_percentage.split(',')[0], searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                  console.log(insertresult)

                  ////////////balnce//////////////

               const sqlInsert_balnce_grrhww = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

               var insertresult_balnce_grrhww = await execquery(sqlInsert_balnce_grrhww, [id + new Date().getTime(), shar1[0], group_, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, shareholders_percentage.split(',')[0], searchresult1[i].id,bal_status,exchange_rate, pay_id])
               console.log(insertresult_balnce_grrhww)
            ///////////////////////////////////////

                }
                else if (shar1.length > 1) {
                  console.log("len", shar1.length);

                  for (let l = 0; l < shar1.length; l++) {
                    console.log("len", shar1.length);

                    const sqlinsert = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    let insertresult = await execquery(sqlinsert, [id + new Date().getTime() + l, shar1[l], group_, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, shareholders_percentage.split(',')[l], searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
                    console.log(insertresult)

                    ////////////balnce//////////////

               const sqlInsert_balnce_grrhwwq = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

               var insertresult_balnce_grrhwwq = await execquery(sqlInsert_balnce_grrhwwq, [id + new Date().getTime() + l, shar1[l], group_, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, shareholders_percentage.split(',')[l], searchresult1[i].id,bal_status,exchange_rate, pay_id])
               console.log(insertresult_balnce_grrhwwq)
            ///////////////////////////////////////
                  }
                }
              }

            }
          }

          else if (shareholders.split(',').includes(searchresult1[i].name)) {
            if ((result) / (exchange_rate) < 0) {
              let index = shareholders.split(',').indexOf(searchresult1[i].name)
              console.log("index", index);
              console.log("else  shar", searchresult1.name);
              const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
              let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime() + 1, group_, searchresult1.name, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, searchresult1[i].shareholders_percentage.split(',')[index], searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
              console.log(insertresult_group)

               ////////////balnce//////////////

               const sqlInsert_balnce_grrp = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

               var insertresult_balnce_grrp = await execquery(sqlInsert_balnce_grrp, [id + new Date().getTime() + 1, group_, searchresult1.name, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, searchresult1[i].shareholders_percentage.split(',')[index], searchresult1[i].id,bal_status,exchange_rate, pay_id])
               console.log(insertresult_balnce_grrp)
            ///////////////////////////////////////
            }
            else {
              let index1 = shareholders.split(',').indexOf(searchresult1[i].name)
              console.log("index", index1);
              console.log("else  shar", searchresult1.name);
              const sqlinsert_for_group = "INSERT INTO ledgre_entity (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,ledgre_type,rate,pay_id,game_id,share_holder) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
              let insertresult_group = await execquery(sqlinsert_for_group, [id + new Date().getTime() + 2, searchresult1.name, group_, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, searchresult1[i].shareholders_percentage.split(',')[index1], searchresult1[i].id, ledgre_type, exchange_rate, pay_id, searchresult1[i].game_id, searchresult1[i].shareholders])
              console.log(insertresult_group)

               ////////////balnce//////////////

               const sqlInsert_balnce_grrp = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

               var insertresult_balnce_grrpp = await execquery(sqlInsert_balnce_grrp, [id + new Date().getTime() + 2, searchresult1.name, group_, new Date().getTime(), (result) / (exchange_rate), currency, type, game, game_details, venue, searchresult1[i].shareholders_percentage.split(',')[index1], searchresult1[i].id,bal_status,exchange_rate, pay_id])
               console.log(insertresult_balnce_grrpp)
            ///////////////////////////////////////
            }
          }
        }
        res.send(resultupdated)

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

module.exports = pms_accountancy;