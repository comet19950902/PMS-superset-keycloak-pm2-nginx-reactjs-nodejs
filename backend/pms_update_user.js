var change_price = require('./pms_wallets/pms_address/pms_address_chainlist/debank_change_price')
var util = require('util')
require('dotenv').config()
const axios = require('axios');
var access_key = process.env.DEBANK_ACCESS_KEY;
const db= require('./pool-connection');    
const execquery = util.promisify(db.query.bind(db))

const getquerty = async function getquerty(res) {
    const search_query = "Select * FROM pms_user_balance";
    try {
        let resultdata = await execquery(search_query);
        console.log(resultdata);
        var totalportfolio = [];
        for (let i of resultdata){
            let address_id = i.address_id;
            try {
                    var addressresult =  await axios.get(
                        'https://pro-openapi.debank.com/v1/user/total_balance?id='+address_id,
                                {
                                    headers: { 
                                    'Accesskey': access_key,
                                    'accept':'application/json',
                                    }
                                })
                        var address_data =  addressresult.data;
                        var per =0;
                        console.log(address_data);
            }
            catch(error){
            console.log(error);
            }
        }
    }catch(error){
        console.log(error);
    }
         
}
            
getquerty()