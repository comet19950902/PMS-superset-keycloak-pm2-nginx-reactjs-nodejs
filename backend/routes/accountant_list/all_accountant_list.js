

require('dotenv').config()
const db= require('../../pool-connection'); 
var util = require('util')

const  get_accountant_list = async(res) =>{
    try {
        db.getConnection( async (err, connection) => {
            if (err) throw (err);
            console.log("inside");
            const execquery = util.promisify(connection.query.bind(connection));
            try {
                let sql = "Select * from pms_users Where user_type like '%accountant%';"
                let sqlquery =  await execquery(sql);
                console.log(sqlquery);
                res.send(sqlquery);
            } catch (error) {
                console.log(error);
                res.send(error);
            }
            connection.release();
        })
    }catch(error){
        console.log(error);
        res.send(error);
    }
}

// get_accountant_list()
module.exports = get_accountant_list ;


