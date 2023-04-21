require('dotenv').config()
const axios = require('axios');
const e = require('express');
// const mysql = require('mysql');

const { v4: uuidv4 } = require('uuid');
var util = require('util')
const db = require('../../../pool-connection');

const get_simple_protocol = async (portfolio_id,party_detail,user_id,res) => {
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw err ;
            const execquery = util.promisify(connection.query.bind(connection))
            try{
               let resultupdated =[];
               console.log(party_detail);
                for(i of party_detail){
                    let party_id = i.party_id ?i.party_id : null ;
                    if (party_id!=null || party_id != undefined) {
                        console.log(party_id);
                        let ownership_percentage = i.ownership_percentage;
                        console.log(ownership_percentage);
                        try {
                            let sql = "REPLACE INTO pms_party_portfolio(party_portfolio_id, portfolio_id, party_id ,updated_date, updated_by, ownership_percentage) VALUES (?,?,?,?,?,?);"
                            let resultdata = await  execquery(sql, [portfolio_id + party_id , portfolio_id , party_id , new Date().toUTCString(), user_id, ownership_percentage])
                                console.log(resultdata);
                                    console.log("DONE");
                                    let newresult ={};
                                    newresult = resultdata.affectedRows;
                                    console.log("resultdata.affectedRows",resultdata.affectedRows);
                                    console.log("newresult",newresult);
                                    resultupdated.push(newresult);
                                    newresult ={};
                        } catch (error) {
                            console.log(error);
                        }   
                    }
                }
                res.send(resultupdated)
            }
            catch(error){
                console.log(error);
            }
            connection.release();
        });
    } catch (error) {
        console.log(error);
    }

}

 module.exports = get_simple_protocol