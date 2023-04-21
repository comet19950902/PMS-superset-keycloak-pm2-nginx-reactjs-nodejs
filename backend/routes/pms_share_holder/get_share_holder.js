const db = require('../../pool-connection')
var util = require('util')

const get_share_holder = async(res) =>{
    try {
        // console.log("address_id",holder_id);
        await db.getConnection( async (err, connection) => {
            if (err) throw (err);
        const sqlSelect = "SELECT * FROM  pms_share_holder ORDER BY updated_time DESC";
          connection.query (sqlSelect,async(err, searchResult)=> {        
            if (err) throw (err)  
            res.send(searchResult) 
          })
          connection.release();
         });                       
     }catch(error){
        console.log(error);
         res.send(error)
     }
}

module.exports = get_share_holder;