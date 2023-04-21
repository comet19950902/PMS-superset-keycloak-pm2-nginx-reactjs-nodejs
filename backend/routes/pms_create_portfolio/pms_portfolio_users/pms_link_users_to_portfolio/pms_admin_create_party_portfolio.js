require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var util = require('util')
const { v4: uuidv4 } = require('uuid')
var uuiddno =uuidv4();
console.log(uuiddno);
const db= require('../../../../pool-connection'); 

const get_simple_protocol = async (party_id,portfolio_id,ownership_percentage,user_id,res) => {
            try {
                await db.getConnection( async (err, connection) => {
                    if (err) throw err ;
                    const execquery = util.promisify(connection.query.bind(connection))
                        try{
                            let sql = "INSERT INTO pms_party_portfolio(party_portfolio_id, portfolio_id, party_id ,updated_date, updated_by, ownership_percentage) VALUES (?,?,?,?,?,?);"
                            let resultdata = await execquery(sql, [portfolio_id + party_id , portfolio_id , party_id , new Date().toUTCString(), user_id, ownership_percentage])
                                console.log(resultdata);
                                res.send(resultdata);
                        } catch(error){
                            console.log("error");   
                        }  
                        connection.release()
                    })
            } catch (error) {
                console.log(error);
            }
    }                          

module.exports = get_simple_protocol



