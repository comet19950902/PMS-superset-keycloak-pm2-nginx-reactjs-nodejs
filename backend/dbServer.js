require('dotenv').config()
// var util = require('util')
const axios = require('axios');
var qs = require('qs');
const express = require('express');
// const { v4: uuidv4 } = require('uuid')
const jwt_decode = require('jwt-decode');
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
// const mysql = require('mysql');
const mysql = require('mysql2');
const get_login_detail = require('./routes/keycloak_login/login')
// const dataR = require('./routes/keycloak_login/login')
const create_wallet = require('./routes/pms_create_portfolio/pms_create_wallet/pms_create_wallet')
// const simple_protocols_of_chain = require('./debank_wallet_simple_protocol_list')
// const binance_data= require('./binance_get_symbols')
// var addAddress = require('./routes/pms_address/add_address/add-address');
var user_balance = require('./routes/pms_address/update_address_data/pms_user_balance')
// var change_price = require('./routes/pms_address/pms_address_chainlist/debank_change_price')
// var get_wallet_transaction_history = require('./routes/pms_address/pms_address_transaction/debank_wallet_user_history_list')
var add_investments = require('./routes/investments/add_new_investment/pms_add_investment') 
var get_simple_protocol_list = require('./routes/pms_address/pms_address_simple_protocol/get_wallet_simple_protocols')
// var get_token_list = require('./routes/pms_address/pms_address_tokens/pms_get_token');
var create_person = require('./routes/pms_create_portfolio/pms_portfolio_users/pms_create_person/pms_admin_create_person.js');
var create_organisation = require('./routes/pms_create_portfolio/pms_portfolio_users/pms_create_organisations/pms_admin_create_organisation');
var create_party_portfolio = require('./routes/pms_create_portfolio/pms_portfolio_users/pms_link_users_to_portfolio/pms_admin_create_party_portfolio');
var create_portfolio = require('./routes/pms_create_portfolio/pms_create_portfoilio');
var change_portfolio_name = require('./routes/pms_create_portfolio/pms_update_portfolio/pms_rename_portfolio')
var modify_portfolio = require('./routes/pms_create_portfolio/pms_update_portfolio/pms_modify_portfolio');
var pms_delete_addressData = require('./routes/delete/delete_address/pms_delete_address');
var delete_portfolio_data = require('./routes/delete/delete_portfolio/pms_delete_portfolio');
var delete_user_from_portfolio = require('./routes/delete/delete_user_from_portfolio/delete_user_from_portfolio');
var pms_add_exchanges = require('./exchanges/debank_exchange_balance');
var delete_wallet = require('./routes/delete/delete_wallet/pms_delete_wallet');
var get_allpf_users = require('./routes/get_portfolio_detail/get_portolio_users_and_data/pms_get_all_portfolio_user');
var get_all_portfolio_details = require('./routes/get_portfolio_detail/pms_getportfolio_details');
var pms_update_investment = require('./routes/investments/investment_update_data/pms_update_investment');
var get_investment_logs = require('./routes/investments/investment_logs_data/get_investment_update_logs')
var get_address_daily_snapshot = require('./routes/pms_address/address_daily_snapshot_balance/get_daliy_snapshot_balance')
var investment_comments = require('./routes/investments/investment_add_comments/investment_comments')
var pms_delete_investment = require('./routes/delete/delete_investment/pms_delete_investment')
var pms_delete_exchange = require('./routes/delete/delete_exchange/pms_delete_exchange')
var get_portfolio_wallets_address = require('./routes/get_portfolio_detail/get_wallet_list_of_portfolio/pms_getAllPortfolioOfWallet')
var pms_validate_address = require('./routes/pms_address/validate_address/pms_validate_address')
var pms_superset_login = require('./routes/apache_superset/superset_login')
var pms_fetch_address_transaction = require('./routes/pms_address/pms_address_transaction/debank_wallet_user_history_list')
var get_history_of_investment = require('./routes/investments/get_history_of_investment/get_history_of_investment')
var update_transaction_data = require('./routes/pms_address/pms_address_transaction_history_audit/address_transaction_audit_list');
var addnewaddress1 = require('./routes/pms_address/add_address/add_address_new');
var get_address_transaction_audit = require('./routes/pms_address/pms_address_transaction_history_audit/pms_get_address_txn_audit_history');
var rename_wallet = require('./routes/pms_create_portfolio/pms_create_wallet/pms_rename_wallet');
var create_exchange_audit_logs = require('./routes/exchanges/exchange_audit_logs/create_exchange_audit_logs')
var get_all_portfolio_exchange = require('./routes/exchanges/get_all_exchange_of_portfolio')
var refreshallData = require('./routes/pms_address/add_address/refresh_address')
app.use(express.urlencoded());
// var get_history_list = require ('./routes/pms_address/pms_address_transaction/debank_wallet_user_history_list');
var delete_address = require ('./routes/accountant_list/delete_address');
// var fetch_address = require ('./routes/debank_wallet_balance/fetch_wallet_balance');
var refreshWalletHistory = require('./routes/pms_wallets/refreshwallet_history');
var update_status = require('./routes/pms_accountancy/update_status');
var update_payment = require ('./routes/payment/update_payment');
var delete_payment = require ('./routes/payment/delete_payment');
var  accountancy_ledger = require ('./routes/accountancy_ledger/get_ledger');
var get_load_history_list = require ('./routes/debank_wallet_balance/load_debank_all_data');
var get_Protocols_OnChain = require ('./routes/protocolchain/wallet_chain');
var get_all_tokens = require('./routes/protocolchain/gealltokens');
var pms_balance = require ('./routes/pms_balance/create_balance');
var get_pms_balance = require ('./routes/pms_balance/get_balance');
app.use(express.json())
app.use(bodyParser.json());
app.use(cors({origin:'*',credentials:true}))
app.use(bodyParser.urlencoded({ extended: true }));
var update_status_investment = require('./routes/delete/delete_investment/update_investment');
var update_share = require('./routes/pms_accountancy/edit_ledgre');



var get_simple_protocol_exchange = require ('./routes/new_exchange_data/create_exchange')
// var get_change_Wallet_asset_protocol = require ('./crone_jobs_daily/pms_daily_snapshot_address/pms_address_detail_daily_snapshot')

var grant_type=  process.env.GRANT_TYPE;
var client_id =  process.env.CLIENT_ID;
var client_secret=  process.env.CLIENT_SECRET;
var keycloak_url = process.env.KEYCLOAK_URL;
const  root_url = process.env.API_ROOT_URL;   /// root url api-v1 present in env---

const db = require('./pool-connection') 
var util = require('util');
const update_person = require('./routes/pms_create_portfolio/pms_portfolio_users/pms_create_person/pms_update_person');
const update_organisation = require('./routes/pms_create_portfolio/pms_portfolio_users/pms_create_organisations/pms_update_organisation');
const get_all_persons = require('./routes/get_portfolio_detail/get_persons_list/pms_get_all_person');
const get_all_organisation = require('./routes/get_portfolio_detail/get_organisation_list/get_organisation_list');
const add_exchange_history = require('./routes/exchanges/exchanges_history');
const { logFilePath, root } = require('forever');
const get_exchange_history = require('./routes/exchanges/get_exchange_history');
const get_exchange_history_logs = require('./routes/exchanges/exchange_audit_logs/get_all_exchange_history_audits');
const execquery = util.promisify(db.query.bind(db))
const keycloak_superset_login = require('./routes/keycloak_superset_login/keycloak_superset_login');
const add_user_data = require('./routes/keycloak_superset_login/add_user');
const add_porfolio_manager = require('./routes/get_portfolio_detail/portfolio_managers/add_portfolio_manager/add_portfolio_manager');
const get_manager_portfolios = require('./routes/get_portfolio_detail/portfolio_managers/get_portffolio_by_managers/get_manager_portfolios');
const get_accountant_list = require('./routes/accountant_list/all_accountant_list');
const get_all_portfolios_accountant = require('./routes/get_portfolio_detail/portfolio_managers/all_accountant_portfolio');
const delete_manager_portfolios  = require('./routes/get_portfolio_detail/portfolio_managers/get_portffolio_by_managers/delete_accountant_linked_to_portfolio/delete_accountant_portfolio');
const tron_balance = require('./routes/tron_api/tron_getBalance/get_tronBalance');
const check_tron = require ('./routes/tron_api/tron_getBalance/chek_tron')
const check_btc = require ('./routes/btc_balance/check_btc')

const get_tron_address_data = require('./routes/tron_api/tron_getBalance/get_tron_address_detail');
const tron_transaction = require('./routes/tron_api/tron_getBalance/tron_transaction')
const all_trondata_transaction = require('./routes/tron_api/tron_getBalance/all_transaction_tron')

const tron_add_chain = require('./routes/tron_api/tron_getBalance/get_tron_address_chain')
const get_tron_balance_wallet = require('./routes/tron_api/tron_getBalance/get_tron_balance_wallet_id')
const delete_tron_address = require('./routes/tron_api/tron_getBalance/delete_tron_address')
const get_tron_transaction = require('./routes/tron_api/tron_getBalance/get_tron_transaction');
const debank_transaction_history = require('./routes/pms_address/debank_transaction_history/debank_transasction_history');
var elliptic = require('./routes/elliptic_report/elliptic');
var get_elliptic = require('./routes/elliptic_report/get_elliptic');
var pms_accountancy = require('./routes/pms_accountancy/accountancy');
var accountancy = require('./routes/pms_accountancy/acc');
var update_acc = require ('./routes/pms_accountancy/update_acc');

var pms_get_accountancy = require('./routes/pms_accountancy/get_accountancy');
var get_wallets = require('./routes/pms_wallets/get_wallets');
var get_all_wallets_of_user = require( './routes/pms_wallets/get_all_wallets_user');
var fetch_wallets_balance = require('./routes/debank_wallet_balance/fetch_wallet_balance');
var get_investment = require('./routes/get_all_investment/get_investment');
var get_exchange = require ('./routes/exchanges/get_exchnage');
var get_all_portfolio = require ('./routes/pms_create_portfolio/get_all_portfolio');
var get_party_port_of_portfolio = require('./routes/partyportfolio/getpartyportfolio');
var get_all_portfolio_party = require ('./routes/partyportfolio/get_party_port_by_partid');
var get_all_user = require ('./routes/get_users/get_user_by_id');
var get_wallet_of_portfolio = require ('./routes/pms_wallets/get_wallets_portfolio');
var get_address_portfolio = require ('./routes/pms_address/get_address_portfofolio');
var update_tron_transactions_comment = require ('./routes/tron_api/tron_getBalance/update_tron_comment');
var get_all_address_of_wallet = require('./routes/pms_wallets/get_all_address_wallet');
var share_holder = require('./routes/pms_share_holder/create_share_holder');
var get_share_holder = require('./routes/pms_share_holder/get_share_holder');
var fetch_tron_transaction = require ('./routes/tron_api/tron_getBalance/refresh_tron_data');
var create_tron_audit_history_list = require('./routes/tron_api/tron_getBalance/tron_transaction_audit_logs');
var get_tron_audit_history_list = require ('./routes/tron_api/tron_getBalance/get_tron_transaction_logs');
var btc_balance = require('./routes/btc_balance/btc_balance_create_api');
var btc_balance_data = require('./routes/btc_balance/get_btc_all_data');
var delete_btc_address = require('./routes/btc_balance/delete_btc_data');
var update_accountancy = require('./routes/pms_accountancy/update_accountancy');
var btc_txc = require ('./routes/btc_balance/btc_trx');
var refrefresh_user = require ('./routes/pms_address/add_address/refresh_user')
var delete_accountancy = require ('./routes/pms_accountancy/delete_accountancy');
var delete_all_accountancy = require('./routes/pms_accountancy/delete_all');
var delete_shareholder = require('./routes/pms_share_holder/delete_share_holder');
var update_all_accountancy = require('./routes/pms_accountancy/update_all');
var create_entity = require('./routes/accountancy_entity/create_entity');
var get_entity = require('./routes/accountancy_entity/get_entity');
var update_entity = require ('./routes/accountancy_entity/update_entity');
var update_shareholder = require ('./routes/pms_accountancy/update_shareholder');
var delete_entity = require('./routes/accountancy_entity/delete_entity');
var create_payment = require ('./routes/payment/create_payment');
var get_payment = require('./routes/payment/get_payment');
var update_payment = require('./routes/payment/update_payment');
var update_all = require ('./routes/pms_accountancy/update_all');
var upload_excel = require ('./routes/pms_accountancy/update_excel');
var payment_logs =  require('./routes/payment/payment_logs');
var create_ledger =  require('./routes/accountancy_ledger/create_ledger');
var get_payment_logs = require ('./routes/payment/get_payment_logs');
var transaction_history = require ('./routes/tron_api/tron_getBalance/refresh_tron_data');
var btc_trx = require ('./routes/btc_balance/create_trx');
var get_btc_transaction_filter = require ('./routes/btc_balance/all_btc_trx');
var load_btc_trx = require ('./routes/btc_balance/load_more_btc');
var  create_btc_transactions_comment= require ('./routes/btc_balance/create_comment');
const get_btc_transaction = require('./routes/btc_balance/get_btc_trx');
var create_btc_audit_logs = require('./routes/btc_balance/btc_audit_logs');
const get_btc_audit_logs = require('./routes/btc_balance/get_btc_audit_logs');
const all_share_holder = require ('./routes/pms_share_holder/create_all_share_holder');
const get_all_share_holder = require ('./routes/pms_share_holder/get_all_share_holder');
const delete_all_share_holder = require('./routes/pms_share_holder/delete_all_share_holder');
const get_all_transaction_data = require('./routes/btc_balance/get_all_transaction');
const create_transactions_comment_for_all = require('./routes/btc_balance/all_tran_comment');
const load_tron_transaction = require ('./routes/tron_api/tron_getBalance/load_tron_tran');
const get_all_port_wallet_address =  require ('./routes/pms_wallets/get_all_address_of_wallet');
const get_ledgre = require('./routes/accountancy_entity/get_ledgre');
const get_chain_list = require ('./routes/protocolchain/getchainlist');
const refresh_tron_transaction = require ('./routes/tron_api/tron_getBalance/refresh_tron_transaction');

const get_refresh_history_list = require ('./routes/debank_wallet_balance/refresh_eth_tran');
var delete_pms_balance = require ('./routes/pms_balance/delete_balance');
var get_tron_transaction_filter = require ('./routes/tron_api/tron_getBalance/all_tran_data');
var get_eth_transaction_filter = require ('./routes/debank_wallet_balance/get_debakn_filter');
var get_all_transaction_filter = require ('./routes/btc_balance/all_table_transaction');
var update_exchange = require ('./routes/exchanges/update_exchange');
var refresh_btc_transaction = require ('./routes/btc_balance/btc_refresh_transaction');
var get_refresh_data_all = require ('./routes/btc_balance/all_refresh_api');
var update_payment_satus = require ('./routes/payment/update_satus');
var updateshare_holder_name = require ('./routes/pms_share_holder/edit_share_holder')


