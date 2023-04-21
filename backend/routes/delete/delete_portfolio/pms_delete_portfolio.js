require('dotenv').config()
const db = require('../../../pool-connection');

var util = require('util')


var delete_wallet = require('../delete_wallet/pms_delete_wallet')


const Portfoliousers = async(portfolio_id,res)=>{ 
    try{
        db.getConnection( async (err, connection) => {
            const execquery = util.promisify(connection.query.bind(connection))
            if (err) throw err 
            try{
                console.log(portfolio_id);
                const sqlSearch = "SELECT * FROM pms_portfolio where portfolio_id =?"
                let result1 = await execquery(sqlSearch,[portfolio_id])
                console.log("portfolio",result1);
                console.log("portfolio_id",portfolio_id);
                    try {
                        const sqlSelect2 = "SELECT * FROM pms_party_portfolio where portfolio_id =?"
                        let result2 = await execquery(sqlSelect2,[portfolio_id])
                        console.log("party_portfolio",result2);
                        console.log("portfolio_id",portfolio_id);
                        let portfolio_list = portfolio_id ? portfolio_id: null;
                        if(portfolio_list!=null){
                            try {
                                const sqlDelete3 = "DELETE FROM pms_party_portfolio where portfolio_id =?"
                                let partyresult = await execquery(sqlDelete3,[portfolio_id])       
                                console.log("Party Portfolio Result",partyresult);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    try {
                        const sqlSelect3 = "SELECT * FROM pms_user_wallet where portfolio_id =?"
                            let searchresult3 =await execquery(sqlSelect3,[portfolio_id])
                            var wallets_list = searchresult3;
                            console.log("wallets_list", wallets_list);
                            if(wallets_list && wallets_list.length!=0){
                                for(let currentwallet of wallets_list){
                                    let newwalletID = currentwallet.walletId ?currentwallet.walletId:null;
                                    try {
                                        await delete_wallet(newwalletID,res);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            }
                            else{
                                console.log("No Wallet");
                            }
                    } catch (error) {
                        console.log(error);
                    }
                    try {
                        const sqlinvest = "DELETE FROM pms_add_investment where portfolio_id =?"
                        let investresult =await execquery(sqlinvest,[portfolio_id])
                        var wallets_list = investresult;
                        console.log(wallets_list);
                    } catch (error) {
                        console.log(error);
                    }
                    ////////////////new investment data/////////
                    try {
                        const sqlinvest_new = "DELETE FROM new_pms_add_investment where portfolio_id =?"
                        let investresult_new =await execquery(sqlinvest_new,[portfolio_id])
                        var wallets_list = investresult_new;
                        console.log(wallets_list);
                    } catch (error) {
                        console.log(error);
                    }
                    //////////////investment logs delete//////

                    try {
                        const sqlinvest_logs = "DELETE FROM pms_investment_data_logs where portfolio_id =?"
                        let investresult_logs =await execquery(sqlinvest_logs,[portfolio_id])
                        var wallets_list = investresult_logs;
                        console.log(wallets_list);
                    } catch (error) {
                        console.log(error);
                    }
///////////////

                    try {
                        const deleteexchange = "DELETE FROM pms_user_exchange_info where portfolio_id =?"
                        let deleteresultexchange =await execquery(deleteexchange,[portfolio_id])
                        var wallets_list = deleteresultexchange;
                        console.log("delete1111",wallets_list);
                    } catch (error) {
                        console.log(error);
                    }
                    /////////////////////sup////////
                    try {
                        const deletexchangecredentials = "DELETE FROM pms_exchange_api_key_credentials where portfolio_id =?"
                        let deleteresultexchangecred =await execquery(deletexchangecredentials,[portfolio_id])
                        var wallets_list = deleteresultexchangecred;
                        console.log("delete from pms_exchange_api_key_credential",wallets_list);
                    } catch (error) {
                        console.log(error);
                    }
                    //////////////////////////

                    ///deletehistory////////////////////
                    try {
                        const deletexchangehistory = "DELETE FROM pms_user_exchange_trade_history where portfolio_id =?"
                        let deleteresultexchangehistory =await execquery(deletexchangehistory,[portfolio_id])
                        var wallets_list = deleteresultexchangehistory;
                        console.log("delete from pms_user_exchange_trade_history",wallets_list);
                    } catch (error) {
                        console.log(error);
                    }
                    ////////////////////////////////////////////////////////////////
                    try {
                        const delete_portfolio = "DELETE FROM pms_portfolio where portfolio_id =?"
                        let endresult =await execquery(delete_portfolio,[portfolio_id])
                        console.log("DELETE portfolio table result .",endresult);
                    } catch (error) {
                        console.log(error);
                    }
            }catch(error){
            console.log("NO Portfolio",error);
            }
            connection.release();
        })
    }
    catch(error){
        console.log(error);
    }
}
module.exports = Portfoliousers