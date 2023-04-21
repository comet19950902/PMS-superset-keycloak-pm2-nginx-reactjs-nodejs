

require('dotenv').config()
const axios = require('axios');
var access_key = process.env.DEBANK_ACCESS_KEY;
const db = require('./pool-connection')
// const db = mysql.createPool({
//    connectionLimit: 1000,
//    host:host,
//    user:user,
//    password:password,
//    database:database
//   //  port: process.env.PORT
// //    port: DB_PORT
// })

// const walletId ='0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85'
// const walletId ='0x7b64704948bebbf3c7374a90d6bd2a66930f29fe'

var chainList =[];
// const chainId = 'eth'
const get_simple_protocol = async(walletId,res) => {
  var wallet_assets;
    await db.query('SELECT * FROM pms_address_chain_list WHERE address_id =?',[walletId],async function (error, assets_list, fields) {
      if (error) throw error;
       wallet_assets = await assets_list;
      //  console.log(wallet_assets);
      //  res.send(wallet_assets)
        for (const asset of wallet_assets){
        //  wallet_assets.forEach(async asset => {
          let get_asset_id = asset.asset_id;
          // console.log("asset ID",asset);
          // console.log("asset_name",get_asset_id);
          // var asset_result 
          // console.log("updated", asset_result);
          var asset_data ={};
          // var asset_list =[];
          console.log(walletId);
          console.log(get_asset_id);
          var asset_result = await axios.get(
              // 'https://pro-openapi.debank.com/v1/user/simple_protocol_list?id='+walletId+'&chain_id='+get_asset_id,
                'https://pro-openapi.debank.com/v1/user/complex_protocol_list?id='+walletId+'&chain_id='+get_asset_id,
              {
                 headers: { 
                  'Accesskey': access_key,
                  'accept':'application/json',
                }
              })
              console.log("debank_result",asset_result.data[0]);
            // }catch(error){
            //   console.log(error);
            // }
            var newData =asset_result.data[0]
              chainList.push(newData)
              newData ={}
        }
        // console.log("chainList",chainList);
        res.send(chainList)
        filtereddata = chainList.filter(function( element ) {
          return element !== undefined;
        });
        console.log(filtereddata);
      })
    }

  module.exports =  get_simple_protocol