var new_get_investment = require ('./routes/get_all_investment/get_new_investment')
// LOGIN API-------------------------------------------------------------
app.post(root_url+'/debank_login',(req,res) =>{
  var user_response={};
  let otp_value = req.body.totp ? req.body.totp : null;
  let user_name_value = req.body.username ? req.body.username : null;
  let user_password = req.body.password ? req.body.password : null;
  console.log(otp_value); 
  console.log(user_name_value);
  console.log(user_password);
  if(otp_value != null && user_name_value!=null && user_password!=null){
    let body={
        'grant_type': grant_type,
        'client_id' : client_id,
        'username' :req.body.username,
        'client_secret': client_secret,
        'password' :req.body.password,
        'totp': req.body.totp
      }
      var data = qs.stringify(body)
      var config = {
          method: 'post',
          url: keycloak_url,
          headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          data : data
        };
      axios(config).then(function (response){
      user_response=response.data
      let accessToken =user_response["access_token"];
      decoded = jwt_decode(accessToken,{payload: true, headers:true});
      let access_role =decoded.resource_access;
      user_role =JSON.stringify(access_role['nodejs-microservice'].roles[0])
      console.log(user_role);
        get_login_detail(user_response,user_role)
        // console.log(decoded)      
        res.json(decoded)
      }).catch(
      function (error) {
          console.log('Show error notification!');
        res.send(error)
      })
  }
  else{
    res.send("User Credential Missing")
  }
}) //end of db.getConnection()

app.get(root_url, function(req, res){
   res.send("Server is up!");
});


