const axios = require('axios');
const db = require('../../pool-connection');
var util = require('util')
var access_key = process.env.DEBANK_ACCESS_KEY;

let total_token_filter = []
const get_eth_transaction_filter = async (address_id,token_type,start_timestamp,end_timestamp,token_typeusd,token_typeusdt,res) => {
  console.log(address_id);
  let rcv_amount = 0;
  let send_amount = 0;
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      let assetidinuse = 'eth'
      var chainresult = await axios.get('https://pro-openapi.debank.com/v1/user/history_list?id=' + address_id + '&chain_id=' + assetidinuse, {
        headers: {
          'Accesskey': access_key,
          'accept': 'application/json',
        }
    });
    let eth_tran =0;
    // console.log("now chain list will be",chainresult);
    let last_eth_time = chainresult.data.history_list.slice(0)[0]?.time_at
    var date_cur = new Date().getTime();
    console.log(date_cur)
    let total_tron_filter_all = [];
    var amt_rcv = [];
    var amt_send = [];

    var amt_rcv_usdc =[];
    var amt_rcv_usdt = [];
    var amt_rcv_eth =[]
    var send_amt_eth = [];
    var amt_send_usdc= [];
    var amt_send_usdt = [];
    var total_eth ;
    var total_usdt;
    var total_usdc;


    let sql_all_tr = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =?`;
    let resultdata_all_tr = await execquery(sql_all_tr, [address_id]);
    let len_eth = resultdata_all_tr[0].length
    console.log("len of eth",resultdata_all_tr[0].token_type)
    for(let k of resultdata_all_tr){
      var amount_retur= parseFloat(k.amount_returned)
      var rcvusdt_all = parseFloat( k.usdt_eth ? k.usdt_eth : k.amount_returned);
      // var usdt_eth_value = parseFloat(k.usdt_eth)
      if ((k?.token_type == 'ETH') || (k?.token_type == 'USDC') || (k?.token_type == 'USDT') && (k?.other_wallet_address !=null)) {
        if( (k?.usdt_eth >=1 ) ||(k?.usdt_eth == null)){
        var eth_details_all = {};
        eth_details_all.transaction_id = k.transaction_id ? k.transaction_id : null;
        eth_details_all.amount_returned = k.amount_returned ? k.amount_returned :null;
        eth_details_all.usdt_eth = k.usdt_eth ? k.usdt_eth : null;
        eth_details_all.amount_returned = k.amount_returned ? k.amount_returned : null;

        var sennn = resultdata_all_tr
        let last_eth_time_check = resultdata_all_tr[0]?.transaction_time;
        console.log("eth time will be",last_eth_time_check) 
        var eth_tran_len = eth_tran + k;
        
        if (k?.send_data == "[]")
        {
          amt_rcv.push(rcvusdt_all)
          if(k?.token_type == "ETH"){
            amt_rcv_eth.push(rcvusdt_all)
          }
          else if (k?.token_type == "USDT"){
            amt_rcv_usdt.push(rcvusdt_all)
          }
          else if (k?.token_type == "USDC"){
            amt_rcv_usdc.push(rcvusdt_all)
          }
          // amt_send.push(amount_retur)
          // var sen = send_amount + eth_details_all.amount_returned
          
          // send_amount += resultdata_all_tr[k].amount_returned
  
      }
        else if (k?.recieve_data == "[]"){
          amt_send.push(rcvusdt_all)
          // amt_rcv.push(amount_retur)
          if(k?.token_type == "ETH"){
            send_amt_eth.push(rcvusdt_all)
          }
          else if (k?.token_type == "USDT"){
            amt_send_usdt.push(rcvusdt_all)
          }
          else if (k?.token_type == "USDC"){
            amt_send_usdc.push(rcvusdt_all)
          }
          // var rcv = rcv_amount+sennn[k].usdt_eth
         
          // rcv_amount += resultdata_all_tr[k].usdt_eth
      }
      else if (k?.recieve_data != "[]" && k?.send_data != "[]"){
        console.log("new",k?.token_type)
        amt_rcv.push(rcvusdt_all)
        if(k?.token_type == "USDC"){
          amt_rcv_usdc.push(rcvusdt_all)
        }
        else if (k?.token_type == "USDT"){
          amt_rcv_usdt.push(rcvusdt_all)

        }
        else if (k?.token_type == "ETH"){
          amt_rcv_eth.push(rcvusdt_all)
        }
        // amt_rcv.push(rcvusdt_all)
        // amt_rcv_usdt.push(rcvusdt_all)

      }
      total_tron_filter_all.push(eth_details_all);
        // console.log("send and rcv",sen)
        // console.log("rcv aom",rcv)
        // eth_tran += resultdata_all_tr.length
     
  }
}
  console.log("eth len",total_tron_filter_all.length)
  }
  let sum_amt_rcv = amt_rcv.reduce((partialSum, a) => partialSum + a, 0);
  let sum_amt_send = amt_send.reduce((partialSum, b) => partialSum + b, 0);

  let sum_rcv_eth = amt_rcv_eth.reduce((partialSum, c) => partialSum + c, 0);
  let sum_rcv_usdt = amt_rcv_usdt.reduce((partialSum, d) => partialSum + d, 0);
  let sum_rcv_usdc = amt_rcv_usdc.reduce((partialSum, e) => partialSum + e, 0);

  let sum_send_eth = send_amt_eth.reduce((partialSum, f) => partialSum + f, 0);
  let sum_send_usdt = amt_send_usdt.reduce((partialSum, g) => partialSum + g, 0);
  let sum_send_usdc = amt_send_usdc.reduce((partialSum, h) => partialSum + h, 0);

  var total_eth = amt_rcv_eth.length + send_amt_eth.length
  var total_usdt = amt_rcv_usdt.length + amt_send_usdt.length
  var total_usdc = amt_rcv_usdc.length + amt_send_usdc.length

  // let sum_amt_eth = 
  console.log("sum of amt rcv",sum_amt_rcv)
  console.log("sum of amt send",sum_amt_send)

  console.log("sum of amt rcv eth",sum_rcv_eth)
  console.log("sum of amt rcv usdt",sum_rcv_usdt)

  console.log("sum of amt rcv usdc",sum_rcv_usdc)
  console.log("sum of amt send eth",sum_send_eth)
  console.log("sum of amt send usdc",sum_send_usdc)
  console.log("sum of amt send usdt",sum_send_usdt)

  console.log("total count",total_eth,total_usdt,total_usdc)



//   const sqlSelect_eth = "Update pms_user_balance SET last_eth_time=?,recv_amount=?,send_amount=?,total_tran=? WHERE address_id =?"
//   let result_eth =await execquery(sqlSelect_eth,[last_eth_time,receives_amount_all,send_amount_all,eth_tran,address_id])       
//   console.log("connection address",result_eth);
// console.log("send and recive amount",receives_amount_all,send_amount_all)
    const sqlSelect_eth = "Update pms_user_balance SET last_eth_time=?,total_tran=?,recv_amount=?,send_amount=?,amt_rcv_eth=?,amt_rcv_usdc=?,amt_rcv_usdt=?,send_amt_eth=?,amt_send_usdc=?,amt_send_usdt=?,total_eth=?,total_usdt=?,total_usdc=? WHERE address_id =?"
    let result_eth =await execquery(sqlSelect_eth,[last_eth_time,total_tron_filter_all.length,sum_amt_rcv,sum_amt_send,sum_rcv_eth,sum_rcv_usdc,sum_rcv_usdt,sum_send_eth,sum_send_usdc,sum_send_usdt,total_eth,total_usdt,total_usdc,address_id])       
    console.log("connection address",result_eth);
    // console.log("send and recive amount",receives_amount_all,send_amount_all)
      // if(token_type == null){
      // let total_tron_filter = [];
      if ((token_type == null) && (token_typeusd ==null) && (token_typeusdt == null) && (start_timestamp != null) && (end_timestamp != null)) {
        // console.log("first if block")
        try {
          let total_tron_filter = [];
          // console.log("connection address");
          let sql = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =? and eth_time>= ${start_timestamp} and eth_time<= ${end_timestamp};`;
          // console.log("tron time",start_timestamp,end_timestamp)
          let resultdata = await execquery(sql, [address_id,start_timestamp,end_timestamp]);
          // console.log("ressss",resultdata);
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata) {
            // if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) ){
              if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
                // if (i?.amount_returned >=1) {
                if( (i?.usdt_eth >=1 ) ||(i?.usdt_eth == null) && (i?.other_wallet_address !=null)){
                var eth_details = {};
                eth_details.transaction_id = i.transaction_id ? i.transaction_id : null;
                eth_details.other_wallet_address = i.other_wallet_address ? i.other_wallet_address : null;
                eth_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                eth_details.asset_chain = i.asset_chain ? i.asset_chain : null;
                eth_details.comments = i.comments ? i.comments : null;
                eth_details.address_type = i.address_type ? i.address_type : null;
                eth_details.transaction_time = i.transaction_time ? i.transaction_time : null;
                eth_details.amount = i.amount ? i.amount : null;
                eth_details.cate_id = i.cate_id ? i.cate_id:null;
                eth_details.symbol = i.symbol ? i.symbol:null;
                eth_details.address_id = i.address_id ? i.address_id:null;
                eth_details.usdt_eth = i.usdt_eth ? i.usdt_eth : null;
                eth_details.eth_fee = i.eth_fee ? i.eth_fee : null;
                eth_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
                eth_details.send_data = i.send_data ? i.send_data : null;
                eth_details.recieve_data = i.recieve_data ? i.recieve_data : null;
                eth_details.token_type = i.token_type ? i.token_type : null;
                eth_details.eth_time = i.eth_time ? i.eth_time : null;
                eth_details.gas_fee = i.gas_fee ? i.gas_fee : null;
                eth_details.amount_returned = i.amount_returned ? i.amount_returned : null;
                total_tron_filter.push(eth_details);
                // }
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
          let sql = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =?`;
          // console.log("tron time",start_timestamp,end_timestamp)
          let resultdata = await execquery(sql, [address_id]);
          // console.log("ressss",resultdata);
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata) {
            // if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) ){
              if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
                if ((i.usdt_eth == null) || (i?.usdt_eth >=1) && (i?.other_wallet_address !=null)){
                var eth_details = {};
                eth_details.transaction_id = i.transaction_id ? i.transaction_id : null;
                eth_details.other_wallet_address = i.other_wallet_address ? i.other_wallet_address : null;
                eth_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                eth_details.asset_chain = i.asset_chain ? i.asset_chain : null;
                eth_details.comments = i.comments ? i.comments : null;
                eth_details.address_type = i.address_type ? i.address_type : null;
                eth_details.transaction_time = i.transaction_time ? i.transaction_time : null;
                eth_details.amount = i.amount ? i.amount : null;
                eth_details.cate_id = i.cate_id ? i.cate_id:null;
                eth_details.symbol = i.symbol ? i.symbol:null;
                eth_details.address_id = i.address_id ? i.address_id:null;
                eth_details.usdt_eth = i.usdt_eth ? i.usdt_eth : null;
                eth_details.eth_fee = i.eth_fee ? i.eth_fee : null;
                eth_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
                eth_details.send_data = i.send_data ? i.send_data : null;
                eth_details.recieve_data = i.recieve_data ? i.recieve_data : null;
                eth_details.token_type = i.token_type ? i.token_type : null;
                eth_details.eth_time = i.eth_time ? i.eth_time : null;
                eth_details.gas_fee = i.gas_fee ? i.gas_fee : null;
                eth_details.amount_returned = i.amount_returned ? i.amount_returned : null;
                total_tron_filter.push(eth_details);  
                }
            }
          // }
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
      else if (token_type == 'ETH' && token_typeusd == null && token_typeusdt == null && start_timestamp!=null && end_timestamp!=null) {
        try {
          let total_tron_filter = [];
          let sql_res = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =? and  (token_type) IN(?) and eth_time>= ${start_timestamp} and eth_time<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [address_id, token_type,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type trx", token_type)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            // if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) ){
              if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
                if ((i.usdt_eth == null) || (i?.usdt_eth >=1) && (i?.other_wallet_address !=null)){
                var eth_details = {};
                eth_details.transaction_id = i.transaction_id ? i.transaction_id : null;
                eth_details.other_wallet_address = i.other_wallet_address ? i.other_wallet_address : null;
                eth_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                eth_details.asset_chain = i.asset_chain ? i.asset_chain : null;
                eth_details.comments = i.comments ? i.comments : null;
                eth_details.address_type = i.address_type ? i.address_type : null;
                eth_details.transaction_time = i.transaction_time ? i.transaction_time : null;
                eth_details.amount = i.amount ? i.amount : null;
                eth_details.cate_id = i.cate_id ? i.cate_id:null;
                eth_details.symbol = i.symbol ? i.symbol:null;
                eth_details.address_id = i.address_id ? i.address_id:null;
                eth_details.usdt_eth = i.usdt_eth ? i.usdt_eth : null;
                eth_details.eth_fee = i.eth_fee ? i.eth_fee : null;
                eth_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
                eth_details.send_data = i.send_data ? i.send_data : null;
                eth_details.recieve_data = i.recieve_data ? i.recieve_data : null;
                eth_details.token_type = i.token_type ? i.token_type : null;
                eth_details.eth_time = i.eth_time ? i.eth_time : null;
                eth_details.gas_fee = i.gas_fee ? i.gas_fee : null;
                eth_details.amount_returned = i.amount_returned ? i.amount_returned : null;
                total_tron_filter.push(eth_details);
                // }
  
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

      else if (token_typeusd == 'USDC' && token_type == null && token_typeusdt == null && start_timestamp!=null && end_timestamp!=null) {
        // if (token_typeusd == 'USDC' && start_timestamp!=null && end_timestamp!=null){
        // try{
        //   let total_tron_filter = [];
        try {
          let total_tron_filter = [];
          let sql_res = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =? and  (token_type) IN(?) and eth_time>= ${start_timestamp} and eth_time<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [address_id, token_typeusd,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type usdc", token_typeusd)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            // if( (i?.usdc_value) >=1 ){
              if ((i?.token_type === 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
                if ((i.usdt_eth == null) || (i?.usdt_eth >=1) && (i?.other_wallet_address !=null)){
                var eth_details = {};
                eth_details.transaction_id = i.transaction_id ? i.transaction_id : null;
                eth_details.other_wallet_address = i.other_wallet_address ? i.other_wallet_address : null;
                eth_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                eth_details.asset_chain = i.asset_chain ? i.asset_chain : null;
                eth_details.comments = i.comments ? i.comments : null;
                eth_details.address_type = i.address_type ? i.address_type : null;
                eth_details.transaction_time = i.transaction_time ? i.transaction_time : null;
                eth_details.amount = i.amount ? i.amount : null;
                eth_details.cate_id = i.cate_id ? i.cate_id:null;
                eth_details.symbol = i.symbol ? i.symbol:null;
                eth_details.address_id = i.address_id ? i.address_id:null;
                eth_details.usdt_eth = i.usdt_eth ? i.usdt_eth : null;
                eth_details.eth_fee = i.eth_fee ? i.eth_fee : null;
                eth_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
                eth_details.send_data = i.send_data ? i.send_data : null;
                eth_details.recieve_data = i.recieve_data ? i.recieve_data : null;
                eth_details.token_type = i.token_type ? i.token_type : null;
                eth_details.eth_time = i.eth_time ? i.eth_time : null;
                eth_details.gas_fee = i.gas_fee ? i.gas_fee : null;
                eth_details.amount_returned = i.amount_returned ? i.amount_returned : null;
                total_tron_filter.push(eth_details);  
            // }
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
      else if ((token_type =='ETH' || token_typeusd =='USDC' || token_typeusdt == 'USDT') && (start_timestamp!=null && end_timestamp!=null)){
        // console.log("trx and usdc",token_type,token_typeusd);
      // else if (token_type != null) {
        try{
          let total_tron_filter = [];

        try {
          // let total_tron_filter = [];
          let sql_res = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =? and  (token_type) IN(?) and eth_time>= ${start_timestamp} and eth_time<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [address_id, token_type,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type which will be", token_type,token_typeusd)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            // if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >=1) || ((i?.usdt_token_value) >= 1) ){

            if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
              if ((i.usdt_eth == null) || (i?.usdt_eth >=1) && (i?.other_wallet_address !=null)){
              var eth_details = {};
                eth_details.transaction_id = i.transaction_id ? i.transaction_id : null;
                eth_details.other_wallet_address = i.other_wallet_address ? i.other_wallet_address : null;
                eth_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                eth_details.asset_chain = i.asset_chain ? i.asset_chain : null;
                eth_details.comments = i.comments ? i.comments : null;
                eth_details.address_type = i.address_type ? i.address_type : null;
                eth_details.transaction_time = i.transaction_time ? i.transaction_time : null;
                eth_details.amount = i.amount ? i.amount : null;
                eth_details.cate_id = i.cate_id ? i.cate_id:null;
                eth_details.symbol = i.symbol ? i.symbol:null;
                eth_details.address_id = i.address_id ? i.address_id:null;
                eth_details.usdt_eth = i.usdt_eth ? i.usdt_eth : null;
                eth_details.eth_fee = i.eth_fee ? i.eth_fee : null;
                eth_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
                eth_details.send_data = i.send_data ? i.send_data : null;
                eth_details.recieve_data = i.recieve_data ? i.recieve_data : null;
                eth_details.token_type = i.token_type ? i.token_type : null;
                eth_details.eth_time = i.eth_time ? i.eth_time : null;
                eth_details.gas_fee = i.gas_fee ? i.gas_fee : null;
                eth_details.amount_returned = i.amount_returned ? i.amount_returned : null;
                total_tron_filter.push(eth_details);  
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
          let sql_res = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =? and  (token_type) IN(?) and eth_time>= ${start_timestamp} and eth_time<= ${end_timestamp};`
          let resultdata_res = await execquery(sql_res, [address_id, token_typeusd,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type", token_typeusd)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
          // if(((i?.energy_fee) * (i?.amount_trx)>=1) ||((i?.usdc_value) >1) || ((i?.usdt_token_value) >= 1) ){
              
          if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
            if ((i.usdt_eth == null) || (i?.usdt_eth >=1) && (i?.other_wallet_address !=null)){
            var eth_details = {};
              eth_details.transaction_id = i.transaction_id ? i.transaction_id : null;
              eth_details.other_wallet_address = i.other_wallet_address ? i.other_wallet_address : null;
              eth_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              eth_details.asset_chain = i.asset_chain ? i.asset_chain : null;
              eth_details.comments = i.comments ? i.comments : null;
              eth_details.address_type = i.address_type ? i.address_type : null;
              eth_details.transaction_time = i.transaction_time ? i.transaction_time : null;
              eth_details.amount = i.amount ? i.amount : null;
              eth_details.cate_id = i.cate_id ? i.cate_id:null;
              eth_details.symbol = i.symbol ? i.symbol:null;
              eth_details.address_id = i.address_id ? i.address_id:null;
              eth_details.usdt_eth = i.usdt_eth ? i.usdt_eth : null;
              eth_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              eth_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              eth_details.send_data = i.send_data ? i.send_data : null;
              eth_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              eth_details.token_type = i.token_type ? i.token_type : null;
              eth_details.eth_time = i.eth_time ? i.eth_time : null;
              eth_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              eth_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              total_tron_filter.push(eth_details);
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
        let sql_res = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =? and  (token_type) IN(?) and eth_time>= ${start_timestamp} and eth_time<= ${end_timestamp};`
        let resultdata_res = await execquery(sql_res, [address_id, token_typeusdt,start_timestamp,end_timestamp]);
        // console.log(resultdata_res);
        // console.log("token type", token_type)
        // if(token_type ==null){
        // let total_tron_filter =[];
        for (let i of resultdata_res) {
          // if((i?.usdt_token_value) >= 1 ){
            
          if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
            if ((i.usdt_eth == null) || (i?.usdt_eth >=1) && (i?.other_wallet_address !=null)){
            var eth_details = {};
              eth_details.transaction_id = i.transaction_id ? i.transaction_id : null;
              eth_details.other_wallet_address = i.other_wallet_address ? i.other_wallet_address : null;
              eth_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              eth_details.asset_chain = i.asset_chain ? i.asset_chain : null;
              eth_details.comments = i.comments ? i.comments : null;
              eth_details.address_type = i.address_type ? i.address_type : null;
              eth_details.transaction_time = i.transaction_time ? i.transaction_time : null;
              eth_details.amount = i.amount ? i.amount : null;
              eth_details.cate_id = i.cate_id ? i.cate_id:null;
              eth_details.symbol = i.symbol ? i.symbol:null;
              eth_details.address_id = i.address_id ? i.address_id:null;
              eth_details.usdt_eth = i.usdt_eth ? i.usdt_eth : null;
              eth_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              eth_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              eth_details.send_data = i.send_data ? i.send_data : null;
              eth_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              eth_details.token_type = i.token_type ? i.token_type : null;
              eth_details.eth_time = i.eth_time ? i.eth_time : null;
              eth_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              eth_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              total_tron_filter.push(eth_details);
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
          let sql_res = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =? and  (token_type) IN(?) and eth_time>= ${start_timestamp} and eth_time<= ${end_timestamp};`;
          let resultdata_res = await execquery(sql_res, [address_id, token_typeusdt,start_timestamp,end_timestamp]);
          // console.log(resultdata_res);
          // console.log("token type", token_type)
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata_res) {
            // if(((i?.energy_fee) * (i?.amount_trx)>1) ||((i?.usdc_value) >1) || ((i?.usdt_token_value) > 1) ){

            if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
              if ((i.usdt_eth == null) || (i?.usdt_eth >=1) && (i?.other_wallet_address !=null)){

              var eth_details = {};
                eth_details.transaction_id = i.transaction_id ? i.transaction_id : null;
                eth_details.other_wallet_address = i.other_wallet_address ? i.other_wallet_address : null;
                eth_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                eth_details.asset_chain = i.asset_chain ? i.asset_chain : null;
                eth_details.comments = i.comments ? i.comments : null;
                eth_details.address_type = i.address_type ? i.address_type : null;
                eth_details.transaction_time = i.transaction_time ? i.transaction_time : null;
                eth_details.amount = i.amount ? i.amount : null;
                eth_details.cate_id = i.cate_id ? i.cate_id:null;
                eth_details.symbol = i.symbol ? i.symbol:null;
                eth_details.address_id = i.address_id ? i.address_id:null;
                eth_details.usdt_eth = i.usdt_eth ? i.usdt_eth : null;
                eth_details.eth_fee = i.eth_fee ? i.eth_fee : null;
                eth_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
                eth_details.send_data = i.send_data ? i.send_data : null;
                eth_details.recieve_data = i.recieve_data ? i.recieve_data : null;
                eth_details.token_type = i.token_type ? i.token_type : null;
                eth_details.eth_time = i.eth_time ? i.eth_time : null;
                eth_details.gas_fee = i.gas_fee ? i.gas_fee : null;
                eth_details.amount_returned = i.amount_returned ? i.amount_returned : null;
                total_tron_filter.push(eth_details);  
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
            // console.log("connection address timee",start_timestamp);
            let total_tron_filter = [];
            let sql_res_time = `Select * FROM pms_wallet_transaction_history_list WHERE address_id =? and eth_time>= ${start_timestamp} and eth_time<= ${end_timestamp};`
          let resultdata_res_time = await execquery(sql_res_time, [address_id, start_timestamp,end_timestamp]);
            // if(token_type ==null){
            // let total_tron_filter =[];
            for (let i of resultdata_res_time) {
              // let total_tron_filter = [];
            // if(((i?.energy_fee) * (i?.amount_trx)>1) ||((i?.usdc_value) >1) || ((i?.usdt_token_value) > 1) ){

            if ((i?.token_type == 'ETH') || (i?.token_type == 'USDC') || (i?.token_type == 'USDT')) {
              if ((i.usdt_eth == null) || (i?.usdt_eth >=1) && (i?.other_wallet_address !=null)){

              var eth_details = {};
              eth_details.transaction_id = i.transaction_id ? i.transaction_id : null;
              eth_details.other_wallet_address = i.other_wallet_address ? i.other_wallet_address : null;
              eth_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
              eth_details.asset_chain = i.asset_chain ? i.asset_chain : null;
              eth_details.comments = i.comments ? i.comments : null;
              eth_details.address_type = i.address_type ? i.address_type : null;
              eth_details.transaction_time = i.transaction_time ? i.transaction_time : null;
              eth_details.amount = i.amount ? i.amount : null;
              eth_details.cate_id = i.cate_id ? i.cate_id:null;
              eth_details.symbol = i.symbol ? i.symbol:null;
              eth_details.address_id = i.address_id ? i.address_id:null;
              eth_details.usdt_eth = i.usdt_eth ? i.usdt_eth : null;
              eth_details.eth_fee = i.eth_fee ? i.eth_fee : null;
              eth_details.ownerAddress = i.ownerAddress ? i.ownerAddress : null;
              eth_details.send_data = i.send_data ? i.send_data : null;
              eth_details.recieve_data = i.recieve_data ? i.recieve_data : null;
              eth_details.token_type = i.token_type ? i.token_type : null;
              eth_details.eth_time = i.eth_time ? i.eth_time : null;
              eth_details.gas_fee = i.gas_fee ? i.gas_fee : null;
              eth_details.amount_returned = i.amount_returned ? i.amount_returned : null;
              total_tron_filter.push(eth_details);

              }
            }
            // console.log("token details for tron time",total_tron_filter)
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
module.exports = get_eth_transaction_filter



