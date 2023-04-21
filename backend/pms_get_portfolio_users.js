require('dotenv').config()
var transaction_history = require('./routes/pms_address/pms_address_transaction/debank_wallet_user_history_list')
const axios = require('axios');


var access_key = process.env.DEBANK_ACCESS_KEY;

const db = require('./pool-connection');
const execquery = util.promisify(db.query.bind(db))

const get_partyId_of_portfolio = async () => {
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw err ;
            try {                           //SELECT ALL ADRESS ONE BY ONE INSIDE ADDREESS TABLE
                const sqlSelect = "SELECT * FROM pms_portfolio";
                    let portfolios =await execquery (sqlSelect)
                    var portfolio_list = portfolios;        //All address data is stored inside address_list 
                    // console.log(portfolio_list);
                        for(let portfolio of portfolio_list){
                            let portfolioId = portfolio.portfolio_id;
                            // console.log(portfolioId);
                            const sqlSelect2 = "SELECT * FROM pms_party_portfolio WHERE portfolio_id= ?";
                           let partyportfolios = await execquery(sqlSelect2,[portfolioId])
                            let partyportfoliosdata =partyportfolios;
                                // console.log(partyportfoliosdata);
                                var newresult =[];
                                newresult.portfoliodataLists = {};
                                portfoliodataLists.portfolio_id = portfolioId;
                                partyportfoliosdata.partiesdata =[];
                                for(let parties of partyportfoliosdata){
                                    let partyId = parties.party_id ? parties.party_id : null;
                                    let newportfolioId = parties.portfolio_id ? parties.portfolio_id : null;
                                    if (partyId!=null || partyId!=undefined) {
                                        console.log('parties',partyId);
                                        const sqlSelect3 = "SELECT * FROM pms_person_list WHERE party_id= ?";
                                        let personlist = await connection.query (sqlSelect3,[partyId])
                                            console.log("personlist",personlist);
                                            await portfoliodataLists.push(personlist[0])
                                            console.log("pers",portfoliodataLists);
                                            const sqlSelect4 = "SELECT * FROM pms_organisations_list WHERE party_id= ?";
                                            let orglist = await connection.query (sqlSelect4,[partyId])
                                                var orglistdata = orglist;
                                                console.log("orglistdata",orglistdata[0]);
                                                await portfoliodataLists.push(orglistdata)
                                                console.log("org",portfoliodataLists);
                                    }
                                    
                                }
                                console.log("allparties",newresult);
                        }
            } 
            catch (error) {
                console.log("NO DATA RETURNS INSIDE",error);
            }
            connection.release()
        })
    } catch (error) {
        console.log(error);
    }
   
}
    
    get_partyId_of_portfolio()
    //  module.exports = get_change_Wallet_asset_protocol



   