app.post(root_url+"/keycloak_superset_login",  async(req,res) =>{
  let redirect_uri = req.body.redirect_uri ? req.body.redirect_uri :null;
  let grant_type = req.body.grant_type ? req.body.grant_type : null;
  let code = req.body.code ? req.body.code : null;
  try {
    if(redirect_uri!=null || grant_type!=null || code!=null){
       await keycloak_superset_login(redirect_uri,grant_type,code,res);
    }
   else{
      res.send("There are empty fields.");
   }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

// ----------------------------------------------LOGOUT KEYCLOAK------------------------------------
app.post(root_url+"/keycloak_logout", async(req,res)=>{
  let access_token = req.body.access_token ? req.body.access_token : null;
  let refresh_token = req.body.refresh_token ? req.body.refresh_token : null;
  try {
    if(access_token!= null || refresh_token!=null)
    {
      await logout_keycloak_user(access_token, refresh_token, res)
    }
  } catch (error) {
    res.send(error)
  }
})

// -------------------------------Add   User-----------------------------------------------
app.post(root_url+"/add_keycloak_user", async(req,res) =>{
    const userID = req.body.user_id ? req.body.user_id : null;
    const preferred_username = req.body.username ? req.body.username : null;
    const email = req.body.email ? req.body.email : null;
    const user_role = req.body.user_role ? req.body.user_role : null;
    console.log(userID);
    if(userID != null|| preferred_username != null || email != null || user_role != null){
      try {
          console.log(userID);
          await add_user_data(userID,preferred_username,email, user_role,res);
      } catch (error) {
          res.send(error);
      } 
    }
    else{
      res.send("Data Fields are empty.")
    }

})

// ------------------------------------------------DELETE API----------------------------------------------

//-------------------------------------- DELETE Portfolio Details----------------------------------------------------

  app.delete(root_url+"/deletePortfolioData", async (req,res) => {
    const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id :null ;
      try{ 
          if(portfolio_id!=null || portfolio_id!= undefined){
            await delete_portfolio_data(portfolio_id,res)
            await res.send("PORTFOLIO DELETED")
          }
          else{
            res.send("NOT A Valid Portfolio.")
          }
        }
      catch(error){
          res.send(error)
      }

    }) 

// ---------------------------------- DELETE Wallet FROM DATABASE----------------------------------------
     app.delete(root_url+"/delete_wallet", async (req,res) => {
      const walletId = req.query.walletId ? req.query.walletId: null;
      try {
        if(walletId !=null && walletId!= undefined){
          try {
            await delete_wallet(walletId,res);
            await res.send("Wallet Deleted")
          } catch (error) {
            console.log(error);
          }
        }
        else{
          console.log(error);
          res.send("NO WALLET ID RECIEVED");
        }
      } catch (error) {
        console.log(error);
      }
    }) //end of app.post()


// -------------------------DELETE ALL ADDRESS DATA-------------------------------------------------------
     app.delete(root_url+"/deleteAddressAllData", async (req,res) => {
        const address_id = req.query.address_id ? req.query.address_id: null;
          try{ 
            if(address_id != null && address_id!=undefined){
              try {
                const deleteres = await pms_delete_addressData(address_id,res)
                console.log("deleteres",deleteres);
                // if(deleteres!=null && deleteres!=undefined){
                  try {
                    // await delete_address(address_id,res);
                    await  db.getConnection( async (err, connection) => {
                      if (err) throw (err)
                      const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
                        await connection.query (sqlSelect,[address_id],async (err, address_result)=> {   
                          console.log(address_result);
                          console.log(address_result.length);
                           if(address_result && address_result.length==0){
                            res.send("Address Deleted Successfully")
                           }
                           else{
                            res.send("Address Not Deleted")
                           }
                        })
                        connection.release()
                    }) 
                  } catch (error) {
                    console.log(error);
                  }
                  // await res.send("Address DeLeted")
                // }
              } catch (error) {
                console.log(error);
              }
            }
            else{
            res.send("Address ID Not Valid")
            }
          }
        catch(error){
          res.send(error)
        }
      }) //end of

// ----------------------DELETE INVESTMENT FROM DATABASE-----------------------------------------------
  app.delete(root_url+"/delete_investment", async (req,res) => {
    const investment_id = req.query.investment_id ? req.query.investment_id:null;
    try{
        await pms_delete_investment(investment_id,res);
        await res.send("DELETED")
       }
       catch(err){
         res.send(err);
       }
    }) //end of app.post()
  
// -----------------------DELETE EXCHANGE from portfolio----------------
  app.delete(root_url+"/deleteExchangeData", async (req,res) => {
    const api_key = req.query.api_key ? req.query.api_key :null
        try{ 
          await pms_delete_exchange(api_key,res)
          await res.send("DELETED")
        }
        catch(error){
          res.send(error)
        }
    }) //end of

//-----------------------Admin DELETE user PARTYPORTFOLIO-----------------------------------------ABCD
      app.delete(root_url+"/deleteUserFromPortfolio", async (req,res) => {
         const party_id = req.query.party_id ? req.query.party_id: null;
         const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id: null;
         try{ 
            await delete_user_from_portfolio(portfolio_id,party_id,res)
        }
        catch(error){
          res.send(error)
        }
      }) //end of

// ---------------------------------------------CREATRE API'S-------------------------------------------------------

//---------------------------------- ADMIN CREATE PORTFOLIO---------------------------------------------------
app.post(root_url+"/admin/createPortfolio", async (req,res) => {
const user_id = req.body.user_id ? req.body.user_id :null;
const portfolio_name = req.body.portfolio_name ? req.body.portfolio_name :null;
const user_role = req.body.user_role ? req.body.user_role : null;
  if(user_id!=null || portfolio_name!= null || user_role=="admin"){  
    try{
      // await db.getConnection( async (err, connection) => {
      //     if (err) throw (err)
      //     const sqlSelect = "SELECT * FROM pms_users where user_id=?"
      //       await connection.query (sqlSelect,[user_id],async (err, result)=> {        
      //       if (err) throw (err)
      //       console.log(result)
      //       let exist =Object.values(json).includes("admin");
      //       console.log("exist",exist);
      //       console.log(result[0].user_type);
      //       user_type = await result[0].user_type;
      //         if(user_type.toLowerCase()=="admin"){
                await create_portfolio(portfolio_name,user_id,res);
        //       }
        //       else{
        //         console.log("You are not a Authorised User.");
        //           await res.send("You are not a Authorised User.")
        //       }
        //     })
        //     connection.release();
        // }) 
      }
      catch(error){
        res.send(error);
      }
  }
  else{
    res.send("Invalid User")
  }
}) 


//---------------------------------------EDIT PORTFOLIO NAME--------------------------------------------------------

app.post(root_url+"/EditPortfolioName", async (req,res) => {
  const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;
  const portfolio_name = req.body.portfolio_name ? req.body.portfolio_name : null;
    try{ 
      await change_portfolio_name(portfolio_id, portfolio_name, res)
    }
    catch(error){
      res.send(error)
    }
}) //end of

// -----------------------EDIT WAllet Name------------------------------------------

app.post(root_url+"/renameWallet", async (req,res) =>{
  const wallet_id = req.body.wallet_id ? req.body.wallet_id : null;
  const wallet_name = req.body.wallet_name ? req.body.wallet_name : null;
  const wallet_purpose = req.body.wallet_purpose ? req.body.wallet_purpose : null;
  try {
    await rename_wallet(wallet_name,wallet_purpose,wallet_id, res)
  } catch (error) {
    console.log(error);
  }
})
//-----------------------------elliptic_report---------------------------------------------

app.post(root_url+"/elliptic_report", async (req,res) =>{
  const wallet_id = req.body.wallet_id ? req.body.wallet_id : null;
  const address_id = req.body.address_id ? req.body.address_id : null;
  const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;
  const address_name = req.body.address_name ? req.body.address_name : null;
  const address_type =req.body.address_type ? req.body.address_type : null;
  // const org_id= req.body.org_id ? req.body.org_id : null;
  // const party_id =req.body.party_id ? req.body.party_id : null;
  
  try {
    await elliptic(address_id,wallet_id,portfolio_id,address_name,address_type, res)
  } catch (error) {
    console.log(error);
  }
})

// get eliptic_report==============================================================
  app.get(root_url + "/get_elliptic_report", async (req,res) =>{
    // const address_id = req.query.address_id ? req.query.address_id : null;
    // if( address_id!=null ){
      try {
         await get_elliptic(res);
      } catch (error) {
        res.send(error)
      }
    // }
    // else{
    //   res.send("Invalid id");
    // }
  })

  // create  share_holder/////////////////////////////////////////

  app.post(root_url+"/share_holder", async (req,res) =>{
    const share_holder_name = req.body.share_holder_name ? req.body.share_holder_name : null;
    try {
      await share_holder(share_holder_name,res)
    } catch (error) {
      console.log(error);
    }
  })

  //////////////update_share holder name//////////////

  app.post(root_url+"/share_holder_name", async (req,res) =>{
    const share_holder_name = req.body.share_holder_name ? req.body.share_holder_name : null;
    const holder_id = req.body.holder_id ? req.body.holder_id : null;

    try {
      await updateshare_holder_name(share_holder_name,holder_id,res)
    } catch (error) {
      console.log(error);
    }
  })

  // get_api_for share-holder=====================\\\

  app.get(root_url + "/get_share_holder", async (req,res) =>{
    // const share_holder_name = req.query.share_holder_name ? req.query.share_holder_name : null;
      try {
         await get_share_holder(res);
      } catch (error) {
        res.send(error)
      }
  })

  ////////all_share_holder///////////////////////////////////////

  

  app.post(root_url+"/all_share_holder", async (req,res) =>{
    const holder_id = req.body.holder_id ? req.body.holder_id : null;
    const name = req.body.name ? req.body.name : null;
    try {
      await all_share_holder(holder_id,name,res)
    } catch (error) {
      console.log(error);
    }
  })


  ///////////////////get all share_holder data/////////////////////////////

  app.get(root_url + "/get_all_share_holder", async (req,res) =>{
      try {
         await get_all_share_holder(res);
      } catch (error) {
        res.send(error)
      }
  })
//create_tron_audit_logs////////////////////

app.post(root_url+"/updateTronComment", async (req,res) => {
  // const address_id = req.body.address_id ? req.body.address_id :null;
  const user_id = req.body.user_id ? req.body.user_id : null;
  const hash = req.body.hash ? req.body.hash :null;
  const comment = req.body.comment? req.body.comment : null;
  const updated_time = new Date().getTime();
  try{
    await create_tron_audit_history_list(user_id,hash,comment,res)
  }
  catch(error){
    res.send(error)
  }
})
  ///refresh tron_transaction_api/////////////////////////////////////////////////

//   app.get(root_url+"/refreshtron", async (req,res) => {
//     const tron_address_id = req.query.tron_address_id ? req.query.tron_address_id :null;
//     try{
//       await fetch_tron_transaction(tron_address_id,res)
//    }
//    catch(error){
//      res.send(error)
//    }
//  })

  // create_pms_Accountancy(game)===============================================================
  //not used api=========================================================
  app.post(root_url+"/accountancy", async (req,res) =>{
    
    const game_id = req.body.game_id ? req.body.game_id : null;
    const game = req.body.game ? req.body.game : null;
    const game_details = req.body.game_details ? req.body.game_details : null;
    const venue = req.body.venue ? req.body.venue : null;
    const type = req.body.type ? req.body.type : null;
    const host =req.body.host ? req.body.host : null;
    const group= req.body.group ? req.body.group : null;
    const player =req.body.player ? req.body.player : null;
    const shareholders =req.body.shareholders ? req.body.shareholders : null;
    const owner_ship =req.body.owner_ship ? req.body.owner_ship : null;
    const result =req.body.result ? req.body.result : null;
    const date_created =req.body.date_created ? req.body.date_created : null;
    const week=req.body.week ? req.body.week : null;
    const share_holder = req.body.share_holder ? req.body.share_holder : null;


    try {
      await pms_accountancy(game_id,game,game_details,venue,type,host,group,player,shareholders,owner_ship,result,date_created,week,share_holder,res)
    } catch (error) {
      console.log(error);
    }
  })


  ////////////////////////////////////

  app.post(root_url+"/pms_accountancy", async (req,res) =>{
    
    const game_id = req.body.game_id ? req.body.game_id : null;
    const game = req.body.game ? req.body.game : null;
    const game_details = req.body.game_details ? req.body.game_details : null;
    const venue = req.body.venue ? req.body.venue : null;
    const type = req.body.type ? req.body.type : null;
    const host =req.body.host ? req.body.host : null;
    const group_= req.body.group_ ? req.body.group_ : null;
    const player =req.body.player ? req.body.player : null;
    const shareholders =req.body.shareholders ? req.body.shareholders : null;
    const shareholders_percentage =req.body.owner_ship ? req.body.shareholders_percentage : null;
    const result =req.body.result ? req.body.result : null;
    const date =req.body.date ? req.body.date : null;
    const week=req.body.week ? req.body.week : null;
    const share_holder = req.body.share_holder ? req.body.share_holder : null;
    const currency = req.body.currency ? req.body.currency : null;
    const exchange_rate = req.body.exchange_rate ? req.body.exchange_rate : null;
    const comment = req.body.comment ? req.body.comment : null;
    try {
      await accountancy(game_id,game,game_details,venue,type,host,group_,player,shareholders,shareholders_percentage,result,date,week,share_holder,currency,exchange_rate,comment,res)
    } catch (error) {
      console.log(error);
    }
  })

// get pms_accountancy(game)=========================================================

app.get(root_url + "/get_accountancy", async (req,res) =>{
  try {
    await pms_get_accountancy(res);
 } catch (error) {
   res.send(error)
 }
})
// -------------------------------UPDATE PartyPortfolio USERS------------------------------------
  app.post(root_url+"/admin/updatePartyPortfolio", async (req,res) => {
    const party_detail = req.body.party_detail ? req.body.party_detail: null;
    const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id: null;
    const user_role = req.body.user_role ? req.body.user_role : null;
    const user_id = req.body.user_id ? req.body.user_id : null;
    if(user_id!=null || portfolio_id!=null){
      try{
        // await db.getConnection( async (err, connection) => {
        //     if (err) throw (err)
        //     const sqlSelect = "SELECT * FROM pms_users where user_id=?"
        //       await connection.query (sqlSelect,[user_id],async (err, result)=> {        
        //         if (err) throw (err)
        //         console.log(result)
        //         console.log(result[0].user_type);
        //         user_type = await result[0].user_type;
        //         if(user_type.toLowerCase()=="admin" || user_type.toLowerCase()=="accountant"){
          if(user_role=="admin"){
             await  modify_portfolio(portfolio_id,party_detail,user_id,res)
          }
          else{
              res.send("User is not Authorised.")
          }
      }
      catch(error){
        res.send(error)
      }
    }
    else{
      res.send("Invalid Input")
    }
  }) 
//////////////////////////////


app.get(root_url + "/get_ledger", async (req,res) =>{
  try {
    await accountancy_ledger(res);
 } catch (error) {
   res.send(error)
 }
})
/////////////////////////////
//------------------------------Admin create Organisation--------------------------------------------------------

  app.post(root_url+"/admin/createorganisation", async (req,res) => {
    const user_id = req.body.user_id ?req.body.user_id:null;
    const name = req.body.name ? req.body.name:null ;
    const address = req.body.address ? req.body.address: null;
    const city = req.body.city ? req.body.city : null; 
    const country = req.body.country ? req.body.country : null; 
    const tax_id = req.body.tax_id ? req.body.tax_id :null;  
    const user_role = req.body.user_role ? req.body.user_role : null;
    try{
    
              if(user_role=="admin"){
                  await  create_organisation(name,address,tax_id,city,country,user_id,res)
                }
                else{
                  console.log("You are not a Authorised User.");
                    res.send("You are not a Authorised User.")
                }
    }
    catch(error){
      res.send(error)
    }
  }) 

// ------------------------------------------Add--Portfolio--to--Accountant------------------
app.post(root_url + "/admin/add_portfolio_manager", async (req,res) =>{
  const user_id = req.body.user_id ? req.body.user_id : null;
  const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;
  const accountant_id = req.body.accountant_id ? req.body.accountant_id : null;
  const user_role = req.body.user_role ? req.body.user_role : null;
  if(user_role == "admin"){
    try {
      await add_porfolio_manager(user_id,accountant_id,portfolio_id,res);
    } catch (error) {
      res.send(error);
    }
  }
  else{
    res.send("User is not Authorised to add acccountant to a Portfolio.");
  }
})

// ------------GET --ALL --Acccountant--List----------------
app.get(root_url + "/accontant_list", async(req,res) =>{
  const user_role = req.query.user_role ? req.query.user_role : null;
  console.log(user_role);
  if(user_role =="admin"){
    try {
      await get_accountant_list(res);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  else{
    res.send("Invalid User")
  }
})

// -------------------------------Get ---Portfolio---of---Accountant-----------------------
app.get(root_url + "/accountant_portfolio", async (req,res) =>{
  const accountant_id = req.query.accountant_id ? req.query.accountant_id : null;
  if(accountant_id !=null ){
    try {
       await get_manager_portfolios(accountant_id,res);
    } catch (error) {
      res.send(error)
    }
  }
  else{
    res.send("Invalid Accountant");
  }
})

// ----GET--------------all ---Portfolio---of ---accountant----
app.get(root_url + "/all_accountant_and_portfolio", async (req,res) =>{
  try {
    await get_all_portfolios_accountant(res);
  } catch (error) {
    res.send(error);
  }
})


//------------Delete ---Accountant--Manager---from---Portfolio--linked
app.delete(root_url + "/delete_accountant_portfolio/:accountant_linked_id", async (req,res) =>{
    const portfolio_accountant_id = req.params.accountant_linked_id ? req.params.accountant_linked_id : null;
    console.log(portfolio_accountant_id);
  try {
    await delete_manager_portfolios(portfolio_accountant_id,res)
  } catch (error) {
    res.send(error)
  }
}) 

// --------------------------------Admin Create Person---------------------------------------------

  app.post(root_url+"/admin/createperson", async (req,res) => {
    const user_id = req.body.user_id ? req.body.user_id : null;
    const user_name = req.body.user_name ? req.body.user_name : null;
    const user_phone = req.body.user_phone ? req.body.user_phone : null;
    const email_id = req.body.email_id ? req.body.email_id : null;    
    const user_role = req.body.user_role ? req.body.user_role : null;
    try{
      // await  db.getConnection( async (err, connection) => {
      //     if (err) throw (err)
      //     const sqlSelect = "SELECT * FROM pms_users where user_id=?"
      //       await connection.query (sqlSelect,[user_id],async (err, result)=> {        
      //         if (err) throw (err)
      //         console.log(result)
      //         console.log(result[0].user_type);
      //         user_type = await result[0].user_type;
                // if(user_type.toLowerCase()=="admin"){
                  if(user_id ==null || user_name==null || user_phone==null ){
                    res.send("Invalid Request. Please provide valid data.")
                  }
                  else{
                    if(user_role=="admin"){
                        await create_person(user_name,user_phone,email_id,user_id,res);
                    }
                    else{
                      res.send("User role is not admin.")
                    }
                  }
                  
      //           }
      //           else{
      //               console.log("You are not a Authorised User.");
      //                 res.send("You are not a Authorised User.");
      //           }
      //       })
      //       connection.release();
      // }) //end of connection.query()
    }
    catch(error){
      res.send(error)
    }
  }) 

// ----------------------------------Admin Create Party Portfolio------------------------------------------

  app.post(root_url+"/admin/createPartyPortfolio", async (req,res) => {
    const party_id = req.body.party_id ?req.body.party_id:null;
    const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id:null;
    const ownership_percent = req.body.ownership_percent ? req.body.ownership_percent: null;
    const user_id = req.body.user_id ? req.body.user_id : null;
    const user_role = req.body.user_role ? req.body.user_role : null;
    if(user_id!=null || portfolio_id!=null || party_id!=null || ownership_percent!=null){
      try{
        // await db.getConnection( async (err, connection) => {
        //     if (err) throw (err)
        //     const sqlSelect = "SELECT * FROM pms_users where user_id=?"
        //     await connection.query (sqlSelect,[user_id],async (err, result)=> {        
        //       if (err) throw (err)
        //       console.log(result)
        //       console.log(result[0].user_type);
        //       user_type = await result[0].user_type;
        //         if(user_type.toLowerCase()=="admin"){
              if(user_role=="admin"){
                await  create_party_portfolio (party_id,portfolio_id,ownership_percent,user_id,res)
              }
              else{
                res.send("User is not Admin.")
              }
        //         }
        //         else{
        //             console.log("You are not a Authorised User.");
        //               res.send("You are not a Authorised User.")
        //         }
        //     })
        //     connection.release();
        // }) //end of connection.query()
      }
      catch(error){
        res.send(error)
      }
    }
    else{
      res.send("Invalid Input")
    }
  }) 

// -----------------------------------Create Wallet Name using user_id to database-----------------------------------------------

  app.post(root_url+"/create_wallet", async (req,res) => {
    const walletName = req.body.walletName ? req.body.walletName : null;
    const wallet_purpose = req.body.wallet_purpose ? req.body.wallet_purpose : null;
    const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;
      try{
        await create_wallet(walletName,wallet_purpose,portfolio_id,res)
      }
      catch(error){
        res.send(error)
      }
  }) 

  //-----------------------------------CREATE EXCHANGE-------------------------------------------------
  app.post(root_url+"/createExchange", async (req,res) => {
    const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;
    const exchange_name = req.body.exchange_name ? req.body.exchange_name : null;
    const api_key = req.body.api_key ? req.body.api_key : null;
    const api_secret = req.body.api_secret ? req.body.api_secret : null;   
    const exchange_type = req.body.exchange_type ? req.body.exchange_type: null;
    const user_id = req.body.user_id ? req.body.user_id :null;
    console.log(api_key,portfolio_id,req.body.portfolio_id);
    try{
      db.getConnection( async (err, connection) => {
          if (err) throw (err)     
            if(exchange_name!=null){
                await pms_add_exchanges(portfolio_id,exchange_name,api_key,api_secret,exchange_type,user_id,res)
              }
              else{
                console.log("Enter Exchange Name");
              }
            connection.release();
          }) //end of connection.query()
    }
    catch(error){
      res.send(error)
    }
  })

// -----------------------------------Create----Exchange----History------------
app.post(root_url+"/add_exchange_history", async(req,res) =>{
  const user_id = req.body.user_id ? req.body.user_id : null;
  const api_key = req.body.api_key ? req.body.api_key : null;
  const secret_key = req.body.secret_key ? req.body.secret_key : null;
  const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;
  console.log(user_id);
  try {
    await add_exchange_history(user_id,api_key,secret_key,portfolio_id,res)
    await res.send("Update In process")
  } catch (error) {
    console.log(error);
  }
})

// ------------------------GET ----exchange-----history-------------------------------
app.get(root_url+"/get_exchange_history", async(req,res) =>{
  const api_key = req.query.api_key ? req.query.api_key : null;
  // const offset = req.query.offset ? req.query.offset : null;
  if(api_key == null){
    res.send("Input fields empty.")
  }
  else{
    try {
      await get_exchange_history(api_key,res)
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }
})

// ----------------------GET EXCHANGE HISTORY LOGS----------------------------------------------------

app.get(root_url+"/get_exchange_history_logs", async(req,res) =>{
  const offset = req.query.offset ? req.query.offset : null;
    try {
      await get_exchange_history_logs(offset,res)
    } catch (error) {
      console.log(error);
      res.send(error)
    }
})

// -------------------GET --ALL---EXCHANGE----OF____PORTFOLIO-----------
app.get(root_url+"/get_exchange_list_OfPortfolio", async(req,res)=>{
  const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id : null;
    try {
        await get_all_portfolio_exchange(portfolio_id, res)
    } catch (error) {
      console.log(error);
    }
})

// -------------CREATE EXCHANGE HISTORY AUDIT LOGS------------------------------
app.post(root_url+"/add_comments_exchange_history", async(req,res) =>{
  const user_id = req.body.user_id ? req.body.user_id : null;
  const comment = req.body.comment ? req.body.comment : null;
  const symbol_order_id_api_key = req.body.idkey ? req.body.idkey : null;
  console.log(symbol_order_id_api_key);
  try {
    await create_exchange_audit_logs(user_id,symbol_order_id_api_key,comment,res)
  } catch (error) {
    console.log(res);
  }
})

//------------------------------------Create Investment------------------------
app.post(root_url+"/add_investment", async (req,res) => {
    const invest_name = req.body.invest_name ? req.body.invest_name :null;
    const invest_type = req.body.invest_type ? req.body.invest_type :null;
    const date_of_invest = req.body.date_of_invest ? req.body.date_of_invest :null;
    const created_date = req.body.created_date ? req.body.created_date :new Date().toUTCString();
    const quantity =  req.body.quantity ? req.body.quantity :null;
    // const invest_value = req.body.invest_value ? req.body.invest_value :null;
    const userId = req.body.userId ? req.body.userId : null;
    const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id :null;
    const comment = req.body.comment ? req.body.comment : null;
    const purchase_price = req.body.purchase_price ? req.body.purchase_price :null;
    const created_by_name = req.body.created_by_name ? req.body.created_by_name :null;
    const sell_nav = req.body.sell_nav ? req.body.sell_nav :null;
    const current_nav = req.body.current_nav ? req.body.current_nav :null;
    const sell_date = req.body.sell_date ? req.body.sell_date :null;
    const exchange_rate = req.body.exchange_rate ? req.body.exchange_rate :null;
    const currency = req.body.currency ? req.body.currency :null;
    const sell_type = req.body.sell_type ? req.body.sell_type :null;
    const purchase_type = req.body.purchase_type ? req.body.purchase_type :null;
    const sell_id = req.body.sell_id ? req.body.sell_id :null;
    // const updated_by_name = req.body.updated_by_name ? req.body.updated_by_name :null;

      try{
        if(invest_name ==null){
          res.send("Investment name cannot be null");
        }
        else{
          await add_investments(invest_name,invest_type,date_of_invest,created_date,quantity,userId,portfolio_id,comment,purchase_price,created_by_name,sell_nav,current_nav,sell_date,exchange_rate,currency,sell_type,purchase_type,sell_id,res)
          }
      }
      catch(error){
        res.send(error)
      }
  }) //end of app.post()  


//--------------------------UPDATE INVESTMENT FROM DATABASE-----------------------------------------------
  app.post(root_url+"/update_investment", async (req,res) => {
    const invest_name = req.body.invest_name ? req.body.invest_name :null;
    const invest_type = req.body.invest_type ? req.body.invest_type :null;
    const date_of_invest = req.body.date_of_invest ? req.body.date_of_invest :null;
    const created_date = req.body.created_date ? req.body.created_date :new Date().toUTCString();
    const quantity =  req.body.quantity ? req.body.quantity :null;
    // const invest_value = req.body.invest_value ? req.body.invest_value :null;
    const userId = req.body.userId ? req.body.userId : null;
    const investment_id = req.body.investment_id? req.body.investment_id:null;
    const comment = req.body.comment ? req.body.comment : null;
    const purchase_price = req.body.purchase_price ? req.body.purchase_price :null;
    const sell_nav = req.body.sell_nav ? req.body.sell_nav :null;
    const current_nav = req.body.current_nav ? req.body.current_nav :null;
    const sell_date = req.body.sell_date ? req.body.sell_date :null;
    const exchange_rate = req.body.exchange_rate ? req.body.exchange_rate :null;
    const currency = req.body.currency ? req.body.currency :null;
    const sell_type = req.body.sell_type ? req.body.sell_type :null;
    const purchase_type = req.body.purchase_type ? req.body.purchase_type :null;
    const updated_by_name = req.body.updated_by_name ? req.body.updated_by_name :null;
    const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id :null;
    const sell_id = req.body.sell_id ? req.body.sell_id :null;

    
    try{
      
      await pms_update_investment(invest_name,invest_type,date_of_invest,created_date,quantity,userId,investment_id,comment,purchase_price,sell_nav,current_nav,sell_date,exchange_rate,currency,sell_type,purchase_type,updated_by_name,portfolio_id,sell_id,res)
       }
       catch(err){
         res.send(err)
       }
    }) //end of app.post()


//----------------------ADD Comments IN INVESTMENTS--------------------------------------------------------
  app.post(root_url+"/comment_investment", async (req,res) => {
    const comment = req.body.comment ? req.body.comment :null;
    const userId = req.body.userId ? req.body.userId : null;
    const investment_id = req.body.investment_id ? req.body.investment_id:null;
    try{
        investment_comments(comment,userId,investment_id,res)
       }
       catch(err){
         res.send(err)
       }
  }) //end of app.post()

/////////////////////

app.post(root_url + "/update_investment_status", async (req, res) => {
  let investment_id= req.body.investment_id ? req.body.investment_id : null;
  let user_name = req.body.user_name ? req.body.user_name : null;
  try {
    await update_status_investment(investment_id,user_name,res);
  } catch (error) {
    res.send(error);
  }
})

// --------------------------------------GET DATA API's-----------------------------------------------------------------

//----------------------------------------GEt ALL Portfolio with Details--------------------------------------------
app.get(root_url+"/all_portfolios_details", async (req,res) => {
    const user_id = req.query.user_id ? req.query.user_id:null;
    try {
      console.log(user_id);
      db.getConnection( async (err, connection) => {
        if (err) throw (err) 
        try {
          // const sqlSelect = "SELECT * FROM pms_users where user_id=?"
          // await connection.query (sqlSelect,[user_id],async (err, result)=> {        
          //   if (err) throw (err)
          //   console.log("resluttts",result);
          //   if(result.length ==0){
          //     console.log("error");
          //     res.send("Error // Cannot find portfolio list")
          //   }
            // if (result[0].user_type =='admin' || result[0].user_type =='accountant' ||result[0].user_type =='user') {
              await get_all_portfolio_details(res);
          //   }
          //   else {
          //     res.send("error")
          //   }
          // })
        } catch (error) {
         console.log(error); 
        }
        connection.release()
      })
    } catch (error) {
      res.send(error) 
    }
})

//-------------------------------------------GET ALL PORTFOLIO Users DATA ------------------------------------------------
app.get(root_url+"/all_portfolio_users_data", async (req,res) => {
    const user_id = req.query.user_id ? req.query.user_id:null;
    const user_role = req.query.user_role ? req.query.user_role : null;
    try {
      // await  db.getConnection( async (err, connection) => {
        // if (err) throw (err)
        // try {
          // const sqlSelect = "SELECT * FROM pms_users where user_id=?"
          // await connection.query (sqlSelect,[user_id],async (err, result)=> {        
          //   if (err) throw (err)
          //     console.log("resluttts",result);
          //     if(result.length ==0){
          //       console.log("error");
          //       res.send("Cant Find")
          //     }
              if (user_role =='admin' || user_role =='accountant' ) {
                await get_allpf_users(res);
              }
              else if(result[0].user_type !='admin'){
                res.send("error")
              }
          // })
        // } catch (error) {
        //   console.log(error);
        // }
        // connection.release()
      // })
    } catch (error) {
      res.send(error) 
    }
})

//--------------------------GET ALL WALLETS With Address OF PORTFOLIO-------------------------------------------------
app.get(root_url+"/portfolio_wallet_address", async (req,res) => {
    // const user_role = req.query.user_id ? req.query.user_id:null;
    const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id : null;
   
    try {
      // await  db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //   try {
      //     const sqlSelect = "SELECT * FROM pms_users where user_id=?"
      //     await connection.query (sqlSelect,[user_id],async (err, result)=> {        
      //       if (err) throw (err)
      //       console.log("results",result);
      //       if(result.length ==0){
      //         console.log("error");
      //         res.send("Cant Find")
      //       }
      //       if (result[0].user_type =='admin' || result[0].user_type =='accountant' || result[0].user_type =='user') {
      //         try {
                await get_portfolio_wallets_address(portfolio_id,res);
      //         } catch (error) {
                
      //         }
      //       }
      //       else {
      //         res.send("error")
      //       }
      //     })
      //   } catch (error) {
      //     console.log(error);
      //   }
      //   connection.release()
      // })
    } catch (error) {
      res.send(error) 
    }
})

//-------------------------- Get all Organisation---------------------------------------------
  app.get(root_url+"/getAllOrganisation", async (req,res) => {
    // const user_id = req.query.user_id
    const offsetno = req.query.offsetno ? req.query.offsetno :0;
      try{ 
        // await db.getConnection( async (err, connection) => {
        //   if (err) throw (err)
        //   const sqlSelect = "SELECT * FROM pms_organisations_list"
        //   await connection.query (sqlSelect, (err, result)=> {
        //     if (err) throw (err)
        //     // console.log(result)
        //     res.send(result) 
        //   })
        //   connection.release();
        // }) //end of
        await get_all_organisation(res,offsetno)
      }
      catch(error){
        res.send(error)
      }
  }) //end of

// ---------------------------- GET ALL PERSONS  --------------------------------------------------
app.get(root_url+"/getAllPerson", async (req,res) => {
  const offsetno = req.query.offsetno ? req.query.offsetno :0;
    try{ 
      // await db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //   const sqlSelect = "SELECT * FROM pms_person_list"
      //   await connection.query (sqlSelect, (err, result)=> {
      //     if (err) throw (err)
      //   // console.log(result)      
      //     res.send(result) 
      //   })
      //   connection.release();
      // }) 
      await get_all_persons(res,offsetno)
    }
    catch(error){
      res.send(error)
    }
  }) //end of
  

// ------------GET All Investment of Portfolio ----------------------------------------------------
app.get(root_url+"/getAllInvestment", async (req,res) => {
  const portfolio_id = req.query.portfolio_id?req.query.portfolio_id: null;
    try{
      await get_investment(portfolio_id,res)
      // await  db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //   try {
      //     const sqlSelect = "SELECT * FROM pms_add_investment where portfolio_id=?"
      //     await connection.query (sqlSelect,[portfolio_id], (err, result)=> {        
      //       if (err) throw (err)
      //     // console.log(result)
      //       res.send(result)
      //     })
      //   } catch (error) {
      //     console.log(error);
      //   }
      //   connection.release();
      // }) //end of connection.query()
    }
    catch(error){
          res.send(error)
    }
  })

///////////new investment/////////

app.get(root_url+"/getNewInvestment", async (req,res) => {
  const portfolio_id = req.query.portfolio_id?req.query.portfolio_id: null;
  const investment_name = req.query.investment_name?req.query.investment_name: null;
  const new_invest_id = req.query.new_invest_id?req.query.new_invest_id: null;
    try{
      await new_get_investment(portfolio_id,investment_name,new_invest_id,res)
    }
    catch(error){
          res.send(error)
    }
  })


// ----------GET INVESTMENT LOGS-----------------------------------
 app.get(root_url+"/getAllInvestmentLogs", async (req,res) => {
  let offset = req.query.offset ? req.query.offset : 0;
  try {
    await get_investment_logs(offset,res)
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})
  

// ----------------------------GET USER DATA------------------------------------------
// Get Wallets of Single Portfolio------------------------------------------
app.get(root_url+"/get_wallets", async (req,res) => {
  const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id : null; 
    try{
      await get_wallets(portfolio_id,res)
        // await  db.getConnection( async (err, connection) => {
        //   if (err) throw (err)
        //   const sqlSelect = "SELECT * FROM pms_user_wallet where portfolio_id= ?"
        //     await connection.query (sqlSelect,[portfolio_id], (err, result)=> {
        //     if (err) throw (err)
        //     res.send(result) 
        //     })
        //   connection.release();
        // }) 
    }
    catch(error){
      res.send(error)
    }
  }) 

/// ------GET All Address of Single Portfolio ----------------------------------------------
app.get(root_url+"/getAllWalletsofUSer", async (req,res) => {
  const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id :null;
    try{
      await get_all_wallets_of_user(portfolio_id,res)
      // await db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //   const sqlSelect = "SELECT * FROM pms_user_balance where portfolio_id=?"
      //     await connection.query (sqlSelect,[portfolio_id], (err, result)=> {
      //     if (err) throw (err)
      //     res.send(result) 
      //   })
      //   connection.release();
      // }) //end of connection.query()
    }
    catch(error){
      res.send(error)
    }
  }) //end of api------------------

  
// -------------------------------------GET All address list data of Wallet------------------------------------
app.get(root_url+"/getAlladdressofwallet", async (req,res) => {
  const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id:null ;
  const wallet_id = req.query.wallet_id ? req.query.wallet_id: null;
  try{
    await get_all_address_of_wallet(wallet_id,res)
    // await db.getConnection( async (err, connection) => {
    // if (err) throw (err)
    // const sqlSelect = "SELECT * FROM pms_user_balance where wallet_id=?"
    //   await connection.query (sqlSelect,[wallet_id], (err, result)=> {        
    //   if (err) throw (err)
    //   console.log(result)
    //   res.send(result) 
    //   })
    //   connection.release();
    // }) //end of connection.query()
  }
  catch(error){
    res.send(error)
  }
  })
  

//----------------------------------Get PROTCOLS OF WALLET DATA -------------------------------------------
  app.put(root_url+"/getprotocollistofchain", async (req,res) => {
    const walletId = req.body.walletId ? req.body.walletId : null;
    console.log(walletId);
    try{
      await get_simple_protocol_list(walletId,res)  
    }
    catch(error){
      console.log(error);
    }
  }) //end of


//   ---------------------------------CREATE ----ADDRESS-------------------------------------------
// Add DEBANK Address to a User Wallet-----------------------------------------------
  app.post(root_url+"/debank_fetch/add_address", async (req,res) => {
     const address_id = req.body.address_id ? req.body.address_id :null;
     const wallet_id =req.body.wallet_id ?req.body.wallet_id :null;
     const portfolio_id = req.body.portfolio_id ?req.body.portfolio_id : null;
     const address_name = req.body.address_name ? req.body.address_name :null;
     const address_type = req.body.address_type ? req.body.address_type :null;
    //  const comments =  req.body.comments ? req.body.comments :null;
     try{
      // await fetch_address(address_id, wallet_id, portfolio_id,address_name,address_type, res)

        await  db.getConnection( async (err, connection) => {
          if (err) throw (err)
          const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
            await connection.query (sqlSelect,[address_id],async (err, result)=> {        
            if (err) throw (err)
            // console.log(result);
            // console.log(result.length);
            if(result.length>=1){
              res.send("Address Already Exist With Another Wallet")
            }
            else if(result.length==0){
                // res.send("Address Added Successfully")
              if(address_name ==null || address_type==null || portfolio_id==null || wallet_id==null || address_id==null){
                res.send("Address Fields are empty. Please Give addess all requirements.")
                }
              else {
                  if(address_type.toUpperCase()=='BTC' || address_type.toUpperCase()=='ETH' || address_type.toUpperCase()=='TRX'){
                  // await addAddress(address_id,wallet_id,portfolio_id,address_name,address_type,res)
                    await addnewaddress1(address_id, wallet_id, portfolio_id,address_name,address_type, res)
                    // try {
                    //   await  db.getConnection( async (err, connection) => {
                    //   if (err) throw (err)
                    //   try { 
                    //     const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
                    //     await connection.query (sqlSelect,[address_id], (err, updatedresult)=> {
                    //       if (err) throw (err)
                    //       console.log("updatedresult",updatedresult);
                    //       if(updatedresult && updatedresult.length>=1){
                    //         res.send(updatedresult);
                    //       }
                    //       else{
                    //         res.send("Not Updated")
                    //       }
                    //       })
                    //     } catch (error) {
                    //       console.log(error);
                    //     }
                    //     connection.release();
                    //   })
                    // } catch (error) {
                    //   console.log(error);
                    // }
                  }
                  else{
                    res.send("Address Type is not Valid")
                  }
                } 
              }
            })
            connection.release()
        })
      }
      catch(error){
        console.log(error);
        res.send(error)
      }
      //  connection.release();
  }) 


// ----test----add_address--
app.post(root_url+"/debank_fetch/add_addressnew", async (req,res) => {
    const address_id = req.body.address_id ? req.body.address_id :null;
    const wallet_id =req.body.wallet_id ?req.body.wallet_id :null;
    const portfolio_id = req.body.portfolio_id ?req.body.portfolio_id : null;
    const address_name = req.body.address_name ? req.body.address_name :null;
    const address_type = req.body.address_type ? req.body.address_type :null;
    try {
      await addnewaddress1(address_id, wallet_id, portfolio_id,address_name,address_type, res)
    } catch (error) {
      console.log(error);
    }
})
// ----Refresh Address Balance of user Wallet------------------------------------------
  app.get(root_url+"/debank_fetch/wallet_balance", async (req,res) => {
      const address_id = req.query.address_id ? req.query.address_id : null;
      // const comments =  req.query.comments ? req.query.comments :null;
      try{
        if (address_id !=null || address_id!= undefined) {
          await user_balance(address_id,res)
          try {
            await fetch_wallets_balance(address_id, res)
              //  await  db.getConnection( async (err, connection) => {
              //   if (err) throw (err)
              //   try {
              //     const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
              //     await connection.query (sqlSelect,[address_id], (err, updatedresult)=> {
              //       if (err) throw (err)
              //       console.log(updatedresult);
              //       if(updatedresult && updatedresult.length>=1){
              //         res.send(updatedresult);
              //       }
              //     })
              //   } catch (error) {
              //     console.log(error);
              //   }
              //     connection.release();
              //   })
          } catch (error) {
            console.log(error);
          }
        }
        else{
          res.send("Address ID is not Valid.")
        }
      }
     catch(error){
        res.send(error)
     }
  }) //end of db.getConnection()


// ---GET All Chain LIST ASSETS of Wallet ------------------------------------------------
  app.get(root_url+"/getchainlistofaddressWallet", async (req,res) => {
    const address_id = req.query.address_id ? req.query.address_id :null;
      try{
        await get_chain_list (address_id,res)
        // await  db.getConnection( async (err, connection) => {
        //   if (err) throw (err)
        //   const sqlSelect = "SELECT * FROM pms_address_chain_list where address_id=?"
        //     await connection.query (sqlSelect,[address_id], (err, result)=> {
        //       if (err) throw (err)
        //       // console.log(result)
        //       res.send(result) 
        //     })
        //   connection.release();
        // }) //end of connection.query()
      }
      catch(error){
        res.send(error)
      }
  }) //end of
  

  
// ------GET All Transaction history of ADDRESS Wallet----------------------------------
  app.get(root_url+"/getAllTransactionHistoryofUser", async (req,res) => {
    const address_id = req.query.address_id ? req.query.address_id :null;
    console.log("add",address_id);
    try{
      await debank_transaction_history(address_id,res)
     
    }
    catch(error){
      res.send(error)
    }
  }) //end of api point

  /////////////////////////////filter dbank/////////////////
  // let address_id = req.query.address_id ? req.query.address_id : null;
  // let address_type = req.query.address_type ? req.query.address_type : null;
  // let token_type = req.query.token_type ? req.query.token_type : null;
  // let start_timestamp = req.query.start_timestamp ? req.query.start_timestamp : null;
  // let end_timestamp = req.query.end_timestamp ? req.query.end_timestamp : null;
  // let token_typeusd = req.query.token_typeusd ? req.query.token_typeusd : null;
  // let token_typeusdt = req.query.token_typeusdt ? req.query.token_typeusdt : null;

  app.get(root_url+"/get_eth_transaction_filter", async (req,res) => {
    let address_id = req.query.address_id ? req.query.address_id :null;
    let token_type = req.query.token_type ? req.query.token_type : null;
    let start_timestamp = req.query.start_timestamp ? req.query.start_timestamp : null;
    let end_timestamp = req.query.end_timestamp ? req.query.end_timestamp : null;
    let token_typeusd = req.query.token_typeusd ? req.query.token_typeusd : null;
    let token_typeusdt = req.query.token_typeusdt ? req.query.token_typeusdt : null;
    console.log("add",address_id);
    try{
      await get_eth_transaction_filter(address_id,token_type,start_timestamp,end_timestamp,token_typeusd,token_typeusdt,res)
     
    }
    catch(error){
      res.send(error)
    }
  })
  
  ///////////////////////////////////
  // from_address,token_type,start_timestamp,end_timestamp,token_typeusd,token_typeusdt,token_typebtc,token_typeeth,token_typeeth_usd,token_typeeth_usdt

  app.get(root_url+"/get_all_transaction_filter", async (req,res) => {
    // let from_address = req.query.from_address ? req.query.from_address :null;
    let wallet_id = req.query.wallet_id ? req.query.wallet_id :null;
    let token_type = req.query.token_type ? req.query.token_type : null;
    let start_timestamp = req.query.start_timestamp ? req.query.start_timestamp : null;
    let end_timestamp = req.query.end_timestamp ? req.query.end_timestamp : null;
    let token_typeusd = req.query.token_typeusd ? req.query.token_typeusd : null;
    let token_typeusdt = req.query.token_typeusdt ? req.query.token_typeusdt : null;
    let token_typebtc = req.query.token_typebtc ? req.query.token_typebtc : null;
    let token_typeeth = req.query.token_typeeth ? req.query.token_typeeth : null;
    // let token_typeeth_usd = req.query.token_typeeth_usd ? req.query.token_typeeth_usd : null;
    // let token_typeeth_usdt = req.query.token_typeeth_usdt ? req.query.token_typeeth_usdt : null;
    let portfolio_id = req.query.portfolio_id ? req.query.portfolio_id : null;

    // console.log("add",from_address);
    try{
      await get_all_transaction_filter(wallet_id,token_type,start_timestamp,end_timestamp,token_typeusd,token_typeusdt,token_typebtc,token_typeeth,portfolio_id,res)
     
    }
    catch(error){
      res.send(error)
    }
  })




//---GET All Tokens of Chain LIST of an Address from DB---------------------------
  app.get(root_url+"/getAllTokensofWallet", async (req,res) => {
    const address_id = req.query.address_id ? req.query.address_id :null;
    try{
      await get_all_tokens (address_id,res)
      // await db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //   const sqlSelect = "SELECT * FROM pms_wallet_chain_token_list where address_id=?"
      //   await connection.query (sqlSelect,[address_id], (err, result)=> {
      //     if (err) throw (err)
      //       res.send(result) 
      //   })
      //   connection.release();
      // }) //end of connection.query()
    }
    catch(error){
      res.send(error)
    }
  }) //end of

// Get simple protocol list of wallet chain-----------------------------------------
  app.get(root_url+"/getProtocolsOnChain", async (req,res) => {
    const address_id = req.query.address_id ? req.query.address_id :null;
    try{
      await get_Protocols_OnChain(address_id,res)
      // await  db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //     const sqlSelect = "SELECT * FROM pms_wallet_simple_protocol where address_id=?"
      //     await connection.query (sqlSelect,[address_id], (err, result)=> {        
      //       if (err) throw (err)
      //         console.log(result)
      //       res.send(result) 
      //     })
      //     connection.release();
      //   }) //end of connection.query()
    }
    catch(error){
      res.send(error)
    }
  }) //end of api call

  
//UPDATE TRANSACTION LIST OF ADDRESS ----------------------------------------------------
  app.post(root_url+"/updateTransactionData", async (req,res) => {
    // const address_id = req.body.address_id ? req.body.address_id :null;
    const user_id = req.body.user_id ? req.body.user_id : null;
    const transaction_id = req.body.transaction_id ? req.body.transaction_id :null;
    const comments = req.body.comments? req.body.comments : null;
    const updated_time = new Date().getTime();
    try{
      // await  db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //   if(transaction_id !=null || comments!=null){
      //   const sqlSelect = "Update pms_wallet_transaction_history_list SET comments=? ,updated_time=? WHERE transaction_id =?"
      //     await connection.query (sqlSelect,[comments, updated_time ,transaction_id],async (err, result)=> {        
      //       if (err) throw (err)
      //       console.log(result)
      //       const sqlSelect2 = "Select * from pms_wallet_transaction_history_list Where transaction_id =?"
      //         await connection.query(sqlSelect2,[transaction_id], (err, result2)=> {        
      //           if (err) throw (err)
      //           console.log(result2)
      //           res.send(result2)
      //         })
      //     })
      //   }
      //   connection.release();
      // }) //end of connection.query()
      await update_transaction_data(user_id,transaction_id,comments,res)
    }
    catch(error){
      res.send(error)
    }
}) //end of api point

/////////////////////get payment_logs//////////////////////////////

app.get(root_url+"/getPaymentlogs", async(req,res)=>{
  // const user_id = req.query.user_id ? req.query.user_id : null;
  // const comment = req.query.comment ? req.query.comment : null;
    try {
        await get_payment_logs(res)
    } catch (error) {
      console.log(error);
    }
})
////////////////////////////////////////////////////////////

app.get(root_url+"/getTronAuditHistory", async(req,res)=>{
  // const user_id = req.query.user_id ? req.query.user_id : null;
  // const comment = req.query.comment ? req.query.comment : null;
    try {
        await get_tron_audit_history_list(res)
    } catch (error) {
      console.log(error);
    }
})
// ---------------------Get Trsansaction Audit History------------------------

app.get(root_url+"/getAddressTransactionAuditHistory", async(req,res)=>{
  // const user_id = req.query.user_id ? req.query.user_id : null;
  // const comment = req.query.comment ? req.query.comment : null;
    try {
        await get_address_transaction_audit(res)
    } catch (error) {
      console.log(error);
    }
})


//  ----------------------------------------------------------------------- XXXXXX

//   ----Get ASSET WALLET DATA FROM DATABASE-----------------
        // app.get("/getwalletofassets", async (req,res) => {
        //  const walletId = req.query.walletId
        //  try{
        //   await  db.getConnection( async (err, connection) => {
        //     if (err) throw (err)
        //     const sqlSelect = "SELECT * FROM pms_wallet_asset where walletId=?"
        //       await connection.query (sqlSelect,[walletId], (err, result)=> {
        //       if (err) throw (err)
        //       // console.log(result)
        //       res.send(result) 
        //    })
        //     connection.release();
        //   }) //end of connection.query()
        //   }
        //    catch(error){
        //      res.send(error)
        //    }
        //   }) //end of

        
//User History Address ------
      app.get(root_url+"/refreshWalletHistory", async (req,res) => {
         const walletId = req.query.walletId ? req.query.walletId :null;
         try{
          // await refreshWalletHistory(walletId,res)
          // }
          // catch(error){
          //   res.send(error)
          // }
           console.log("1");
         await db.getConnection( async (err, connection) => {
            console.log("2");
          if (err) throw (err)
          const sqlSelect = "SELECT * FROM pms_user_history where walletId=?"
            await connection.query (sqlSelect,[walletId], (err, result)=> {
            if (err) throw (err)
             res.send(result)
           })
           connection.release();
          }) //
        }
        catch(error){
          res.send(error)
        }
      }) //end of

//Refresh All   --------
  app.post(root_url+"/refreshUserData", async (req,res) => {
    const user_id = req.body.user_id ? req.body.user_id :null;
    const wallet_id = req.body.wallet_id ? req.body.wallet_id : null;
    const address_id = req.body.address_id ? req.body.address_id :null;
    const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;
    const address_name = req.body.address_name ? req.body.address_name : null;
    const address_type = req.body.address_type ? req.body.address_type : null;
      if(user_id!=null && wallet_id!=null && address_type!=null && portfolio_id!=null && address_name!=null && address_type!=null){
        try {
          await refreshallData(address_id, wallet_id, portfolio_id,address_name,address_type, res)
          // await refrefresh_user(address_id,res)
          await db.getConnection( async (err, connection) => {
          if (err) throw (err)
            const sqlSelect = "SELECT * FROM pms_user_balance where address_id=?"
            await connection.query (sqlSelect,[address_id], (err, result)=> {
              if (err) throw (err)
              res.send(result) 
            })
            connection.release();
        }) //end of
        } catch (error) {
            res.send(error) 
        }
      }
      else{
        res.send("There are some empty fields.")
      }  
  }) //

      // }) //end of


// //COMPLEX PROTOCOL LIST--------------------
// app.post("/pms/complex_protocol",async(req,res)=>{
//   const user_id = req.body.user_id;
//   const address_id = req.body.address_id;
//   try{
//     await complex_protocol(address_id,res)
//   }
//   catch(error){

//   }


// })

// ADD EXCHANGE ID---------------------------------
// pms_add_exchange() 


//GET USER INVESTMENT OF PORTFOLIO-------this is to be changed ----
  app.get(root_url+"/getExchangeData", async (req,res) => {
    const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id :null
      try{ 
        await get_exchange (portfolio_id,res)
        // await db.getConnection( async (err, connection) => {
        //   if (err) throw (err)
        //     const sqlSelect = "SELECT * FROM pms_user_exchange_info where portfolio_id=?"
        //     await connection.query (sqlSelect,[portfolio_id], (err, result)=> {
        //       if (err) throw (err)
        //       res.send(result) 
        //     })
        //     connection.release();
        // }) //end of
      }
      catch(error){
        res.send(error)
      }
  }) //end of
    
//////////////////////update exchange name//////////////////////////////////////////////////////////

app.post(root_url+"/updateExchange", async (req,res) => {
  // const address_id = req.body.address_id ? req.body.address_id :null;
  const exchange_name = req.body.exchange_name ? req.body.exchange_name : null;
  const apikey = req.body.apikey ? req.body.apikey : null;
  try{
    await update_exchange(exchange_name,apikey,res)
  }
  catch(error){
    res.send(error)
  }
})
////////////////////////////////////////////////////////////////////////////////////////////////

//-------------------------------------ADMIN API--------------------------------------------
app.post(root_url+"/updateTransaction",async (req,res)=>{
  const address_id = req.body.address_id ? req.body.address_id : null;
  try {
    await pms_fetch_address_transaction(address_id,res)
    try {
      await db.getConnection( async (err, connection) => {
          if (err) throw (err)
          try {
            const sqlSelect = "SELECT * FROM pms_wallet_transaction_history_list where address_id=?"
            await connection.query (sqlSelect,[address_id],async (err, newresult)=> {        
              if (err) throw (err);
              if (newresult && newresult.length!=0) {
                console.log(newresult);
                res.send("Address Trsansaction History Updated")
              }
              else{
                res.send("No Transaction History")
              }
            })
          } catch (error) {
            console.log("Transaction History Not Updated");
            res.send("Transaction History Not Updated")
          }
          connection.release();
      })
    }
    catch(error){
      console.log(error);
      res.send("address is empty")
    }
  } catch (error) {
    console.log(error);
  }
})

//----------------------GET History of Investments------------------------------------------------------------
app.get(root_url+"/gethistoryOfInvestment", async(req,res) =>{
  const investment_id = req.query.investment_id ? req.query.investment_id : null;
  try {
      await get_history_of_investment(investment_id,res)
  } catch (error) {
    console.log(error);
  }
})

// -----------------------------ADMIN Update  PERSON Detail--------------------------------------------
app.post(root_url+"/updatePerson", async (req,res) => {
  const person_id = req.body.person_id ? req.body.person_id : null;
  const user_id = req.body.user_id ?req.body.user_id : null;
  const user_name = req.body.user_name ? req.body.user_name : null;
  const phone = req.body.phone ? req.body.phone : null;
  const email_id = req.body.email_id ? req.body.email_id : null;
  try{ 
    await update_person(person_id,user_id,user_name,phone,email_id,res)
    // await db.getConnection( async (err, connection) => {
    //   if (err) throw (err)
    //   const sqlSelect = "SELECT * FROM pms_users where user_id=?"
    //   await connection.query (sqlSelect,[user_id],async (err, result)=> {
    //     if (err) throw (err)
    //   console.log(result)      
    //       let sql = "UPDATE pms_person_list SET name=?, phone=?, email_id=? where id=?"
    //         await db.query(sql, [ user_name, phone, email_id, person_id ],async function (error, updatedres, updatedfields) {     
    //         if (error) throw (error)
    //         console.log(updatedres);
    //           let sql = "UPDATE pms_party_list SET name=? where belongs_to=?"
    //           await db.query(sql, [user_name, person_id],async function (error, updatedres1, updatedfields) {     
    //           if (error) throw (error)
    //           console.log(updatedres1);
    //           const sqlSelect2 = "SELECT * FROM pms_person_list where id=?"
    //             await connection.query (sqlSelect2,[person_id],async (err, getresult)=> {
    //               if (err) throw (err)
    //               console.log(getresult)
    //               res.send(getresult)
    //             })
    //           })
    //         })
    //   })
    //   connection.release();
    // }) //end of
  }
  catch(error){
    res.send(error)
  }
}) //end of

//----------------------------------Admin Update Organisation---------------------------------------------------
app.post(root_url+"/updateOrganisation", async (req,res) => {
  const org_id = req.body.org_id ? req.body.org_id : null;
  const user_id = req.body.user_id ?req.body.user_id : null;
  const org_name = req.body.org_name ? req.body.org_name : null;
  const tax_id = req.body.tax_id ? req.body.tax_id : null;
  const address = req.body.address ? req.body.address : null;
  const city = req.body.city ? req.body.city : null;
  const country = req.body.country ? req.body.country : null;
    try{ 
      await update_organisation(org_id,user_id,org_name,tax_id,address,city,country,res)
      // await db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //   const sqlSelect = "SELECT * FROM pms_users where user_id=?"
      //   await connection.query (sqlSelect,[user_id],async (err, result)=> {
      //     if (err) throw (err)
      //     console.log(result)      
      //         // res.send(result) 
      //     let sql = "UPDATE pms_organisations_list SET name=?, address=?, tax_id=?, city=?, country=? where id=?"
      //       await db.query(sql, [ org_name, address, tax_id, city, country, org_id ],async function (error, updatedres, updatedfields) {     
      //       if (error) throw (error)
      //       console.log(updatedres);
      //       //  res.send(updatedres) 
      //           let sql = "UPDATE pms_party_list SET name=? where belongs_to=?"
      //         await db.query(sql, [org_name, org_id],async function (error, updatedres1, updatedfields) {     
      //         if (error) throw (error)
      //         console.log(updatedres1);
      //           const sqlSelect = "SELECT * FROM pms_organisations_list where id=?"
      //             await connection.query (sqlSelect,[org_id],async (err, getresult)=> {
      //               if (err) throw (err)
      //               console.log(getresult)
      //               res.send(getresult)
      //           })
      //         })
      //     })
      //   })
      // connection.release();
      // }) //end of
    }
    catch(error){
      res.send(error)
    }
  }) //end of


//DELETE  all data
//Delete Person From Table ----------------------
     app.delete(root_url+"/deletePerson", async (req,res) => {
         const party_id = req.query.party_id ? req.query.party_id:null;
        //  const user_id = req.query.user_id;
         try{  
          db.getConnection( async (err, connection) => {
              const sqlDelete = "DELETE FROM pms_person_list WHERE party_id=?"
              const delete_query = mysql.format(sqlDelete,[party_id])
              await connection.query (delete_query,async (err, result)=> {
                  if (err) throw (err)
                  console.log("Number of records deleted:" + result.affectedRows);
                // res.send(result) 
                  const sqlDelete2 = "DELETE FROM pms_party_list WHERE party_id=?"
                  const delete_query2 = mysql.format(sqlDelete2,[party_id])
                    await connection.query (delete_query2, (err, result)=> {
                    if (err) throw (err)
                      console.log("Number of records deleted:" + result.affectedRows);
                      res.send(result)
                  })
              })
            connection.release();
          })
        }
        catch(error){
          res.send(error)
        }
      }) //end of
  

//Delete Organisation From Table ---------------------- 
     app.delete(root_url+"/deleteOrganisation", async (req,res) => {
         const party_id = req.query.party_id ? req.query.party_id:null;
        //  const user_id = req.query.user_id;
         try{ 
           db.getConnection( async (err, connection) => {
              const sqlDelete = "DELETE FROM pms_organisations_list WHERE party_id=?"
              const delete_query = mysql.format(sqlDelete,[party_id])
                await connection.query (delete_query,async (err, result)=> {
                if (err) throw (err)
                console.log("Number of records deleted:" + result.affectedRows);
                // res.send(result) 
                const sqlDelete2 = "DELETE FROM pms_party_list WHERE party_id=?"
                const delete_query2 = mysql.format(sqlDelete2,[party_id])
                  await connection.query (delete_query2, (err, result)=> {
                if (err) throw (err)
                  console.log("Number of records deleted:" + result.affectedRows);
                    res.send(result)
                })
              })
            connection.release();
          })
        }
        catch(error){
          res.send(error)
        }
      }) //end of



//------------------------GET ALL PORTFOLIO-------------------------------------------------------
app.get(root_url+"/getAllPortfolio", async (req,res) => {
  let date =new Date().toUTCString()
    console.log(date);
    try{ 
      await get_all_portfolio(res)

      // await db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //   const sqlSelect = "SELECT * FROM pms_portfolio"
      //     await connection.query (sqlSelect,[date],async (err, result)=> {        
      //       if (err) throw (err)  
      //       result.sort(function (a, b) {
      //       var dateA = new Date(a.updated_date), dateB = new Date(b.updated_date)
      //       return  dateB -dateA
      //       });
      //       res.send(result) 
      //     })
      //   connection.release();
      // }) //end of connection 
    }
    catch(error){
      res.send(error)
    }
  }) //end of api

//-------------------------GET ALL PARTYPORTFOLIO of PORTFOLIO---------------------------
app.get(root_url+"/getPrtyPortfolioOfaPortfolio", async (req,res) => {
  const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id: null;
    try{ 
      await get_party_port_of_portfolio (portfolio_id,res)

      // await db.getConnection( async (err, connection) => {
      //   if (err) throw (err)
      //   try {
      //     const sqlSelect = "SELECT * FROM pms_party_portfolio where portfolio_id=?"
      //     await connection.query (sqlSelect,[portfolio_id],async (err, result)=> {        
      //       if (err) throw (err)  
      //       res.send(result) 
      //     })
      //   } catch (error) {
      //    console.log(release); 
      //   }
      //   connection.release();
      // }) //end of connection
    }
    catch(error){
      res.send(error)
    }
  }) //end of api
  // app.get(root_url+"/getcron", async (req,res) => {
  //   // const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id: null;
  //     try{ 
  //       await get_change_Wallet_asset_protocol (res)
  
  //       // await db.getConnection( async (err, connection) => {
  //       //   if (err) throw (err)
  //       //   try {
  //       //     const sqlSelect = "SELECT * FROM pms_party_portfolio where portfolio_id=?"
  //       //     await connection.query (sqlSelect,[portfolio_id],async (err, result)=> {        
  //       //       if (err) throw (err)  
  //       //       res.send(result) 
  //       //     })
  //       //   } catch (error) {
  //       //    console.log(release); 
  //       //   }
  //       //   connection.release();
  //       // }) //end of connection
  //     }
  //     catch(error){
  //       res.send(error)
  //     }
  //   }) //end of api
  
  
//---------------GET Portfolio Of A USer-----------------------------------------
  app.get(root_url+"/getAllPartyPortfolio", async (req,res) => {
    const party_id = req.query.party_id ? req.query.party_id : null;
      try{ 
        await get_all_portfolio_party (party_id,res)

        // await db.getConnection( async (err, connection) => {
        //   if (err) throw (err)
        //   const sqlSelect = "SELECT * FROM pms_party_portfolio where party_id=?"
        //     await connection.query (sqlSelect,[party_id],async (err, result)=> {        
        //       if (err) throw (err)  
        //       res.send(result) 
        //    })
        //    connection.release();
        //   }) //end of
      }
      catch(error){
        res.send(error)
      }
  }) //end of

// ---------------------------------------Get all Users in App------
app.get(root_url+"/admin/getAllUsers", async (req,res) => {
  const user_id = req.query.user_id ? req.query.user_id :null;
  try{
     await get_all_user(user_id,res)
    // await  db.getConnection( async (err, connection) => {
    //   if (err) throw (err)
    //   const sqlSelect = "SELECT * FROM pms_users where user_id=?"
    //     await connection.query (sqlSelect,[user_id],async (err, result)=> {        
    //     if (err) throw (err)
    //     console.log(result)
    //     console.log(result[0].user_type);
    //     user_type = await result[0].user_type;
    //     if(user_type.toLowerCase()=="admin" || user_type.toLowerCase()=="accountant"){
    //       const sqlSelect = "SELECT * FROM pms_users"
    //         await connection.query (sqlSelect,[user_id],async (error, result)=> {        
    //           if (error) throw (error)
    //           console.log(result);
    //           res.send(result)
    //         })
    //       }
    //       else{
    //         console.log("You are not a Authorised User.");
    //           res.send("You are not a Authorised User.")
    //       }
    //     // res.send(result) 
    //     })
    //     connection.release();
    // }) //end of connection.query()
  }
  catch(error){
    res.send(error)
  }
}) 


//-------------------------------- GET all admin Wallets of Users----------------------
  app.get(root_url+"/admin/getWalletsofPortfolio", async (req,res) => {
    const user_id = req.query.user_id ? req.query.user_id:null;
    const admin_id = req.query.admin_id ? req.query.admin_id :null;
    try{
    // await get_wallet_of_portfolio(user_id,admin_id,res)
      await  db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSelect = "SELECT * FROM pms_users where user_id=?"
          await connection.query (sqlSelect,[admin_id],async (err, result)=> {        
          if (err) throw (err)
          console.log(result)
          console.log(result[0].user_type);
          user_type = await result[0].user_type;
          if(user_type.toLowerCase()=="admin" || user_type.toLowerCase()=="accountant"){
            const sqlSelect = "SELECT * FROM pms_user_wallet where userId=?" 
              await connection.query (sqlSelect,[user_id],async (error, result)=> {        
                if (error) throw (error)
                console.log(result);
                res.send(result)
              })
            }
            else{
              console.log("You are not a Authorised User.");
              res.send("You are not a Authorised User.")
            }
          // res.send(result) 
          })
          connection.release();
      }) //end of connection.query()
    }
    catch(error){
      res.send(error)
    }
  }) 

//-------------GET All Address of Single Portfolio ---------------------------------------------
app.get(root_url+"/getAddressesofPortfolio", async (req,res) => {
    const portfolio_id = req.query.portfolio_id
    try{
       await  get_address_portfolio(portfolio_id,res)
      // await  db.getConnection( async (err, connection) => {
      // if (err) throw (err)
      //     const sqlSelect = "SELECT * FROM pms_user_balance where portfolio_id=?" 
      //       await connection.query (sqlSelect,[portfolio_id],async (error, result)=> {        
      //         if (error) throw (error)
      //         console.log(result);
      //         res.send(result)
      //       })
      // connection.release();
      // }) //end of connection.query()
    }
    catch(error){
    res.send(error)
    }
})

//--------------------------GET All Address of Single Wallet ---------------------------------------------
app.get(root_url+"/admin/getAddressofUsersWallet", async (req,res) => {
    const user_id = req.query.user_id ? req.query.user_id: null;
    const admin_id = req.query.admin_id ? req.query.admin_id :null;
    const wallet_id = req.query.wallet_id ? req.query.wallet_id:null;
    try{
      await  db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSelect = "SELECT * FROM pms_users where user_id=?"
          await connection.query (sqlSelect,[admin_id],async (err, result)=> {        
            if (err) throw (err)
            console.log(result)
            console.log(result[0].user_type);
            user_type = await result[0].user_type;
              if(user_type.toLowerCase()=="admin" || user_type.toLowerCase()=="accountant"){
                const sqlSelect = "SELECT * FROM pms_user_balance where wallet_id=?" 
                  await connection.query (sqlSelect,[wallet_id],async (error, result)=> {        
                    if (error) throw (error)
                    console.log(result);
                    res.send(result)
                  })
                }
                else{
                  console.log("You are not a Authorised User.");
                  res.send("You are not a Authorised User.")
                }
          })
        connection.release();
      }) //end of connection.query()
    }
    catch(error){
    res.send(error)
    }
})

// ---------------GET --Address--Snapshot----Data---------------------------
app.get(root_url+"/getAddressDaliySnapshot", async (req,res) => {
  const address_id = req.query.address_id ? req.query.address_id: null;
  try {
      if (address_id!=null) {
        await get_address_daily_snapshot(address_id,res)
      }
      else{
        res.send("No Address ID")
      }
  } catch (error) {
    console.log(error);
  }
})

// ------------Get all wallets of portfolio-------------
app.get(root_url+"/getallportfolioWallets", async (req,res)=>{
  const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id : null;
  try {
    await get_wallet_list_of_portfolio(portfolio_id,res)
  } catch (error) {
    console.log(error);
  }
})

////////////////////////////////////get all port with address/////////////////////////

app.get(root_url+"/getallportfolioWallets_address", async (req,res)=>{
  const portfolio_id = req.query.portfolio_id ? req.query.portfolio_id : null;
  try {
    await get_all_port_wallet_address(portfolio_id,res)
  } catch (error) {
    console.log(error);
  }
})

// -----------------------------Udpate---SINGLE---- DATA------------------------------------

//-------------------------------Change Wallet ID Linked to An Address---------------------------------
app.post(root_url+"/admin/updateAddress", async (req,res) => {
    const user_id = req.body.user_id ? req.body.user_id : null
    const admin_id = req.body.admin_id ? req.body.admin_id : null
    const wallet_id = req.body.wallet_id ? req.body.wallet_id : null
    const address_id = req.body.address_id ? req.body.address_id : null
    const portfolio_id = req.body.portfolio_id ?req.body.portfolio_id : null
    try{
      await  db.getConnection( async (err, connection) => {
      if (err) throw (err)
      const sqlSelect = "SELECT * FROM pms_users where user_id=?"
        await connection.query (sqlSelect,[admin_id],async (err, result)=> {        
          if (err) throw (err)
          console.log(result)
          console.log(result[0].user_type);
          user_type = await result[0].user_type;
            if(user_type.toLowerCase()=="admin" || user_type.toLowerCase()=="accountant"){
              let sql = "UPDATE pms_user_balance SET user_id=?, wallet_id=?, portfolio_id=?,  timeStamp=? where  address_id=?;"
                await db.query(sql, [user_id, wallet_id, new Date().toUTCString(), address_id ],async function (error, updatedres, updatedfields) {     
                  if (error) throw (error)
                  console.log(updatedres);
                  res.send(updatedres)
                })
              }
          else{
            console.log("You are not a Authorised User.");
            res.send("You are not a Authorised User.")
          }
        })
        connection.release();
      }) //end of connection.query()
    }
    catch(error){
      res.send(error)
    }
})

// -------------------------APACHE SUPERSET LOGIN API--------------------------------------
app.post("/api/login_superset",async(req,res)=>{
  let getusername = req.body.username ? req.body.username: null;
  // let getpassword = req.body.password ? req.body.password: null;
  try {
      if(getusername !=null || getpassword!=null){
        await  pms_superset_login(getusername,res)
      }
      else{
        res.send("User Field is Empty.")
      }
  } catch (error) {
    console.log(error);
  }
})


// -----------------------------------ADDRESS VALIDATOR---------------------------------------
app.post(root_url+"/address_validate", async (req,res) => {
  const address_id = req.body.address_id ? req.body.address_id : null;
  const address_type = req.body.address_type ? req.body.address_type : null;
  try {
      if (address_type.toUpperCase() == 'ETH' || address_type.toUpperCase() =='BTC' || address_type.toUpperCase() == 'TRX' ) {
        await pms_validate_address(address_id,address_type,res)
      }
      else{
        res.send("Address type should be in BTC OR ETH");
      }
  } catch (error) {
    console.log(error);
    res.send("Error",error)
  }
})

// --------------------ADD--tron--data------
app.post(root_url + "/add_tron_balance", async (req, res) => {
  let address_id = req.body.address_id ? req.body.address_id : null;
  let wallet_id = req.body.wallet_id ? req.body.wallet_id : null;
  let portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;
  let address_type = req.body.address_type ? req.body.address_type : null;
  let address_name = req.body.address_name ? req.body.address_name : null;
  try {
    await check_tron(address_id, wallet_id, portfolio_id,address_name,address_type,res);
  } catch (error) {
    res.send(error);
  }
})

//  ---------GET TRON ADDRESS DATA BY ADDRESS-----------------------------------------
app.get(root_url + "/get_tron", async (req, res) => {
  let wallet_id = req.query.wallet_id ? req.query.wallet_id : null;
  let address_type = req.query.address_type ? req.query.address_type : null;

  if (address_type == "TRON") {
    try {
      await get_tron_address_data(wallet_id, res);
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    res.send("Addres type is not TRON.")
  }
})

app.get(root_url + "/get_tron_balance_portfolio", async (req, res) => {
  let portfolio_id = req.query.portfolio_id ? req.query.portfolio_id : null;
  let address_type = req.query.address_type ? req.query.address_type : null;
  if (address_type == "TRON") {
    try {
      await get_tron_balance_wallet(portfolio_id,res)
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    res.send("Addres type is not TRON.")
  }
})
//  ---------GET TRON ADDRESS CHAIN DATA BY ADDRESS-----------------------------------------
app.get(root_url + "/get_tron_address_chain", async (req, res) => {
  let address_id = req.query.address_id ? req.query.address_id : null;
  let address_type = req.query.address_type ? req.query.address_type : null;
  console.log('*****',address_id,address_type)
  if (address_type == "TRON") {
    try {
      await tron_add_chain(address_id, res);
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    res.send("Addres type is not TRON.")
  }
})

//------------------Add transaction tron post api ----------------------------------

app.post(root_url + "/tron_transactions", async (req, res) => {
  let address_id = req.body.address_id ? req.body.address_id : null;
  let address_type = req.body.address_type ? req.body.address_type : null;
  let comment = req.body.comment ? req.body.comment : null;
  try {
    await tron_transaction(address_id,address_type,comment,res);
  } catch (error) {
    res.send(error);
  }
})

/////////////////////////////////////////////////tron all transaction data////////////////////////

app.post(root_url + "/all_trondata_transaction", async (req, res) => {
  let address_id = req.body.address_id ? req.body.address_id : null;
  let address_type = req.body.address_type ? req.body.address_type : null;
  // let comment = req.body.comment ? req.body.comment : null;
  try {
    await all_trondata_transaction(address_id,address_type,res);
  } catch (error) {
    res.send(error);
  }
})
/////////////////////////////////////////////////////////////////////////////////////

//////////////////////load many tron transaction//////////////////////////////

app.post(root_url + "/load_all_tron_transactions", async (req, res) => {
  let address_id = req.body.address_id ? req.body.address_id : null;
  let address_type = req.body.address_type ? req.body.address_type : null;
  let start = req.body.start ? req.body.start : null;
  let comment = req.body.comment ? req.body.comment : null;
  try {
    await load_tron_transaction(address_id,address_type,start,comment,res);
  } catch (error) {
    res.send(error);
  }
})

////////////////////////////refresh_tron////////////////////////

app.post(root_url + "/refresh_all_tron_transactions", async (req, res) => {
  let address_id = req.body.address_id ? req.body.address_id : null;
  let address_type = req.body.address_type ? req.body.address_type : null;
  let start = req.body.start ? req.body.start : null;
  try {
    await refresh_tron_transaction(address_id,address_type,start,res);
  } catch (error) {
    res.send(error);
  }
})
//----------------Add  tron transaction get api  -----------------------------------

app.get(root_url + "/get_tron_transactions", async (req, res) => {
  let address_id = req.query.address_id ? req.query.address_id : null;
  let address_type = req.query.address_type ? req.query.address_type : null;
  // let comment = req.query.comment ? req.query.comment : null;
  if (address_type == "TRON") {
    try {
      await get_tron_transaction(address_id, res);
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    res.send("Addres type is not TRON.")
  }
})

///////////////////////////get_filter_tron_api/////////////////

app.get(root_url + "/get_tron_transactions_filter", async (req, res) => {
  let address_id = req.query.address_id ? req.query.address_id : null;
  let address_type = req.query.address_type ? req.query.address_type : null;
  let token_type = req.query.token_type ? req.query.token_type : null;
  let start_timestamp = req.query.start_timestamp ? req.query.start_timestamp : null;
  let end_timestamp = req.query.end_timestamp ? req.query.end_timestamp : null;
  let token_typeusd = req.query.token_typeusd ? req.query.token_typeusd : null;
  let token_typeusdt = req.query.token_typeusdt ? req.query.token_typeusdt : null;
  // let comment = req.query.comment ? req.query.comment : null;
  if (address_type == "TRON") {
    try {
      await get_tron_transaction_filter(address_id,token_type,start_timestamp,end_timestamp,token_typeusd,token_typeusdt, res);
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    res.send("Addres type is not TRON.")
  }
})

///////////////////////////////////get all tran///////////////




app.get(root_url + "/get_all_transactions", async (req, res) => {
  let portfolio_id = req.query.portfolio_id ? req.query.portfolio_id : null;
  // let address_type = req.query.address_type ? req.query.address_type : null;
  // let comment = req.query.comment ? req.query.comment : null;
  // if (address_type == "TRON") {
    try {
      await get_all_transaction_data(portfolio_id, res);
    }
    catch (error) {
      res.send(error);
    }
  // }
  // else {
  //   res.send("Addres type is not TRON.")
  // }
})

// ===================Update Tron_Transactions_Comment==========================================
app.post(root_url + "/update_tron_transactions_comment", async (req, res) => {
  let  hash= req.body.hash ? req.body.hash : null;
  let comment = req.body.comment ? req.body.comment : null;
  try {
    await update_tron_transactions_comment(hash,comment,res);
  } catch (error) {
    res.send(error);
  }
})

////////////////////////////////////////all trancomment/////////////////////////


app.post(root_url + "/update_all_transactions_comment", async (req, res) => {
  let  hash_id= req.body.hash_id ? req.body.hash_id : null;
  let comment = req.body.comment ? req.body.comment : null;
  try {
    await create_transactions_comment_for_all(hash_id,comment,res);
  } catch (error) {
    res.send(error);
  }
})
/////////////////////////////////////////////////////////////load debank data////////////////////////

app.post(root_url+"/load_debank_data", async (req,res) =>{
  const address_id = req.body.address_id ? req.body.address_id : null;
  const start_time = req.body.start_time ? req.body.start_time : null;
  // const comments = req.body.comments ? req.body.comments : null;
  try {
    await get_load_history_list(address_id,start_time,res)
  } catch (error) {
    console.log(error);
  }
})

////////////////////////////////refresh dbank data///////////////////////////

/////////////////////////////////////////////////////////////load debank data////////////////////////

app.post(root_url+"/refresh_debank_data", async (req,res) =>{
  const address_id = req.body.address_id ? req.body.address_id : null;
  const start_time = req.body.start_time ? req.body.start_time : null;
  // const comments = req.body.comments ? req.body.comments : null;
  try {
    await get_refresh_history_list(address_id,start_time,res)
  } catch (error) {
    console.log(error);
  }
})

//-----------------Add delete tron address api --------------------------------

app.delete(root_url+"/deleteAddressData", async (req,res) => {
  const address_id = req.query.address_id ? req.query.address_id :null ;
  const address_type = req.query.address_type ? req.query.address_type :null ;
    try{ 
        if(address_id!=null || address_id!= undefined && address_type!=null || address_type!=undefined && address_type=='TRON'){
          await delete_tron_address(address_id,res)
          // await res.send("ADDRESS DELETED")
        }
        else{
          res.send("NOT A Valid Address ID.")
        }
      }
    catch(error){
        res.send(error)
    }
  }) 


  //======================btc_balance=====================================================
app.post(root_url + "/add_btc_balance", async (req, res) => {
  let btc_address_id = req.body.btc_address_id ? req.body.btc_address_id : null;
  let address_type = req.body.address_type ? req.body.address_type : null;
  let portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;

  let wallet_id = req.body.wallet_id ? req.body.wallet_id : null;

  let address_name = req.body.address_name ? req.body.address_name : null;
  try {
    await check_btc(btc_address_id,address_type,portfolio_id,wallet_id,address_name,res);
  } catch (error) {
    res.send(error);
  }
})

//=======================get_btc_all_data=======================================================


app.get(root_url + "/get_btc", async (req, res) => {
  // let wallet_id = req.query.wallet_id ? req.query.wallet_id : null;
  let portfolio_id =req.query.portfolio_id ? req.query.portfolio_id : null;
  let address_type = req.query.address_type ? req.query.address_type : null;

  if (address_type == "BTC") {
    try {
      await btc_balance_data(portfolio_id,res);
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    res.send("Addres type is not BTC.")
  }
})
///////////////////////////////


app.get(root_url + "/get_btc_txc", async (req, res) => {
  let btc_address_id = req.query.btc_address_id ? req.query.btc_address_id : null;
  let address_type = req.query.address_type ? req.query.address_type : null;
  console.log('*****',btc_address_id,address_type)
  if (address_type == "BTC") {
    try {
      await get_btc_transaction(btc_address_id, res);
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    res.send("Addres type is not BTC.")
  }
})
////
app.delete(root_url+"/deletebtcAddressData", async (req,res) => {
  const btc_address_id = req.query.btc_address_id ? req.query.btc_address_id :null ;
  const address_type = req.query.address_type ? req.query.address_type :null ;
    try{ 
        if(btc_address_id!=null || btc_address_id!= undefined && address_type!=null || address_type!=undefined && address_type=='BTC'){
          await delete_btc_address(btc_address_id,res)
          // await res.send("ADDRESS DELETED")
        }
        else{
          res.send("NOT A Valid Address ID.")
        }
      }
    catch(error){
        res.send(error)
    }
  }) 

// update _accountancy ===============================================================================

app.post(root_url+"/update_accountancy", async (req,res) => {
  
  const game_id = req.body.game_id ? req.body.game_id :null;
  const game = req.body.game ? req.body.game :null;
  const game_details = req.body.game_details ? req.body.game_details :null;
  const venue = req.body.venue ? req.body.venue :null;
  const type = req.body.type ? req.body.type :null;
  const host = req.body.host ? req.body.host : null;
  const group = req.body.group? req.body.group:null;
  const player = req.body.player ? req.body.player : null;
  const shareholders = req.body.shareholders ? req.body.shareholders : null;
  const owner_ship = req.body.owner_ship ? req.body.owner_ship : null;
  const  result= req.body.result ? req.body.result : null;
  const date_created =req.body.date_created ? req.body.date_created : null;
  const share_holder = req.body.share_holder ? req.body.share_holder : null;
  const exchange_rate = req.body.exchange_rate ? req.body.exchange_rate : null;
  const comment = req.body.comment ? req.body.comment : null;

  try{
    
    await update_accountancy(game_id,game,game_details,venue,type,host,group,player,shareholders,result,owner_ship,date_created,share_holder,exchange_rate,comment,res)
     }
     catch(err){
       res.send(err)
     }
  }) 

  app.post(root_url+"/pms_update_acc", async (req,res) => {
  
    const game_id = req.body.game_id ? req.body.game_id :null;
    const game = req.body.game ? req.body.game :null;
    const game_details = req.body.game_details ? req.body.game_details :null;
    const venue = req.body.venue ? req.body.venue :null;
    const type = req.body.type ? req.body.type :null;
    const host = req.body.host ? req.body.host : null;
    const group = req.body.group? req.body.group:null;
    const player = req.body.player ? req.body.player : null;
    const shareholders = req.body.shareholders ? req.body.shareholders : null;
    const owner_ship = req.body.owner_ship ? req.body.owner_ship : null;
    const  result= req.body.result ? req.body.result : null;
    const date_created =req.body.date_created ? req.body.date_created : null;
    const share_holder = req.body.share_holder ? req.body.share_holder : null;
    const exchange_rate = req.body.exchange_rate ? req.body.exchange_rate : null;
    const comment = req.body.comment ? req.body.comment : null;
  
    try{
      
      await update_acc(game_id,game,game_details,venue,type,host,group,player,shareholders,result,owner_ship,date_created,share_holder,exchange_rate,comment,res)
       }
       catch(err){
         res.send(err)
       }
    })
  
  //end of app.post()

  app.delete(root_url+"/delete_accountancy", async (req,res) => {
    const game_id = req.query.game_id ? req.query.game_id :null ;
      try{ 
          if(game_id!=null || game_id!= undefined){
            await delete_accountancy(game_id,res)
            // await res.send("ADDRESS DELETED")
          }
          else{
            res.send("NOT A Valid Address ID.")
          }
        }
      catch(error){
          res.send(error)
      }
    }) 

app.delete(root_url+"/delete_all_accountancy", async (req,res) => {
      const delete_game = req.body.delete_game ? req.body.delete_game :null ;
        try{ 
            // if(game_id!=null || game_id!= undefined){
              await delete_all_accountancy(delete_game,res)
              // await res.send("ADDRESS DELETED")
           
          }
        catch(error){
            res.send(error)
        }
      })

app.delete(root_url+"/delete_share_holder", async (req,res) => {
    const holder_id = req.query.holder_id ? req.query.holder_id :null ;
      try{ 
          if(holder_id!=null || holder_id!= undefined){
            await delete_shareholder(holder_id,res)
            // await res.send("ADDRESS DELETED")
          }
          else{
            res.send("NOT A Valid Address ID.")
          }
        }
      catch(error){
          res.send(error)
      }
})

////////////////////////////////////delete all share holder data///////////////////////////////

app.delete(root_url+"/delete_all_share_holder", async (req,res) => {
  // const holder_id = req.query.holder_id ? req.query.holder_id :null ;
  const share_id = req.query.share_id ? req.query.share_id :null ;
    try{ 
        // if((holder_id!=null || holder_id!= undefined) && (share_id==null || share_id==undefined)){
        //   await delete_all_share_holder(holder_id,res)
        //   // await res.send("ADDRESS DELETED")
        // }
        if(share_id!=null || share_id!=undefined){
          await delete_all_share_holder(share_id,res)

        }
        else{
          res.send("NOT A Valid Address ID.")
        }
      }
    catch(error){
        res.send(error)
    }
  })

///////////////////////////////////////////////////////////////////

app.post(root_url + "/accountancy_entity", async (req, res) => {
  let name = req.body.name ? req.body.name : null;
  let type = req.body.type ? req.body.type : null;
  try {
    await create_entity(name,type,res);
  } catch (error) {
    res.send(error);
  }
})

app.get(root_url + "/get_entity", async (req,res) =>{
  // const share_holder_name = req.query.share_holder_name ? req.query.share_holder_name : null;
    try {
       await get_entity(res);
    } catch (error) {
      res.send(error)
    }
})

app.get(root_url + "/get_ledgre", async (req,res) =>{
  // const share_holder_name = req.query.share_holder_name ? req.query.share_holder_name : null;
    try {
       await get_ledgre(res);
    } catch (error) {
      res.send(error)
    }
})

app.post(root_url + "/update_status", async (req, res) => {
  let  game_id= req.body.hash ? req.body.hash : null;
  let status = req.body.comment ? req.body.comment : null;
  try {
    await update_status(game_id,status,res);
  } catch (error) {
    res.send(error);
  }
})

app.post(root_url+"/updatestatus", async (req,res) => {
  const status_detail  = req.body.status_detail ? req.body.status_detail: null;
  try{
    await update_status(status_detail,res)
  }
  catch(error){
    res.send(error)
  }
})

app.post(root_url+"/update_shareholder", async (req,res) => {
  const share_holder  = req.body.share_holder? req.body.share_holder: null;
  try{
    await update_shareholder(share_holder,res)
  }
  catch(error){
    res.send(error)
  }
})
////////////////////////////////////////////////

app.get(root_url+"/getAllTransactionHistoryofTron", async (req,res) => {
  const address_id = req.query.address_id ? req.query.address_id :null;
  console.log("add",address_id);
  try{
    await transaction_history(address_id,res)
   
  }
  catch(error){
    res.send(error)
  }
}) 
////update accountancy /////////////////////////////////////////////////////////////

app.post(root_url+"/update_all_game", async (req,res) => {
  const share_holder  = req.body.share_holder? req.body.share_holder: null;
  // const game_id = req.body.game_id ? req.body.game_id:null;
  try{
    await update_all(share_holder,res)
  }
  catch(error){
    res.send(error)
  }
})


//////////////////////////

app.post(root_url+"/update_share", async (req,res) => {
  const share_holder  = req.body.share_holder? req.body.share_holder: null;
  // const game_id = req.body.game_id ? req.body.game_id:null;
  try{
    await update_share(share_holder,res)
  }
  catch(error){
    res.send(error)
  }
})
///////////////////////////////////// upload excel data////////////////////////
app.post(root_url+"/upload_file", async (req,res) => {
  const share_holder  = req.body.share_holder? req.body.share_holder: null;
  // const game_id = req.body.game_id ? req.body.game_id:null;
  try{
    await upload_excel(share_holder,res)
  }
  catch(error){
    res.send(error)
  }
})
///////////////////////////////////////////////////////////////

/////////////////ledgre_entity///////////////////////////////////////

app.post(root_url+"/create_ledger", async (req,res) => {
  // const address_id = req.body.address_id ? req.body.address_id :null;
  // const ledger_id = req.body.ledger_id ? req.body.ledger_id : null;
  const game_id = req.body.game_id ? req.body.game_id :null;
  const entity_type = req.body.entity_type ? req.body.entity_type :null;
  const updated_time = new Date().getTime();
  try{
    await create_ledger(game_id,entity_type,res)
  }
  catch(error){
    res.send(error)
  }
})


/////////////////////////////////////////////////////////////////

app.post(root_url+"/update_entity", async (req,res) => {
  
  let id = req.body.id ? req.body.id :null;
  let name = req.body.name ? req.body.name :null;
  let type = req.body.type ? req.body.type :null;
  try{
    await update_entity(id,name,type,res)
     }
     catch(err){
       res.send(err)
     }
  })

  ///delete entity================================================
  app.delete(root_url+"/delete_entity", async (req,res) => {
    let id = req.query.id ? req.query.id :null ;
      try{ 
          if(id!=null || id!= undefined){
            await delete_entity(id,res)
            // await res.send("ADDRESS DELETED")
          }
          else{
            res.send("NOT A Valid Address ID.")
          }
        }
      catch(error){
          res.send(error)
      }
    }) 
app.post(root_url + "/create_payment", async (req, res) => {
      let user_id = req.body.user_id ? req.body.user_id : null;
      let payment_id = req.body.payment_id ? req.body.payment_id : null;
      let sender = req.body.sender ? req.body.sender : null;
      let reciever = req.body.reciever ? req.body.reciever : null;
      let amount = req.body.amount ? req.body.amount : null;
      let currency = req.body.currency ? req.body.currency : null;
      let exchange_rate = req.body.exchange_rate ? req.body.exchange_rate : null;
      let payment_type = req.body.payment_type ? req.body.payment_type : null;
      let result_usd = req.body.result_usd ? req.body.result_usd : null;
      let comment = req.body.comment ? req.body.comment : null;

      try {
        await create_payment(user_id,payment_id,sender,reciever,amount,currency,exchange_rate,payment_type,result_usd,comment,res);
      } catch (error) {
        res.send(error);
      }
    })


    app.get(root_url + "/get_payment", async (req,res) =>{
      // const share_holder_name = req.query.share_holder_name ? req.query.share_holder_name : null;
        try {
           await get_payment(res);
        } catch (error) {
          res.send(error)
        }
    })

    app.post(root_url+"/update_payment", async (req,res) => {
      const user_id = req.body.user_id ? req.body.user_id:null;
      const payment_id = req.body.payment_id ? req.body.payment_id :null;
      const sender = req.body.sender ? req.body.sender :null;
      const reciever = req.body.reciever ? req.body.reciever :null;
      const amount = req.body.amount ? req.body.amount :null;
      const currency = req.body.currency ? req.body.currency :null;
      const exchange_rate = req.body.exchange_rate ? req.body.exchange_rate : null;
      const payment_type = req.body.payment_type? req.body.payment_type:null;
      const result_usd = req.body.result_usd ? req.body.result_usd : null;
      const comment = req.body.comment ? req.body.comment : null;
    
      try{
        await update_payment(user_id,payment_id,sender,reciever,amount,currency,exchange_rate,payment_type,result_usd,comment,res)
         }
         catch(err){
           res.send(err)
         }
      })

      //////////////////////////update_payment_satus///////////////////////////


      app.post(root_url+"/update_payment_status", async (req,res) => {
        const user_id = req.body.user_id ? req.body.user_id :null;
        const payment_id = req.body.payment_id ? req.body.payment_id :null;
        // const user_name = req.body.user_name ? req.body.user_name :null;
        try{
          await update_payment_satus(user_id,payment_id,res)
           }
           catch(err){
             res.send(err)
           }
        })

//////btc_trx//////////////////////////////////////////////////////////////

app.post(root_url+"/btc_tranjaction", async (req,res) => {
  const btc_address_id = req.body.btc_address_id ? req.body.btc_address_id :null;
  const address_type =req.body.address_type ?req.body.address_type :null;
  const comment = req.body.comment ? req.body.comment : null;
  try {
    await btc_trx(btc_address_id, address_type, comment, res)
  } catch (error) {
    console.log(error);
  }
})

////////////////////////refresh_btc_transaction/////////////

app.post(root_url+"/refresh_btc_transaction", async (req,res) => {
  const btc_address_id = req.body.btc_address_id ? req.body.btc_address_id :null;
  const address_type =req.body.address_type ?req.body.address_type :null;
  // const comment = req.body.comment ? req.body.comment : null;
  try {
    await refresh_btc_transaction(btc_address_id, address_type, res)
  } catch (error) {
    console.log(error);
  }
})


///////////////////////load btc_trx////////////////////////

app.post(root_url+"/load_btc_tranjaction", async (req,res) => {
  const btc_address_id = req.body.btc_address_id ? req.body.btc_address_id :null;
  const address_type =req.body.address_type ?req.body.address_type :null;
  const load_number = req.body.load_number ?req.body.load_number :null;
  const comment = req.body.comment ?req.body.comment : null;
  try {
    await load_btc_trx(btc_address_id, address_type,load_number,comment, res)
  } catch (error) {
    console.log(error);
  }
})

///////////////////////////////////////GET BTC TRA///////////////////////////////////

app.get(root_url + "/get_btc_transactions", async (req, res) => {
  let btc_address_id = req.query.btc_address_id ? req.query.btc_address_id : null;
  let address_type = req.query.address_type ? req.query.address_type : null;
  // let comment = req.query.comment ? req.query.comment : null;
  if (address_type == "BTC") {
    try {
      await get_btc_transaction(btc_address_id, res);
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    res.send("Addres type is not btc.")
  }
})
app.get(root_url + "/get_btc_transactions_filter", async (req, res) => {
  let btc_address_id = req.query.btc_address_id ? req.query.btc_address_id : null;
  console.log("btcccc",btc_address_id);
  let address_type = req.query.address_type ? req.query.address_type : null;
  let start_timestamp = req.query.start_timestamp ? req.query.start_timestamp : null;
  let end_timestamp = req.query.end_timestamp ? req.query.end_timestamp : null;
  // let comment = req.query.comment ? req.query.comment : null;
  if (address_type == "BTC") {
    try {
      await get_btc_transaction_filter(btc_address_id,start_timestamp,end_timestamp,res);
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    res.send("Addres type is not btc.")
  }
})

////////////////////////////////btc comment/////////////////////////////////////////////

app.post(root_url + "/btc_transactions_comment", async (req, res) => {
  let  hash_id= req.body.hash_id ? req.body.hash_id : null;
  let comment = req.body.comment ? req.body.comment : null;
  try {
    await create_btc_transactions_comment(hash_id,comment,res);
  } catch (error) {
    res.send(error);
  }
})

////////payment_logs///////////////////////////////////////////////////


app.post(root_url+"/payment_logs", async (req,res) => {
  // const address_id = req.body.address_id ? req.body.address_id :null;
  const user_id = req.body.user_id ? req.body.user_id : null;
  const payment_id = req.body.payment_id ? req.body.payment_id :null;
  const updated_time = new Date().getTime();
  try{
    await payment_logs(user_id,payment_id,res)
  }
  catch(error){
    res.send(error)
  }
})

////////////////////////////update_comment//////////////////////////////////////////

app.post(root_url+"/updateBtcComment", async (req,res) => {
  // const address_id = req.body.address_id ? req.body.address_id :null;
  const user_id = req.body.user_id ? req.body.user_id : null;
  const hash_id = req.body.hash_id ? req.body.hash_id :null;
  const comment = req.body.comment? req.body.comment : null;
  const updated_time = new Date().getTime();
  try{
    await create_btc_audit_logs(user_id,hash_id,comment,res)
  }
  catch(error){
    res.send(error)
  }
})

/////////////////get btc audit  logs//////////////////////////////////////

app.get(root_url+"/getBtcAuditHistory", async(req,res)=>{
  // const user_id = req.query.user_id ? req.query.user_id : null;
  // const comment = req.query.comment ? req.query.comment : null;
    try {
        await get_btc_audit_logs(res)
    } catch (error) {
      console.log(error);
    }
})

//////////////////////////////////////////////////////////

app.delete(root_url+"/delete_payment", async (req,res) => {
        const payment_id = req.query.payment_id ? req.query.payment_id :null ;
          try{ 
              if(payment_id!=null || payment_id!= undefined){
                await delete_payment(payment_id,res)
                // await res.send("ADDRESS DELETED")
              }
              else{
                res.send("NOT A Valid Address ID.")
              }
            }
          catch(error){
              res.send(error)
          }
    })

app.post(root_url+"/pms_balance", async (req,res) =>{
    const id = req.body.id ? req.body.id : null;
      try {
        await pms_balance(id,res)
      } catch (error) {
        console.log(error);
      }
    })

  app.get(root_url+"/get_pms_balance", async(req,res)=>{
      const e_id = req.query.e_id ? req.query.e_id : null;
      const creditor = req.query.creditor ? req.query.creditor : null;
      // const debtor = req.query.debtor ? req.query.debtor : null;

        try {
            await get_pms_balance(e_id,creditor,res)
        } catch (error) {
          console.log(error);
        }
    })

app.post(root_url+"/delete_balance", async (req,res) => {
  let id = req.body.id ? req.body.id :null ;
        try{ 
            if(id!=null || id!= undefined){
              await delete_pms_balance(id,res)
              // await res.send("ADDRESS DELETED")
            }
            else{
              res.send("NOT A Valid Address ID.")
            }
          }
        catch(error){
            res.send(error)
        }
      }) 
  app.post(root_url+"/refresh_all_data", async (req,res) => {
        const all_data_tron = req.body.all_data_tron ? req.body.all_data_tron : null;
        const all_data_btc = req.body.all_data_btc ? req.body.all_data_btc : null;
        const all_data_eth = req.body.all_data_eth ? req.body.all_data_eth : null;
        const comment = req.body.comment ? req.body.comment : null;
          try{ 
            await get_refresh_data_all(all_data_tron, all_data_btc,all_data_eth,comment,res)
          }
          catch(error){
            res.send(error)
          }
  })
/////////////////////////echnge api//////////////////////////////////

app.post(root_url+"/createExchange_data", async (req,res) => {
  const portfolio_id = req.body.portfolio_id ? req.body.portfolio_id : null;
  const exchange_name = req.body.exchange_name ? req.body.exchange_name : null;
  const api_key = req.body.api_key ? req.body.api_key : null;
  const api_secret = req.body.api_secret ? req.body.api_secret : null;   
  const exchange_type = req.body.exchange_type ? req.body.exchange_type: null;
  const user_id = req.body.user_id ? req.body.user_id :null;
  console.log(api_key);
  try{
   
    await get_simple_protocol_exchange(portfolio_id,exchange_name,api_key,api_secret,exchange_type,user_id,res)          

  }
  catch(error){
    res.send(error)
  }
})
// app.post(root_url+"/update_all_accountancy", async (req,res) => {
  
//   const game_id = req.body.game_id ? req.body.game_id :null;
//   const game = req.body.game ? req.body.game :null;
//   const game_details = req.body.game_details ? req.body.game_details :null;
//   const venue = req.body.venue ? req.body.venue :null;
//   const type = req.body.type ? req.body.type :null;
//   const host = req.body.host ? req.body.host : null;
//   const creditor = req.body.creditor? req.body.creditor:null;
//   const player = req.body.player ? req.body.player : null;
//   const shareholders = req.body.shareholders ? req.body.shareholders : null;
//   const owner_ship = req.body.owner_ship ? req.body.owner_ship : null;
//   const  result= req.body.result ? req.body.result : null;
//   const date_created =req.body.date_created ? req.body.date_created : null;

//   try{
    
//     await update_all_accountancy(game_id,game,game_details,venue,type,host,creditor,player,shareholders,result,owner_ship,date_created,res)
//      }
//      catch(err){
//        res.send(err)
//      }
//   })

const port = process.env.PORT
 

//----------------------------------------PORT---------------------------------------------------------------------
app.listen(8180, 
()=> console.log(`Server Started on port ${port}...`)
)
