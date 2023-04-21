var change_price = require('../../pms_address/pms_address_chainlist/debank_change_price')
var util = require('util')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');

var access_key = process.env.DEBANK_ACCESS_KEY;

const db = require('../../../pool-connection');

//   const getquerty = async function getquerty(res) {
    
//     const connection = mysql.createConnection(connectionConfig);
//     const execquery = util.promisify(connection.query.bind(connection))
//     const search_query = " Select * FROM pms_portfolio";
//     try {
//         let resultdata = await execquery(search_query);
//         var totalportfolio = [];
//         for (let i of resultdata){
//             var partydata =[];
//             netportdata =[];
//             let portfolio_detail ={};
//             portfolio_detail.portfolio_id =i.portfolio_id;
//             portfolio_detail.portfolio_name =i.portfolio_name;
//             portfolio_detail.updated_date = i.updated_date;
//             const search_query2 = "Select * FROM pms_party_portfolio WHERE portfolio_id =?";
//             partyportfoliores = await execquery(search_query2,[i.portfolio_id]);
//                 for(let element of partyportfoliores){
//                     let partyportfoliodata ={};
//                     partyportfoliodata.portfolio_name = i.portfolio_name;
//                     partyportfoliodata.portfolio_id = element.portfolio_id;
//                     partyportfoliodata.party_id = element.party_id;
//                     partyportfoliodata.ownership =element.ownership_percentage;
//                     try{
//                     const search_query3 = "Select * FROM pms_party_list WHERE party_id = ?";
//                     let partyres = await execquery(search_query3,[element.party_id]);
//                     partyportfoliodata.name = partyres[0].name? partyres[0].name: null;
//                     if(partyres[0].name != undefined){
//                         // console.log(partyportfoliodata);
//                         var newres;
//                         newres = partyportfoliodata;
//                         // console.log(newres);
//                         partydata.push(newres)
//                     }
//                     else if(partyportfoliodata.name == undefined){
//                         console.log("error");
//                         return;
//                     }
//                     }
//                     catch(error){
//                         console.log(error); 
//                     }
//                 }
//             portfolio_detail.partydata = partydata;
//             var newprtofoliodata = portfolio_detail;
//             totalportfolio.push(newprtofoliodata)
//         }
//         console.log(totalportfolio);
//         res.send(totalportfolio); 
//     } catch (error) {
//         console.log(error)
//     }
//    }

 const getquerty = async function getquerty(res) {
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            const search_query = " Select * FROM pms_portfolio";
            try {
                let resultdata = await execquery(search_query);
                var totalportfolio = [];
                for (let i of resultdata){
                    var partydata =[];
                    netportdata =[];
                    let portfolio_detail ={};
                    portfolio_detail.portfolio_id =i.portfolio_id;
                    portfolio_detail.portfolio_name =i.portfolio_name;
                    portfolio_detail.updated_date = i.updated_date;
                    const search_query2 = "Select * FROM pms_party_portfolio WHERE portfolio_id =?";
                    partyportfoliores = await execquery(search_query2,[i.portfolio_id]);
                        for(let element of partyportfoliores){
                            let partyportfoliodata ={};
                            partyportfoliodata.portfolio_name = i.portfolio_name;
                            partyportfoliodata.portfolio_id = element.portfolio_id;
                            partyportfoliodata.party_id = element.party_id;
                            partyportfoliodata.ownership =element.ownership_percentage;
                            try{
                            const search_query3 = "Select * FROM pms_party_list WHERE party_id = ?";
                            let partyres = await execquery(search_query3,[element.party_id]);
                            partyportfoliodata.name = partyres[0].name? partyres[0].name: null;
                                if(partyres[0].name != undefined){
                                    // console.log(partyportfoliodata);
                                    var newres;
                                    newres = partyportfoliodata;
                                    // console.log(newres);
                                    partydata.push(newres)
                                }
                                else if(partyportfoliodata.name == undefined){
                                        console.log("error");
                                        return;
                                }
                            }
                            catch(error){
                                console.log(error); 
                            }
                        }
                    portfolio_detail.partydata = partydata;
                    var newprtofoliodata = portfolio_detail;
                    totalportfolio.push(newprtofoliodata)
                }
                console.log(totalportfolio);
                res.send(totalportfolio); 
            } catch (error) {
                console.log(error)
            }
            connection.release();
        })
    } catch (error) {
        console.log(error);
    }
   }

 module.exports = getquerty



