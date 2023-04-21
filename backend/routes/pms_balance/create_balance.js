const axios = require('axios');
var util = require('util')
const v4 = require('uuid');
const { uuid } = require('uuidv4');

require('dotenv').config()
const db = require('../../pool-connection')

const pms_balance = async (id, res) => {
    var id1 = v4()
    console.log("id willl be", id)
    // let address_id = newaddress_id ? newaddress_id : null;
    try {
        db.getConnection(async (err, connection) => {
            if (err) throw err
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlSearch1 = "SELECT * FROM pms_entity WHERE  id=?"
                let searchresult1 = await execquery(sqlSearch1, [id])
                console.log("id will be", id)
                let pms_entity = searchresult1[0].id;
                const sqlSearch_ledgre = "SELECT * FROM ledgre_entity WHERE  e_id=?"
                let searchresult_ledgre = await execquery(sqlSearch_ledgre, [id])
                console.log("serrtrtt", searchresult_ledgre.length)
                try{
                    const sqlSearch_ledgre_balance = "SELECT * FROM pms_balance"
                    var searchresult_ledgre_balance = await execquery(sqlSearch_ledgre_balance)
                    console.log("serrtrtt", searchresult_ledgre_balance[0].status)
                }
                catch (error) {
                    console.log(error);
                }
                if (searchresult_ledgre.length>=1){
                for (let j=0;j< searchresult_ledgre.length;j++){
                    
                let pms_ledgre = searchresult_ledgre[j].e_id
                if ((pms_entity == pms_ledgre)) {
                    let st="Active"
                    for (let i = 0; i < searchresult_ledgre.length; i++) {
                        for(let m=0;m<searchresult_ledgre_balance.length;m++){
                            if (searchresult_ledgre[i].id == searchresult_ledgre_balance[m].id){
    
                                var  status_of_bala = searchresult_ledgre_balance[m].status
                                console.log(status_of_bala)
                            }
                        }
                        const sqlInsert1 = "REPLACE into pms_balance (id,creditor,debtor,date,amount,currency,type,game,game_details,venue,percentage,e_id,status,rate,pay_id) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                        var insertresult = await execquery(sqlInsert1, [searchresult_ledgre[i].id, searchresult_ledgre[i].creditor, searchresult_ledgre[i].debtor,searchresult_ledgre[i].date , searchresult_ledgre[i].amount, searchresult_ledgre[i].currency, searchresult_ledgre[i].type, searchresult_ledgre[i].game, searchresult_ledgre[i].game_details, searchresult_ledgre[i].venue, searchresult_ledgre[i].percentage, searchresult_ledgre[i].e_id,st? status_of_bala : 'Active',searchresult_ledgre[i].rate,searchresult_ledgre[i].pay_id])
                        console.log(insertresult)
                        //   const sqlSelect2 = "Select * from accountancy Where  game_id=?"
                        //       let result2 =await execquery(sqlSelect2,[game_id])      
                    }
                    res.send(insertresult)
                }
                // else{
                //     res.send("No record found")  
                // }
            
            }
        }
        else{
            res.send("No Record Found")
        }
        }
            catch (error) {
                console.log(error);
            }
            connection.release()
        })
    } catch (error) {
        console.log(error);
    }
}



module.exports = pms_balance