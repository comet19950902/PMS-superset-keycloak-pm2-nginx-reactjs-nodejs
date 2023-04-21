const db = require('../../pool-connection');
var util = require('util')
const new_get_investment = async (portfolio_id,investment_name,new_invest_id,res) => {
  console.log(portfolio_id);
  try {
    await  db.getConnection( async (err, connection) => {
        if (err) throw (err)
        if(portfolio_id ==null){
        try {
          const sqlSelect = "SELECT * FROM new_pms_add_investment where investment_name=?"
          connection.query (sqlSelect,[investment_name], (err, result)=> {        
            if (err) throw (err)
          // console.log(result)
            res.send(result)
          })
        } catch (error) {
          console.log(error);
        }
    }
    else if((portfolio_id !=null) && (investment_name !=null)){
        try {
          const sqlSelect_new = "SELECT * FROM new_pms_add_investment where portfolio_id =? and investment_name=?"
          connection.query (sqlSelect_new,[portfolio_id,investment_name], (err, result)=> {        
            if (err) throw (err)
          // console.log(result)
            res.send(result)
          })
        } catch (error) {
          console.log(error);
        }
    }
    /////////////////////
    else if((portfolio_id !=null) && (investment_name !=null) && (new_invest_id !=null)){
      try {
        const sqlSelect_new = "SELECT * FROM new_pms_add_investment where portfolio_id =? and investment_name=? and new_invest_id=?"
        connection.query (sqlSelect_new,[portfolio_id,investment_name,new_invest_id], (err, result)=> {        
          if (err) throw (err)
        // console.log(result)
          res.send(result)
        })
      } catch (error) {
        console.log(error);
      }
  }

  /////////////////////////////

  else if((portfolio_id !=null) && (new_invest_id !=null)){
    try {
      const sqlSelect_new = "SELECT * FROM new_pms_add_investment where portfolio_id =? and new_invest_id=?"
      connection.query (sqlSelect_new,[portfolio_id,new_invest_id], (err, result)=> {        
        if (err) throw (err)
      // console.log(result)
        res.send(result)
      })
    } catch (error) {
      console.log(error);
    }
}
    /////////////////////////
    else if((portfolio_id !=null) && (investment_name == null)){
        try {
          const sqlSelect_new_port = "SELECT * FROM new_pms_add_investment where portfolio_id =?"
          connection.query (sqlSelect_new_port,[portfolio_id], (err, result)=> {        
            if (err) throw (err)
          // console.log(result)
            res.send(result)
          })
        } catch (error) {
          console.log(error);
        }
    }
        connection.release();
      })
} catch (error) {
 console.log(error);
}
}
module.exports = new_get_investment;

