const axios = require('axios');
const db = require('../../../pool-connection');
var util = require('util')

// let total_tron_filter =[];
let total_token_filter = []
const get_tron_transaction_filter = async (address_id,token_type,start_timestamp,end_timestamp,token_typeusd,token_typeusdt,res) => {
  console.log(address_id);
  let eth_tran = 0;
  let rcvamt =0;
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      var config_data = {
        method: 'get',
        url: `https://apilist.tronscan.org/api/transaction?address=` + address_id,
        headers: {}
    };
    let result_of_prev = await axios(config_data);
    console.log("totala",result_of_prev.data.total)
    let tran = result_of_prev.data.total
    transactionData = result_of_prev.data; 
    tron_last_time = (transactionData.data).slice(0)?.[0]?.timestamp;
    let total_tron_filter_all = [];
    var amt_rcv = [];
    var sen_amt = [];
    var amt_rcv_usdc =[];
    var amt_rcv_usdt = [];
    var amt_rcv_trx =[]
    var send_amt_trx = [];
    var amt_send_usdc= [];
    var amt_send_usdt = [];
    var total_trx ;
    var total_usdt;
    var total_usdc;

    let sql_all_tr = `Select * FROM tron_transactions WHERE address_id =?`;
    let resultdata_all_tr = await execquery(sql_all_tr, [address_id]);
    for(let k of  resultdata_all_tr ){
      // if ((resultdata_all_tr[k]?.tokenAbbr == 'trx') || (resultdata_all_tr[k]?.tokenAbbr == null) || (resultdata_all_tr[k]?.usdc_value >= 1) || (resultdata_all_tr[k]?.usdt_token_value >= 1) || ((resultdata_all_tr[k]?.energy_fee) * (resultdata_all_tr[k]?.amount_trx)>=1)) {
        var send_amount;
        var amt = k?.amount_trx;
      var amttt = amt
      var enr= parseFloat(k?.energy_fee);
      var usdc = parseFloat(k?.usdc_value);
      var usdt = parseFloat(k?.usdt_token_value);
        var rcv_amount  =0;
        if(((k?.energy_fee) * (k?.amount_trx)>=1) ||((k?.usdc_value) >=1) || ((k?.usdt_token_value) >= 1) ){
          if ((k?.tokenAbbr == 'trx') || (k?.tokenAbbr == null)) {
        var sennn = resultdata_all_tr
        var eth_details_all = {};
      

        eth_details_all.hash = k.hash ? k.hash : null;
        eth_details_all.amount_trx = k.amount_trx ? (k.energy_fee) * (k.amount_trx) : null;
        eth_details_all.usdc_value = k.usdc_value ? k.usdc_value : null;
        eth_details_all.ownerAddress = k.ownerAddress ? k.ownerAddress : null;
        eth_details_all.usdt_token_value = k.usdt_token_value ? k.usdt_token_value : null;
        eth_details_all.token_type = k.token_type ? k.token_type : null;


        var sennn = resultdata_all_tr
        var eth_tran_len = eth_tran + k;
      if (k.ownerAddress != address_id){
        rcv_amount += amttt * k?.energy_fee
        amt_rcv.push(amttt * enr)
        if (k.token_type == "TRX"){
          total_trx +=k;
          amt_rcv_trx.push(amttt * enr)
        }
        else if (k.token_type == "USDT"){
          amt_rcv_usdt.push(usdt)
        }
        else if (k.token_type == "USDC"){
          amt_rcv_usdc.push(usdc)
        }
        
    }
    else if (k.ownerAddress == address_id) {
        send_amount = k?.usdc_value + k?.usdt_token_value
        // console.log(send_amount)
        if (k.token_type == "TRX"){
          total_trx +=k;
          send_amt_trx.push(amttt * enr)
        }
        else if (k.token_type == "USDT"){
          amt_send_usdt.push(usdt)
        }
        else if (k.token_type == "USDC"){
          amt_send_usdc.push(usdc)
        }
        sen_amt.push(usdc,usdt)
  }
  
  // else if (k.ownerAddress == address_id && k.token_type == "TRX"){
  //   send_amt_trx.push(amttt * enr)
  // }
    total_tron_filter_all.push(eth_details_all); 
   }
  }
  
  }
  let sum_amt = amt_rcv.reduce((partialSum, a) => partialSum + a, 0);
  let sum_rcv_trx = amt_rcv_trx.reduce((partialSum, c) => partialSum + c, 0)
  let sum_rcv_usdt = amt_rcv_usdt.reduce((partialSum, d) => partialSum + d, 0)
  let sum_rcv_usdc = amt_rcv_usdc.reduce((partialSum, e) => partialSum + e, 0)
  total_trx = amt_rcv_trx.length + send_amt_trx.length;
  total_usdt = amt_send_usdt.length + amt_rcv_usdt.length;
  total_usdc =amt_send_usdc.length + amt_rcv_usdc.length
  console.log("count trx",total_trx)
  console.log("count usdt",total_usdt)
  console.log("count usdc",total_usdc)

  let sum_send_trx = send_amt_trx.reduce((partialSum, f) => partialSum + f, 0)
  let sum_send_usdc = amt_send_usdc.reduce((partialSum, g) => partialSum + g, 0)

  let sum_send_usdt = amt_send_usdt.reduce((partialSum, h) => partialSum + h, 0)

  console.log("sum of rcv trx token",sum_rcv_trx)
  console.log("sum of usdt rcv",sum_rcv_usdt)
  console.log("sum of usdc rcv token",sum_rcv_usdc)
  console.log("sum of trx send token",sum_send_trx)

  console.log("sum of usdc send token",sum_send_usdc)

  console.log("sum of usdt send token",sum_send_usdt)

  console.log("will",sum_amt);
  let snd= sen_amt.filter(n => n)
  // console.log("send amt will noe ",snd)
  let send_am = snd.reduce((partialSum, b) => partialSum + b, 0);
  console.log("will be will send",send_am);
  let total_send = sum_send_trx +sum_send_usdt+sum_send_usdc
console.log("total send",total_send)

  // console.log("ressss",sen_amt);
  // console.log('amt arr will be',amt_rcv)
  // console.log("rcvvvvvvv",rcv_amount)
  console.log("ressss rcv amo",total_tron_filter_all.length);

    const sqlSelect_tron = "Update tron_balance SET transactions=?,tron_last_time=?,rcv_amount=?,send_amount=?,amt_rcv_trx=?,amt_rcv_usdt=?,amt_rcv_usdc=?,send_amt_trx=?,amt_send_usdt=?,amt_send_usdc=?,total_trx=?,total_usdt=?,total_usdc=? WHERE address_id =?"
    let result_tron =await execquery(sqlSelect_tron,[total_tron_filter_all.length,tron_last_time,sum_amt,total_send,sum_rcv_trx,sum_rcv_usdt,sum_rcv_usdc,sum_send_trx,sum_send_usdt,sum_send_usdc,total_trx,total_usdt,total_usdc,address_id])       
    console.log("connection address",result_tron); 

      // if(token_type == null){
      // let total_tron_filter = [];
      if ((token_type == null) && (token_typeusd ==null) && (token_typeusdt == null) && (start_timestamp != null) && (end_timestamp != null)) {
        // console.log("first if block")
        try {
          let total_tron_filter = [];
          // console.log("connection address");
          let sql = `Select * FROM tron_transactions WHERE address_id =? and tron_time>= ${start_timestamp} and tron_time<= ${end_timestamp};`;
          // console.log("tron time",start_timestamp,end_timestamp)
          let resultdata = await execquery(sql, [address_id,start_timestamp,end_timestamp]);
          // console.log("ressss",resultdata);
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata) {
            if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) ){
              if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null)) {
              var tron_details = {};
              tron_details.hash = i.hash ? i.hash : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.methodName = i.methodName ? i.methodName : null;
              tron_details.comment = i.comment ? i.comment : null;
              tron_details.address_type = i.address_type ? i.address_type : null;
              tron_details.timestamp = i.timestamp ? i.timestamp : null;
              tron_details.amount = i.amount ? i.amount : null;
              tron_details.tron_time = i.tron_time ? i.tron_time : null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.energy_fee = i.energy_fee ? i.energy_fee:null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? (i.energy_fee) * (i.amount_trx) : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              tron_details.toAddress = i.toAddress ? i.toAddress : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
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
      else if ((token_type == null) && (token_typeusd ==null) && (token_typeusdt == null) && (start_timestamp == null) && (end_timestamp == null)) {
        // console.log("first if block")
        try {
          let total_tron_filter = [];
          // console.log("connection address");
          let sql = `Select * FROM tron_transactions WHERE address_id =?`;
          // console.log("tron time",start_timestamp,end_timestamp)
          let resultdata = await execquery(sql, [address_id]);
          // console.log("ressss",resultdata);
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata) {
            if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) ){
              if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null)) {
              var tron_details = {};
              tron_details.hash = i.hash ? i.hash : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.methodName = i.methodName ? i.methodName : null;
              tron_details.comment = i.comment ? i.comment : null;
              tron_details.address_type = i.address_type ? i.address_type : null;
              tron_details.timestamp = i.timestamp ? i.timestamp : null;
              tron_details.amount = i.amount ? i.amount : null;
              tron_details.tron_time = i.tron_time ? i.tron_time : null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.energy_fee = i.energy_fee ? i.energy_fee:null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? (i.energy_fee) * (i.amount_trx) : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              tron_details.toAddress = i.toAddress ? i.toAddress : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
            // const sqlSelect_tron = "Update tron_balance SET transactions=?,tron_last_time=?,rcv_amount=?,transactions=? WHERE address_id =?"
            // let result_tron =await execquery(sqlSelect_tron,[total_tron_filter.length,tron_last_time,rcv_amount,tran,address_id])       
            // console.log("connection address",result_tron);
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
      else if (token_type == 'TRX' && token_typeusd == null && token_typeusdt == null && start_timestamp!=null && end_timestamp!=null) {
        try {
          let total_tron_filter = [];
          let sql_res = `Select * FROM tron_transactions WHERE address_id =? and  (token_type) IN(?) and tron_time>= ${start_timestamp} and tron_time<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [address_id, token_type,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type trx", token_type)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) ){
              if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null)) {
              var tron_details = {};
              tron_details.hash = i.hash ? i.hash : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.methodName = i.methodName ? i.methodName : null;
              tron_details.comment = i.comment ? i.comment : null;
              tron_details.address_type = i.address_type ? i.address_type : null;
              tron_details.timestamp = i.timestamp ? i.timestamp : null;
              tron_details.amount = i.amount ? i.amount : null;
              tron_details.energy_fee = i.energy_fee ? i.energy_fee:null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? (i.energy_fee) * (i.amount_trx) : null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              tron_details.toAddress = i.toAddress ? i.toAddress : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
            // const sqlSelect_trn = "Update tron_balance SET transactions=?,tron_last_time=?,rcv_amount=?,transactions=? WHERE address_id =?"
            // let result_trn =await execquery(sqlSelect_trn,[total_tron_filter.length,tron_last_time,rcv_amount,tran,address_id])       
            // console.log("connection address",total_tron_filter.length);
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

      else if (token_typeusd == 'USDC' && token_type == null && token_typeusdt == null && start_timestamp!=null && end_timestamp!=null) {
        // if (token_typeusd == 'USDC' && start_timestamp!=null && end_timestamp!=null){
        // try{
        //   let total_tron_filter = [];
        try {
          let total_tron_filter = [];
          let sql_res = `Select * FROM tron_transactions WHERE address_id =? and  (token_type) IN(?) and tron_time>= ${start_timestamp} and tron_time<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [address_id, token_typeusd,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type usdc", token_typeusd)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if( (i?.usdc_value) >=1 ){
              if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null)) {
              var tron_details = {};
              tron_details.hash = i.hash ? i.hash : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.methodName = i.methodName ? i.methodName : null;
              tron_details.comment = i.comment ? i.comment : null;
              tron_details.address_type = i.address_type ? i.address_type : null;
              tron_details.timestamp = i.timestamp ? i.timestamp : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? (i.energy_fee) * (i.amount_trx) : null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.amount = i.amount ? i.amount : null;
              tron_details.tron_time = i.tron_time ? i.tron_time : null;
              tron_details.energy_fee = i.energy_fee ? i.energy_fee:null;
              tron_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              tron_details.toAddress = i.toAddress ? i.toAddress : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
            // const sqlSelect_tron_all = "Update tron_balance SET transactions=?,tron_last_time=?,rcv_amount=?,transactions=? WHERE address_id =?"
            // let result_tron_all =await execquery(sqlSelect_tron_all,[total_tron_filter.length,tron_last_time,rcv_amount,tran,address_id])       
            // console.log("connection address",total_tron_filter.length);
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
      else if ((token_type =='TRX' || token_typeusd =='USDC' || token_typeusdt == 'USDT') && (start_timestamp!=null && end_timestamp!=null)){
        // console.log("trx and usdc",token_type,token_typeusd);
      // else if (token_type != null) {
        try{
          let total_tron_filter = [];

        try {
          // let total_tron_filter = [];
          let sql_res = `Select * FROM tron_transactions WHERE address_id =? and  (token_type) IN(?) and tron_time>= ${start_timestamp} and tron_time<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [address_id, token_type,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type which will be", token_type,token_typeusd)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) ){

              if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null)) {
              var tron_details = {};
              tron_details.hash = i.hash ? i.hash : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.methodName = i.methodName ? i.methodName : null;
              tron_details.comment = i.comment ? i.comment : null;
              tron_details.address_type = i.address_type ? i.address_type : null;
              tron_details.timestamp = i.timestamp ? i.timestamp : null;
              tron_details.amount = i.amount ? i.amount : null;
              tron_details.energy_fee = i.energy_fee ? i.energy_fee:null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? (i.energy_fee) * (i.amount_trx) : null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              tron_details.toAddress = i.toAddress ? i.toAddress : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.tron_time = i.tron_time ? i.tron_time : null;
              tron_details.fee = 1;
              total_tron_filter.push(tron_details);
            }
            // const sqlSelect_tron_all_tron = "Update tron_balance SET transactions=?,tron_last_time=?,rcv_amount=?,transactions=? WHERE address_id =?"
            // let result_tron_all =await execquery(sqlSelect_tron_all_tron,[total_tron_filter.length,tron_last_time,rcv_amount,tran,address_id])       
            // console.log("connection address",total_tron_filter.length);
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
          let sql_res = `Select * FROM tron_transactions WHERE address_id =? and  (token_type) IN(?) and tron_time>= ${start_timestamp} and tron_time<= ${end_timestamp};`
          let resultdata_res = await execquery(sql_res, [address_id, token_typeusd,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type", token_typeusd)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
          if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >1) || ((i?.usdt_token_value) >= 1) ){
              
            if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null)) {
              var tron_details = {};
              tron_details.hash = i.hash ? i.hash : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.methodName = i.methodName ? i.methodName : null;
              tron_details.comment = i.comment ? i.comment : null;
              tron_details.address_type = i.address_type ? i.address_type : null;
              tron_details.timestamp = i.timestamp ? i.timestamp : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? (i.energy_fee) * (i.amount_trx) : null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.amount = i.amount ? i.amount : null;
              tron_details.energy_fee = i.energy_fee ? i.energy_fee:null;
              tron_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              tron_details.toAddress = i.toAddress ? i.toAddress : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
              tron_details.tron_time = i.tron_time ? i.tron_time : null;
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
      //////////////////////////USDT /////////////////////
      try {
        let sql_res = `Select * FROM tron_transactions WHERE address_id =? and  (token_type) IN(?) and tron_time>= ${start_timestamp} and tron_time<= ${end_timestamp};`
        let resultdata_res = await execquery(sql_res, [address_id, token_typeusdt,start_timestamp,end_timestamp]);
        // console.log(resultdata_res);
        // console.log("token type", token_type)
        // if(token_type ==null){
        // let total_tron_filter =[];
        for (let i of resultdata_res) {
          if((i?.usdt_token_value) >= 1 ){
            
          if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null)) {
            var tron_details = {};
            tron_details.hash = i.hash ? i.hash : null;
            tron_details.tokenType = i.tokenType ? i.tokenType : null;
            tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
            tron_details.methodName = i.methodName ? i.methodName : null;
            tron_details.comment = i.comment ? i.comment : null;
            tron_details.address_type = i.address_type ? i.address_type : null;
            tron_details.timestamp = i.timestamp ? i.timestamp : null;
            tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
            tron_details.amount_trx = i.amount_trx ? (i.energy_fee) * (i.amount_trx) : null;
            tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
            tron_details.amount = i.amount ? i.amount : null;
            tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
            tron_details.energy_fee = i.energy_fee ? i.energy_fee:null;
            tron_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
            tron_details.toAddress = i.toAddress ? i.toAddress : null;
            tron_details.tron_time = i.tron_time ? i.tron_time : null;
            tron_details.token_type = i.token_type ? i.token_type : null;
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
      ////////////////////////////////////////////////////////////////
      //////////////////////////////////////
        res.send(total_tron_filter);

      }
      
      catch (error){
        console.log(error);
        res.send(error);
      }
    
    }

      ///////////////////////////////////////////////////////////////////////////

      /////////////////////////////////tokenusdt///////////////////////////////

      else if (token_typeusdt == 'USDT' && token_type == null && token_typeusd == null && start_timestamp!=null && end_timestamp!=null) {
        try {
          let total_tron_filter = [];
          let sql_res = `Select * FROM tron_transactions WHERE address_id =? and  (token_type) IN(?) and tron_time>= ${start_timestamp} and tron_time<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [address_id, token_typeusdt,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type", token_type)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            if(((i?.energy_fee) * (i?.amount_trx)>1) ||((i?.usdc_value) >1) || ((i?.usdt_token_value) > 1) ){

              if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null)) {
              var tron_details = {};
              tron_details.hash = i.hash ? i.hash : null;
              tron_details.tokenType = i.tokenType ? i.tokenType : null;
              tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              tron_details.methodName = i.methodName ? i.methodName : null;
              tron_details.comment = i.comment ? i.comment : null;
              tron_details.address_type = i.address_type ? i.address_type : null;
              tron_details.timestamp = i.timestamp ? i.timestamp : null;
              tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
              tron_details.amount_trx = i.amount_trx ? (i.energy_fee) * (i.amount_trx) : null;
              tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
              tron_details.amount = i.amount ? i.amount : null;
              tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
              tron_details.energy_fee = i.energy_fee ? i.energy_fee:null;
              tron_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              tron_details.toAddress = i.toAddress ? i.toAddress : null;
              tron_details.tron_time = i.tron_time ? i.tron_time : null;
              tron_details.token_type = i.token_type ? i.token_type : null;
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



      //////////////////////////////////////////////////////////////////////
      else if ((start_timestamp !=null) && (end_timestamp!=null) && (token_type == null) && (token_typeusd == null) && (token_typeusdt == null) && (address_id!=null)){
        // console.log("time will be in time check",end_timestamp)
          try {
            console.log("connection address timee",start_timestamp);
            let total_tron_filter = [];
            let sql_res_time = `Select * FROM tron_transactions WHERE address_id =? and tron_time>= ${start_timestamp} and tron_time<= ${end_timestamp};`
          let resultdata_res_time = await execquery(sql_res_time, [address_id, start_timestamp,end_timestamp]);
            // if(token_type ==null){
            // let total_tron_filter =[];
            for (let i of resultdata_res_time) {
              // let total_tron_filter = [];
            if(((i?.energy_fee) * (i?.amount_trx)>1) ||((i?.usdc_value) >1) || ((i?.usdt_token_value) > 1) ){

              if ((i?.tokenAbbr == 'trx') || (i?.tokenAbbr == null)) {
                var tron_details = {};
                tron_details.hash = i.hash ? i.hash : null;
                tron_details.tokenType = i.tokenType ? i.tokenType : null;
                tron_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                tron_details.methodName = i.methodName ? i.methodName : null;
                tron_details.comment = i.comment ? i.comment : null;
                tron_details.address_type = i.address_type ? i.address_type : null;
                tron_details.timestamp = i.timestamp ? i.timestamp : null;
                tron_details.usdt_token_value = i.usdt_token_value ? i.usdt_token_value : null;
                tron_details.amount_trx = i.amount_trx ? (i.energy_fee) * (i.amount_trx) : null;
                tron_details.usdc_value = i.usdc_value ? i.usdc_value : null;
                tron_details.amount = i.amount ? i.amount : null;
                tron_details.tron_time = i.tron_time ? i.tron_time : null;
                tron_details.amount_trx_data = i.amount_trx ? i.amount_trx:null;
                tron_details.energy_fee = i.energy_fee ? i.energy_fee:null;
                tron_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
                tron_details.toAddress = i.toAddress ? i.toAddress : null;
                tron_details.token_type = i.token_type ? i.token_type : null;
                tron_details.wallet_id= i.wallet_id ? i.wallet_id : null;
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
      connection.release();
    })
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}


// getquerty()
module.exports = get_tron_transaction_filter



