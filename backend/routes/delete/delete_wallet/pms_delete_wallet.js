require('dotenv').config()
const pms_delete_address = require('../delete_address/pms_delete_address')
const db = require('../../../pool-connection');
var util = require('util')

const delete_portfolio_data = async(wallet_id,res) => {
    try{
        db.getConnection( async (err, connection) => {
            if (err) throw (err)
            const execquery = util.promisify(connection.query.bind(connection))
            try {
                const sqlSelect = "SELECT * FROM pms_user_balance where wallet_id=?"
                let result = await execquery(sqlSelect,[wallet_id])
                var addressList = result;
                console.log(addressList.length)
                if(addressList && addressList.length >=1){
                    for (let i of result){
                        let address_id = i.address_id;
                        try {
                            await pms_delete_address(address_id,res);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
                try {
                    const sqlDelete = "DELETE FROM pms_user_wallet WHERE walletId=?"
                    let result2 = await execquery(sqlDelete,[wallet_id])
                    console.log(result2);
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
            connection.release()   
        })
    }
    catch(error){
        console.log(error);
    }
}

module.exports = delete_portfolio_data