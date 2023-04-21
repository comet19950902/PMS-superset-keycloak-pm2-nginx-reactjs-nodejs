require('dotenv').config()
const axios = require('axios');
var host= process.env.DB_HOST;
var user= process.env.DB_USER;
var password= process.env.DB_PASSWORD;
var database= process.env.DB_DATABASE;
var access_key = process.env.DEBANK_ACCESS_KEY;
const db = require('./pool-connection');
// const walletId ='0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85'
// const walletId ='0x7b64704948bebbf3c7374a90d6bd2a66930f29fe'

// var chainList =[];
allresult =[];
alldata =[];
var assetList;
// const chain_id = 'eth'
const get_simple_protocol = async(address_id,res) => {
//   var wallet_assets;
    try{
         db.getConnection( async (err, connection) => {
            if (err) throw err 
            try{
                 const sqlSelect = "SELECT * FROM pms_address_chain_list where address_id=?"
                    await connection.query (sqlSelect,[address_id],async (err, result)=> {
                    if (err) throw (err)
                    assetList = result;
                    // console.log(assetList);
                    //  await assets_list.data.forEach(async (chainlist) => {
                    for(const chain of assetList){
                        // console.log("chain_>>",chain);
                        let chain_id = chain.asset_id;
                        // console.log(chain_id);
                        var chain_result = await axios.get(
                            // 'https://pro-openapi.debank.com/v1/user/simple_protocol_list?id='+address_id+'&chain_id='+chain_id,
                                'https://pro-openapi.debank.com/v1/user/complex_protocol_list?id='+address_id+'&chain_id='+chain_id,
                            {
                                headers: { 
                                'Accesskey': access_key,
                                'accept':'application/json',
                                }
                            })
                        // console.log("debank_result",chain_result.data);
                        var portdata = chain_result.data[0] ? chain_result.data[0] :'-'
                        if( chain_result.data[0]){
                            // console.log("portdata",portdata);
                            let chain_id_used = portdata.chain ? portdata.chain:'-';
                            let comp_protocol_name = portdata.name ? portdata.name:'-';
                            let portfoliodata = portdata.portfolio_item_list ? portdata.portfolio_item_list:'-';
                            let portfoliodatalength = portfoliodata.length ? portfoliodata.length : '-';
                            console.log(portfoliodatalength);
                            console.log(portfoliodata);
                            for(let i of portfoliodata){
                                let net_usd_value = i.stats.net_usd_value? i.stats.net_usd_value :'-' ;
                                let protocol_excution_name = i.name ? i.name:'-' ;
                                let detail = i.detail ? i.detail:'-';
                                // console.log("token_list",detail);
                                let  supply_token_list = detail.supply_token_list? detail.supply_token_list: null;
                                // let supply_token_list_length = supply_token_list.length;
                                let reward_token_list = detail.reward_token_list ? detail.reward_token_list :null;
                                // let reward_token_list_length = detail.reward_token_list.length;
                                let borrow_token_list = detail.borrow_token_list ? detail.borrow_token_list: null;
                                // let borrow_token_list_length = borrow_token_list.length;

                                // let pool  = detail.pool ? 
                                if(supply_token_list && supply_token_list.length >=1){
                                    for(j of supply_token_list){
                                        let token_type =  'supply'
                                        let  supply_token_id = j.id;
                                        let supply_token_chain =j.chain ? j.chain: null;
                                        let supply_token_amount = j.amount ? j.amount: null;
                                        let supply_token_name  = j.name? j.name: null;
                                        let supply_token_symbol = j.symbol? j.symbol: null;
                                        let supply_token_logo_url =j.logo_url? j.logo_url: null;
                                        let supply_token_protocol_id =j.protocol_id? j.protocol_id: null;
                                        let supply_token_price = j.price ? j.price: null;
                                        let supply_token_time_at = j.time_at? j.time_at: null;
                                    }
                                }
                                if(reward_token_list && reward_token_list.length >=1){
                                    for (k of reward_token_list){
                                        let token_type =  'reward'
                                        let supply_token_id = j.id;
                                        let supply_token_chain =j.chain ? j.chain: null;
                                        let supply_token_amount = j.amount ? j.amount: null;
                                        let supply_token_name  = j.name? j.name: null;
                                        let supply_token_symbol = j.symbol? j.symbol: null;
                                        let supply_token_logo_url =j.logo_url? j.logo_url: null;
                                        let supply_token_protocol_id =j.protocol_id? j.protocol_id: null;
                                        let supply_token_price = j.price ? j.price: null;
                                        let supply_token_time_at = j.time_at? j.time_at: null;
                                    }
                                }
                                if(borrow_token_list && borrow_token_list.length >=1){
                                    for (l of borrow_token_list){
                                        let token_type =  'borrow'
                                        let supply_token_id = j.id;
                                        let supply_token_chain =j.chain ? j.chain: null;
                                        let supply_token_amount = j.amount ? j.amount: null;
                                        let supply_token_name  = j.name? j.name: null;
                                        let supply_token_symbol = j.symbol? j.symbol: null;
                                        let supply_token_logo_url =j.logo_url? j.logo_url: null;
                                        let supply_token_protocol_id =j.protocol_id? j.protocol_id: null;
                                        let supply_token_price = j.price ? j.price: null;
                                        let supply_token_time_at = j.time_at? j.time_at: null;
                                    }
                                }
                            }
                            // let portfolio_item_list = portfoliolistdata[0]
                            //  console.log("newdata",portfoliolistdata[0]);
                        }
                        // var portfoliolistdata =portdata.portfolio_item_list
                        // console.log("portfolio",portdata.portfolio_item_list);
                            // console.log("newdata",portfoliolistdata[0].detail);
                            // alldata.push(chain_result.data)
                        // var listOfProtocols = await chain_result.data;
                       
                        // //    await listOfProtocols.forEach(async (protocol) => {
                        //     console.log(protocol.id);
                        //     var protocolId = protocol.id?protocol.id:'null';
                        //     var protocolName = protocol.name?protocol.name:'null';
                        //     var protocolChain = protocol.chain? protocol.chain:chain_id;
                        //     var protocolsiteUrl =protocol.site_url? protocol.site_url: 'null';
                        //     var protocolLogoUrl = protocol.logo_url? protocol.logo_url:'null';
                        //     var tvlValue = protocol.tvlValue? protocol.tvlValue:'null';
                        //     var net_usd_value = protocol.net_usd_value? protocol.net_usd_value:'null';
                        //         //    var wallet_Id = walletId;
                        //         let sql = "REPLACE INTO pms_wallet_simple_protocol (protocol_chain_wallet_id, protocolId, protocolName, protocolChain, protocolsiteUrl, protocolLogoUrl, tvlValue, net_usd_value, address_id, updated_date ) VALUES (?,?,?,?,?,?,?,?,?,?);"
                        //         await  connection.query(sql, [ address_id + chain_id + protocol.id ,protocolId, protocolName, protocolChain, protocolsiteUrl, protocolLogoUrl, tvlValue, net_usd_value, address_id, new Date().toUTCString()],async function (error, results, fields) {
                        //         if (error) throw error;
                        //         // console.log("Result",results);
                        //          allresult.push(results.affectedRows)
                        //         })
                        // }     
                    }
                    // console.log("updated..........");
                    console.log(alldata);
                     res.send(alldata)
                })  
            }
            finally{
                //  console.log("UPDATED Simple Protocol");
                }
                connection.release()
            })
    }
    catch(error){
        console.log(error);
    }
}

  module.exports =  get_simple_protocol