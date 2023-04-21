const axios = require('axios');
const db = require('../../pool-connection');
var util = require('util')


// let total_tron_filter =[];
let total_token_filter = []
const get_btc_transaction_filter = async (btc_address_id,start_timestamp,end_timestamp, res) => {
  console.log(btc_address_id);
  try {
    db.getConnection(async (err, connection) => {
      if (err) throw (err);
      const execquery = util.promisify(connection.query.bind(connection))
      // if(token_type == null){
        var config = {
          method: 'get',
          url: `https://blockchain.info/multiaddr?active=`+ btc_address_id + '&n=900',
          headers: {}
        };
        let result = await axios(config);
        var btcData = result.data
        var send_amount =[]
        var rcv_amount = [];
        let btc_last_time = (btcData.txs).slice(0)?.[0]?.time
        console.log("btc data",btc_last_time);
        let total_rec = btcData.addresses[0].total_received;
        let total_sent = btcData.addresses[0].total_sent;
        let final_balance = btcData.addresses[0].final_balance;
        let n_tx = btcData.addresses[0].n_tx;
        let sql_all_tr_btc = `Select * FROM btc_txc WHERE btc_address_id =?`;
        let resultdata_all_btc = await execquery(sql_all_tr_btc, [btc_address_id]);
        for (let k of resultdata_all_btc) {
          var usd_res= parseFloat(k?.usd_result);

          var btc_details_all = {};
          btc_details_all.hash_id = k.hash_id ? k.hash_id : null;
          btc_details_all.result = k.result ? (k.result)/100000000 : null;
          btc_details_all.usd_result = k.usd_result ? k.usd_result : null;

          if (k.result >=0){
            // rcv_amount += amttt * k?.energy_fee
            rcv_amount.push(usd_res)

          }
          else if (k.result < 0){
            send_amount.push(usd_res)
          }
        }

        console.log("total ",rcv_amount,send_amount)
        let sum_amt_rcv = rcv_amount.reduce((partialSum, b) => partialSum + b, 0);
        let sum_amt_send = send_amount.reduce((partialSum, a) => partialSum + a, 0);
        console.log("total sent",sum_amt_send)
        let sum_rcv = Math.abs(sum_amt_rcv)
        let sum_send = Math.abs(sum_amt_send)

        console.log("total rcv",sum_rcv,sum_send)


        const sqlSelect_btc = "Update btc_balance SET btc_last_time=?,total_received=?,total_sent=?,final_balance=?,transaction=? WHERE btc_address_id =?"
        let result_btc =await execquery(sqlSelect_btc,[btc_last_time,sum_rcv,sum_send,final_balance,n_tx,btc_address_id])       
        console.log("connection address",result_btc); 
      let total_btc_filter = [];
      if (start_timestamp !=null && end_timestamp !=null){        
        try {
          // console.log("connection address");
          let sql = `Select * FROM btc_txc WHERE btc_address_id =? and btc_time>= ${ start_timestamp } and btc_time<= ${ end_timestamp };`
          let resultdata = await execquery(sql, [btc_address_id, start_timestamp,end_timestamp]);
          // console.log(resultdata);
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata) {
                var btc_details = {};
                btc_details.hash_id = i.hash_id ? i.hash_id : null;
                btc_details.address_type = i.address_type ? i.address_type : null;
                btc_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                btc_details.usd_result = i.usd_result ? i.usd_result : null;
                btc_details.comment = i.comment ? i.comment : null;
                btc_details.usd_fee = i.usd_fee ? i.usd_fee : null;
                btc_details.time = i.time ? i.time : null;
                btc_details.fee = i.fee ? i.fee : null;
                btc_details.btc_time = i.btc_time ? i.btc_time : null;
                btc_details.result = i.result ? (i.result)/100000000 : null;
                btc_details. wallet_id= i.wallet_id ? i.wallet_id : null;
              total_btc_filter.push(btc_details);
  
            }
          res.send(total_btc_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      }
      /////////////////////time stamp ////////////////////

      else if (start_timestamp ==null && end_timestamp ==null){        
        try {
          // console.log("connection address");
          let sql = `Select * FROM btc_txc WHERE btc_address_id =?`
          let resultdata = await execquery(sql, [btc_address_id]);
          // console.log(resultdata);
          // if(token_type ==null){
          // let total_tron_filter =[];
          for (let i of resultdata) {
                var btc_details = {};
                btc_details.hash_id = i.hash_id ? i.hash_id : null;
                btc_details.address_type = i.address_type ? i.address_type : null;
                btc_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                btc_details.usd_result = i.usd_result ? i.usd_result : null;
                btc_details.comment = i.comment ? i.comment : null;
                btc_details.usd_fee = i.usd_fee ? i.usd_fee : null;
                btc_details.time = i.time ? i.time : null;
                btc_details.fee = i.fee ? i.fee : null;
                btc_details.btc_time = i.btc_time ? i.btc_time : null;
                btc_details.result = i.result ? (i.result)/100000000 : null;
                btc_details. wallet_id= i.wallet_id ? i.wallet_id : null;
              total_btc_filter.push(btc_details);
  
            }
          res.send(total_btc_filter);
        }
        catch (error) {
          console.log(error);
          res.send(error);
        }
      }

      ////////////////////////
      ///////////////////////////////////time stamp
    //   let sql_res_time = `Select * FROM tron_transactions WHERE address_id =? and timestamp>= ${start_timestamp} and timestamp<= ${end_timestamp};`
    //   let resultdata_res_time = await execquery(sql_res_time, [address_id, start_timestamp,end_timestamp]);
    //     // if(token_type ==null){
      ///////////////////////////////
     else if (start_timestamp !=null && end_timestamp!=null){
          try {
            let sql_res_time = `Select * FROM btc_txc WHERE btc_address_id =? and btc_time>= ${ start_timestamp } and btc_time<= ${ end_timestamp };`
          let resultdata_res_time = await execquery(sql_res_time, [btc_address_id, start_timestamp,end_timestamp]);
          // console.log("connection address else for time");
            // console.log("elseeeee",resultdata_res_time)
            // if(token_type ==null){
            // let total_tron_filter =[];
            for (let i of resultdata_res_time) {
            //   if ((i?.address_type == 'trx') || (i?.tokenAbbr == null)) {
                var btc_details = {};
                btc_details.hash_id = i.hash_id ? i.hash_id : null;
                btc_details.address_type = i.address_type ? i.address_type : null;
                btc_details.portfolio_id = i.portfolio_id ? i.portfolio_id : null;
                btc_details.usd_result = i.usd_result ? i.usd_result : null;
                btc_details.comment = i.comment ? i.comment : null;
                btc_details.usd_fee = i.usd_fee ? i.usd_fee : null;
                btc_details.time = i.time ? i.time : null;
                btc_details.btc_time = i.btc_time ? i.btc_time : null;
                btc_details.result = i.result ? (i.result)/100000000 : null;
                btc_details.fee = i.fee ? i.fee : null;
                btc_details. wallet_id= i.wallet_id ? i.wallet_id : null;
               
                // total_tron_filter.push(btc_details);
            //   }
              total_btc_filter.push(btc_details);
  
            }
            res.send(total_btc_filter);
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
module.exports = get_btc_transaction_filter



