var util = require('util')
require('dotenv').config()
const axios = require('axios');
// const mysql = require('mysql');
var access_key = process.env.DEBANK_ACCESS_KEY;
// const db= require('./pool-connection');  
const db = require('../../../pool-connection');


const getallWallets_data = async(portfolio_id, res) => {
    try {
         db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                const search_query1 = "Select * FROM pms_user_wallet WHERE portfolio_id =?";
                let wallet_res = await execquery(search_query1,[portfolio_id]);
                console.log(wallet_res);
                var allwalletsresult =[];
                for(let i of wallet_res){
                    wallet_data ={};
                    wallet_data.wallet_id =i.walletId ? i.walletId : null;
                    wallet_data.wallet_name =i.wallet_name ? i.wallet_name: null;
                    wallet_data.wallet_purpose =i.wallet_purpose ? i.wallet_purpose: null;
                    wallet_data.portfolio_id =i.portfolio_id ? i.portfolio_id :null ;
                    wallet_data.timeStamp =i.timeStamp ? i.timeStamp :null ;
                    wallet_data.address_list=[];
                    var addressesofWallet =[];
                    try {
                        const search_query2 = "Select * FROM pms_user_balance WHERE wallet_id =?";
                        let address_res = await execquery(search_query2,[i.walletId]);
                        if(address_res.length>=1){
                            console.log('address_res', address_res);
                            for (let j of address_res){
                                let addressdata ={};
                                addressdata.address_id = j.address_id ? j.address_id :null;
                                addressdata.wallet_id = j.wallet_id ? j.wallet_id :null;
                                addressdata.address_name =j.address_name ? j.address_name :null;
                                addressdata.address_type = j.address_type ? j.address_type :null;
                                addressdata.portfolio_id =j.portfolio_id ? j.portfolio_id : null;
                                addressdata.total_usd = j.total_usd_value ?j.total_usd_value:0;
                                addressdata.ref_address_number = j.ref_address_number ? j.ref_address_number :'0x'+ j.address_id;
                                if(addressdata.address_id != undefined || addressdata.address_id!=null){
                                addressesofWallet.push(addressdata);
                                }
                                else{
                                    console.log("NO address Id");
                                }
                            }
                        }
                        wallet_data.address_list = addressesofWallet;
                        var res_of_wallets =wallet_data;
                        allwalletsresult.push(res_of_wallets)
                    } catch (error) {
                        console.log(error);
                    }
                }
                console.log("allwalletsresult",allwalletsresult);
                    res.send(allwalletsresult)
                }
            catch(error){
                console.log(error);
            }
            connection.release()
         })
    } catch (error) {
        console.log(error);
    }
}


module.exports = getallWallets_data