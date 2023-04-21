const axios = require('axios');
const db = require('../../pool-connection');
var util = require('util')

// let total_tron_filter =[];
let total_token_filter = []
const get_all_transaction_filter = async (wallet_id,token_type,start_timestamp,end_timestamp,token_typeusd,token_typeusdt,token_typebtc,token_typeeth,portfolio_id,res) => {
  console.log(wallet_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      // if(token_type == null){
      // let total_tron_filter = [];
      if ((token_type == null) && (token_typeusd ==null) && (token_typeusdt == null) && (start_timestamp != null) && (end_timestamp != null) && (token_typebtc == null) && (token_typeeth == null)) {
        console.log("first if block")
        try {
          let total_tron_filter = [];
          console.log("connection address");
          let sql = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`;
          console.log("tron time",start_timestamp,end_timestamp)
          let resultdata = await execquery(sql, [portfolio_id,wallet_id,start_timestamp,end_timestamp]);
          console.log("ressss",resultdata);
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "")  || (i?.eth_usdt >=1 ) ||(i?.eth_usdt == null)){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
                //hash_id,date,amount,comment,from_address,to_address,portfolio_id,wallet_id,tokenType,updated_time,cate_id,send_data,recieve_data,btc_fee,tron_fee,btc_usd_fee,btc_usd_result,symbol,tokenDecimal,tron_usd_fee,method,usdt_token_value,amount_trx,usdc_value,tokenAbbr,token_type,eth_usdt,eth_fee,time_stamp,gas_fee,amount_returned
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
          }
            // total_tron_filter.push(tron_details);


          }
          res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      }
      //////////////////////time/////////////////////////////////////////////
      else if ((token_type == null) && (token_typeusd ==null) && (token_typeusdt == null) && (start_timestamp == null) && (end_timestamp == null) && (token_typebtc == null) && (token_typeeth == null) && (wallet_id == null)) {
        console.log("first if block")
        try {
          let total_tron_filter = [];
          console.log("connection address");
          let sql = `Select * FROM all_transaction_data WHERE portfolio_id =?`;
          // console.log("tron time",start_timestamp,end_timestamp)
          let resultdata = await execquery(sql, [portfolio_id]);
          console.log("ressss",resultdata);
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) || (i?.eth_usdt == null) ){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {  
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
          }
            // total_tron_filter.push(tron_details);


          }
          res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      }
      ///////////////////////////////////////////////////////////////////
      else if (token_type == 'TRX' && token_typeusd == null && token_typeusdt == null && start_timestamp!=null && end_timestamp!=null && token_typebtc == null && token_typeeth == null) {
        try {
          let total_tron_filter = [];
          let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and  (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_type,start_timestamp,end_timestamp]);
          console.log(resultdata_res);
          console.log("token type trx", token_type)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) || (i?.eth_usdt == null) ){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
          }
            // total_tron_filter.push(tron_details);

            // console.log(total_tron_filter)
            // else if (i?.methodName == "TRX Transfer"){
            //     tron_details.amount_trx = i.amount_trx? i.amount_trx:null;
            // }

          }
          res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      }

      /////////////////////////tokenusd////////////////////////////////

      else if (token_typeusd == 'USDC' && token_type == null && token_typeusdt == null && start_timestamp!=null && end_timestamp!=null && token_typebtc == null && token_typeeth == null) {
        // if (token_typeusd == 'USDC' && start_timestamp!=null && end_timestamp!=null){
        // try{
        //   let total_tron_filter = [];
        try {
          let total_tron_filter = [];
          let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
          let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_typeusd,start_timestamp,end_timestamp]);
          console.log(resultdata_res);
          console.log("token type usdc", token_typeusd)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) || (i?.eth_usdt == null) ){
                if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "") || (i?.token_type == 'USDC')) {  
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
          }
            // total_tron_filter.push(tron_details);

            // console.log(total_tron_filter)
            // else if (i?.methodName == "TRX Transfer"){
            //     tron_details.amount_trx = i.amount_trx? i.amount_trx:null;
            // }

          }
          res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
    }

      ////////////////////////////////////////token usd and trx data///////////////////////////////
      else if ((token_type =='TRX' || token_typeusd =='USDC' || token_typeusdt == 'USDT' || token_typebtc == "BTC" ||  token_typeeth == "ETH") && (start_timestamp!=null && end_timestamp!=null)){
        console.log("trx and usdc",token_type,token_typeusd);
      // else if (token_type != null) {
        try{
          let total_tron_filter = [];

        try {
          // let total_tron_filter = [];
          let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
          let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_type,start_timestamp,end_timestamp]);
          console.log(resultdata_res);
          console.log("token type which will be", token_type,token_typeusd)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) ||(i?.eth_usdt == null)){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
          }
           

          }
          // res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      // }

      /////////////////////////tokenusd////////////////////////////////
      // else if (token_typeusd != null) {
      try {
          // let total_tron_filter = [];
          let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
          let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_typeusd,start_timestamp,end_timestamp]);
          console.log(resultdata_res);
          console.log("token type", token_typeusd)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) ||(i?.eth_usdt == null) ){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
            if ((i?.token_type == 'USDC')) {
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
        }
          }
          }
          // res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      //////////////////////////USDT /////////////////////
      try {
        let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
        let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_typeusdt,start_timestamp,end_timestamp]);
        console.log("usdt for tron",resultdata_res);
        console.log("token type", token_type)
        // if(token_type ==null){
        // let total_tron_filter =[];
        for (let i of resultdata_res) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) ||(i?.eth_usdt == null) ){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
            if ((i?.token_type == 'USDT')) {
            var tron_details = {};
            tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
            total_tron_filter.push(tron_details);
          }
        }
        }
          // total_tron_filter.push(tron_details);

          

        }
        // res.send(total_tron_filter);
      }
      catch (error) {
        console.log(error);
        res.send(error);
      }
      ////////////////////////////////////////////////////////////////ETH//////////////////////
      try {
        let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
        let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_typeeth,start_timestamp,end_timestamp]);
        console.log(resultdata_res);
        console.log("token type", token_type)
        // if(token_type ==null){
        // let total_tron_filter =[];
        for (let i of resultdata_res) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) ||(i?.eth_usdt == null) ){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
            if ((i?.token_type == 'ETH')) {
            var tron_details = {};
            tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
            total_tron_filter.push(tron_details);
          }
        }
        }
          // total_tron_filter.push(tron_details);

          

        }
        // res.send(total_tron_filter);
      }
      catch (error) {
        console.log(error);
        res.send(error);
      }
      //////////////////////////////////////
      ////////////////////////////////////////////////////////////////ETH_USD//////////////////////
    //   try {
    //     let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and  (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
    //     let resultdata_res = await execquery(sql_res, [from_address,token_typeeth_usd,start_timestamp,end_timestamp]);
    //     console.log(resultdata_res);
    //     console.log("token type", token_type)
    //     // if(token_type ==null){
    //     // let total_tron_filter =[];
    //     for (let i of resultdata_res) {
    //         if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") ){
    //         if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
    //         var tron_details = {};
    //         tron_details.hash_id = i.hash_id ? i.hash_id : null;
    //           tron_details.amount = i.amount ? i.amount :null;
    //           tron_details.date = i.date ? i.date :null;
    //           tron_details.comment = i.comment ? i.comment :null;
    //           tron_details.from_address = i.from_address ? i.from_address :null;
    //           tron_details.to_address = i.to_address ? i.to_address :null;
    //           tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
    //           tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
    //           tron_details.tokenType = i.tokenType ? i.tokenType : null;
    //           tron_details.updated_time = i.updated_time ? i.updated_time : null;
    //           tron_details.cate_id = i.cate_id ? i.cate_id : null;
    //           tron_details.send_data = i.send_data ? i.send_data : null;
    //           tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
    //           tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
    //           tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
    //           tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
    //           tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
    //           tron_details.symbol = i.symbol ? i.symbol:null;
    //           tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
    //           tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
    //           tron_details.method = i.method ? i.method : null;
    //           tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
    //           tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
    //           tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
    //           tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
    //           tron_details.token_type = i.token_type ? i.token_type : null;
    //           tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
    //           tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
    //           tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
    //           tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
    //           tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
    //           tron_details.fee = 1;
    //         total_tron_filter.push(tron_details);
    //       }
    //     }
    //       // total_tron_filter.push(tron_details);

          

    //     }
    //     // res.send(total_tron_filter);
    //   }
    //   catch (error) {
    //     console.log(error);
    //     res.send(error);
    //   }
      ////////////////////////////////////// ETH_USDT
    //   try {
    //     let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and  (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
    //     let resultdata_res = await execquery(sql_res, [from_address,token_typeeth_usdt,start_timestamp,end_timestamp]);
    //     console.log(resultdata_res);
    //     console.log("token type", token_type)
    //     // if(token_type ==null){
    //     // let total_tron_filter =[];
    //     for (let i of resultdata_res) {
    //         if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") ){
    //         if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
    //         var tron_details = {};
    //         tron_details.hash_id = i.hash_id ? i.hash_id : null;
    //           tron_details.amount = i.amount ? i.amount :null;
    //           tron_details.date = i.date ? i.date :null;
    //           tron_details.comment = i.comment ? i.comment :null;
    //           tron_details.from_address = i.from_address ? i.from_address :null;
    //           tron_details.to_address = i.to_address ? i.to_address :null;
    //           tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
    //           tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
    //           tron_details.tokenType = i.tokenType ? i.tokenType : null;
    //           tron_details.updated_time = i.updated_time ? i.updated_time : null;
    //           tron_details.cate_id = i.cate_id ? i.cate_id : null;
    //           tron_details.send_data = i.send_data ? i.send_data : null;
    //           tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
    //           tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
    //           tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
    //           tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
    //           tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
    //           tron_details.symbol = i.symbol ? i.symbol:null;
    //           tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
    //           tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
    //           tron_details.method = i.method ? i.method : null;
    //           tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
    //           tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
    //           tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
    //           tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
    //           tron_details.token_type = i.token_type ? i.token_type : null;
    //           tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
    //           tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
    //           tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
    //           tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
    //           tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
    //           tron_details.fee = 1;
    //         total_tron_filter.push(tron_details);
    //       }
    //     }
    //       // total_tron_filter.push(tron_details);

          

    //     }
    //     // res.send(total_tron_filter);
    //   }
    //   catch (error) {
    //     console.log(error);
    //     res.send(error);
    //   }

      ////////////////////////////////////////BTC

      try {
        let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
        let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_typebtc,start_timestamp,end_timestamp]);
        console.log(resultdata_res);
        console.log("token type", token_type)
        // if(token_type ==null){
        // let total_tron_filter =[];
        for (let i of resultdata_res) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) ||(i?.eth_usdt == null)){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
            var tron_details = {};
            tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
            total_tron_filter.push(tron_details);
          }
        }
          // total_tron_filter.push(tron_details);

          

        }
        // res.send(total_tron_filter);
      }
      catch (error) {
        console.log(error);
        res.send(error);
      }
      /////////////////////////////////////
        res.send(total_tron_filter);

      }

      ///////////////////////////////////////////////////////////////////////////////////////////////
      
      ///////////////////////////////////////////////////////////////////////////////////////////////////
      
      catch (error){
        console.log(error);
        res.send(error);
      }
    
    }

      ///////////////////////////////////////////////////////////////////////////

      /////////////////////////////////tokenusdt///////////////////////////////

      else if (token_typeusdt == 'USDT' && token_type == null && token_typeusd == null && start_timestamp!=null && end_timestamp!=null &&  token_typebtc == null && token_typeeth == null) {
        try {
            console.log("tron usdt")
          let total_tron_filter = [];
          let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
          let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_typeusdt,start_timestamp,end_timestamp]);
          console.log(resultdata_res);
          console.log("token type",token_typeusdt )
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) || (i?.eth_usdt == null) ){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "") || (i?.token_type == 'USDT')) {
            if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
        }
          }
            // total_tron_filter.push(tron_details);

            // console.log(total_tron_filter)
            // else if (i?.methodName == "TRX Transfer"){
            //     tron_details.amount_trx = i.amount_trx? i.amount_trx:null;
            // }

          }
          res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      }

      ///////////////////////btc///////////////////////

      else if (token_typeusdt == null && token_typebtc == "BTC" && token_type == null && token_typeusd == null && start_timestamp!=null && end_timestamp!=null &&  token_typebtc == null && token_typeeth == null){
        try {
          console.log("tron usdt")
          let total_tron_filter = [];
          let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
          let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_typebtc,start_timestamp,end_timestamp]);
          console.log(resultdata_res);
          console.log("token type", token_type)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
              if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) || (i?.eth_usdt == null)){
              if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
                tron_details.amount = i.amount ? i.amount :null;
                tron_details.date = i.date ? i.date :null;
                tron_details.comment = i.comment ? i.comment :null;
                tron_details.from_address = i.from_address ? i.from_address :null;
                tron_details.to_address = i.to_address ? i.to_address :null;
                tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
                tron_details.tokenType = i.tokenType ? i.tokenType : null;
                tron_details.updated_time = i.updated_time ? i.updated_time : null;
                tron_details.cate_id = i.cate_id ? i.cate_id : null;
                tron_details.send_data = i.send_data ? i.send_data : null;
                tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
                tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
                tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
                tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
                tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
                tron_details.symbol = i.symbol ? i.symbol:null;
                tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
                tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
                tron_details.method = i.method ? i.method : null;
                tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
                tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
                tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
                tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
                tron_details.token_type = i.token_type ? i.token_type : null;
                tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
                tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
                tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
                tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
                tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
                tron_details.fee = 1;
                total_tron_filter.push(tron_details);            }
          }
            // total_tron_filter.push(tron_details);
  
            
  
          }
          // res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      }


      //////////////////////////////ETH/////////////////////////

      else if (token_typeeth == 'ETH' && token_type == null && token_typeusd == null && start_timestamp!=null && end_timestamp!=null &&  token_typebtc == null && token_typeusdt == null) {
        try {
            console.log("tron usdt")
          let total_tron_filter = [];
          let sql_res = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? (token_type) IN(?) and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [portfolio_id,wallet_id,token_typeeth,start_timestamp,end_timestamp]);
          console.log(resultdata_res);
          console.log("token type",token_typeeth )
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "")  || (i?.eth_usdt >=1 ) ||(i?.eth_usdt == null)){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
            if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
            }
          }
            // total_tron_filter.push(tron_details);

            // console.log(total_tron_filter)
            // else if (i?.methodName == "TRX Transfer"){
            //     tron_details.amount_trx = i.amount_trx? i.amount_trx:null;
            // }

          }
          res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      }


      //////////////////////////////////////////////////////////////////////
      else if ((start_timestamp !=null) && (end_timestamp!=null) && (token_type == null) && (token_typeusd == null) && (token_typeusdt == null) && (portfolio_id!=null) && (token_typebtc == null)  && (token_typeeth == null)){
        console.log("time will be in time check",end_timestamp)
          try {
            console.log("connection address timee",start_timestamp);
            let total_tron_filter = [];
            let sql_res_time = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =? and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
          let resultdata_res_time = await execquery(sql_res_time, [portfolio_id,wallet_id, start_timestamp,end_timestamp]);
            // if(token_type ==null){
            // let total_tron_filter =[];
            for (let i of resultdata_res_time) {
              // let total_tron_filter = [];
              if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) ||(i?.eth_usdt == null) ){
                if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
  
                var tron_details = {};
                tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
            total_tron_filter.push(tron_details);
              }
            }
            console.log("token details for tron time",total_tron_filter)
              // total_tron_filter.push(tron_details);
  
            }
            res.send(total_tron_filter);
          }
          catch (error) {
            console.log(error);
            res.send(error);
          }
      } 

      /////////////////////////////////////

      else if ((start_timestamp !=null) && (end_timestamp!=null) && (token_type == null) && (token_typeusd == null) && (token_typeusdt == null) && (portfolio_id!=null) && (token_typebtc == null)  && (token_typeeth == null)){
        console.log("time will be in time check",end_timestamp)
          try {
            console.log("connection address timee",start_timestamp);
            let total_tron_filter = [];
            let sql_res_time = `Select * FROM all_transaction_data WHERE portfolio_id =? and time_stamp>= ${start_timestamp} and time_stamp<= ${end_timestamp};`
          let resultdata_res_time = await execquery(sql_res_time, [portfolio_id, start_timestamp,end_timestamp]);
            // if(token_type ==null){
            // let total_tron_filter =[];
            for (let i of resultdata_res_time) {
              // let total_tron_filter = [];
              if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) ||(i?.eth_usdt == null)){
                if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {
  
                var tron_details = {};
                tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
            total_tron_filter.push(tron_details);
              }
            }
            console.log("token details for tron time",total_tron_filter)
              // total_tron_filter.push(tron_details);
  
            }
            res.send(total_tron_filter);
          }
          catch (error) {
            console.log(error);
            res.send(error);
          }
      } 
      //////////////////////////////////////////////////////
      else if ((token_type == null) && (token_typeusd ==null) && (token_typeusdt == null) && (start_timestamp == null) && (end_timestamp == null) && (token_typebtc == null) && (token_typeeth == null) && (portfolio_id!=null) && (wallet_id!=null)) {
        console.log("first if block else")
        try {
          let total_tron_filter = [];
          console.log("connection address");
          let sql = `Select * FROM all_transaction_data WHERE portfolio_id =? and wallet_id =?`;
          // console.log("tron time",start_timestamp,end_timestamp)
          let resultdata = await execquery(sql, [portfolio_id,wallet_id]);
          console.log("ressss",resultdata);
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata) {
            if(( (i?.amount_trx) >=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) || (i?.amount_trx =="") ||(i?.usdc_value == "") || (i?.usdt_token_value == "") || (i?.eth_usdt >=1 ) || (i?.eth_usdt == null)){
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null) || (i?.tokenAbbr == "")) {  
              var tron_details = {};
              tron_details.hash_id = i.hash_id ? i.hash_id : null;
              tron_details.amount = i.amount ? i.amount :null;
              tron_details.date = i.date ? i.date :null;
              tron_details.comment = i.comment ? i.comment :null;
              tron_details.from_address = i.from_address ? i.from_address :null;
              tron_details.to_address = i.to_address ? i.to_address :null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.wallet_id = i.wallet_id ? i.wallet_id : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.updated_time = i.updated_time ? i.updated_time : null;
              tron_details.cate_id = i.cate_id ? i.cate_id : null;
              tron_details.send_data = i.send_data ? i.send_data : null;
              tron_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              tron_details.btc_fee = i.btc_fee ? i.btc_fee : null;
              tron_details.tron_fee = i.tron_fee ? i.tron_fee : null;
              tron_details.btc_usd_fee = i.btc_usd_fee ? i.btc_usd_fee:null;
              tron_details.btc_usd_result = i.btc_usd_result ? i.btc_usd_result:null;
              tron_details.symbol = i.symbol ? i.symbol:null;
              tron_details.tokenDecimal = i.tokenDecimal ? i.tokenDecimal : null;
              tron_details.tron_usd_fee = i.tron_usd_fee ? i.tron_usd_fee : null;
              tron_details.method = i.method ? i.method : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? i.amount_trx : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.tokenAbbr = i.tokenAbbr ? i.tokenAbbr : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.eth_usdt = i.eth_usdt ? i.eth_usdt : null;
              tron_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              tron_details.time_stamp = i.time_stamp ? i.time_stamp : null;
              tron_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              tron_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
          }
            // total_tron_filter.push(tron_details);


          }
          res.send(total_tron_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      }
      ////////////////////////////////////////////////////
      connection.release();
    })
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}


// getquerty()
module.exports = get_all_transaction_filter



