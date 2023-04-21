require('dotenv').config()
var util = require('util')
const db = require('../../pool-connection');
const execquery = util.promisify(db.query.bind(db))
// var change_price = require('../../pms_wallets/pms_address/pms_address_chainlist/debank_change_price')
var cron_change_price = require('../pms_daily_snapshot_address/pms_cron_change_price')
const axios = require('axios');
var access_key = process.env.DEBANK_ACCESS_KEY;

const get_change_Wallet_asset_protocol = async () => {
    var addressss =[]
    var assets_data=[]
    var res =res;
    try {
        await db.getConnection( async (err, connection) => {
            if (err) throw err ;
            try {                           //SELECT ALL ADRESS ONE BY ONE INSIDE ADDREESS TABLE
                const sqlSelect = "SELECT * FROM pms_user_balance"
                let addresses = await execquery(sqlSelect)
                    var address_list = addresses;   //All address data is stored inside address_list 
                    console.log(address_list);
                        for(let newaddress of address_list){  // Picks all data one by one from address list in a loop..
                            var address_id = newaddress.address_id;  // Address Id is stored in a variable..
                            // console.log(address_id);
                            try {
                                var result =  await axios.get(
                                    'https://pro-openapi.debank.com/v1/user/total_balance?id='+address_id,
                                            {
                                                headers: { 
                                                'Accesskey': access_key,
                                                'accept':'application/json',
                                                }
                                            })
                                    var asset_data =  result.data;
                                    var per =0;
                                    
                                    console.log(asset_data.chain_list);
                                    try {
                                        let history_wallet_data =await execquery('SELECT * FROM pms_user_balance WHERE address_id =?',[address_id])
                                                let latest_history = await history_wallet_data[0];
                                                console.log("History",latest_history);
                                            try {
                                                let sql = "INSERT INTO pms_address_daily_snapshot (address_id_timeStamp, total_usd, address_id, timeStamp, wallet_id, portfolio_id, address_name, address_type) VALUES (?,?,?,?,?,?,?,?);"
                                                let snapshot_updated_result = await execquery(sql, [ address_id+latest_history.timeStamp,  latest_history.total_usd_value, address_id, latest_history.timeStamp, latest_history.wallet_id, latest_history.portfolio_id, latest_history.address_name, latest_history.address_type ])
                                                console.log(snapshot_updated_result);
                                                try {
                                                    let sql = "UPDATE pms_user_balance SET total_usd_value=?, percent=?, timeStamp=? where  address_id=?;"
                                                    let updatedres = await execquery(sql, [Math.floor(asset_data.total_usd_value),per, new Date().toUTCString(), address_id ])
                                                    console.log(updatedres);
                                                        try {
                                                            await cron_change_price(address_id,res)
                                                        } catch (error) {
                                                            console.log(error);
                                                        }
                                                } catch (error) {
                                                 console.log(error);   
                                                }
                                            } catch (error) {
                                                console.log(error);
                                            }
                                    } catch (error) {
                                        console.log(error);
                                    }
                            }catch(error){
                                console.log(error);    
                            }
                        }
            }catch(error){
                    console.log(error);
            }
            connection.release()
        })
    }
    catch(error){
        console.log(error);
    }
}


get_change_Wallet_asset_protocol()



   