
require('dotenv').config()
const db = require('../../pool-connection');
var util = require('util');


const add_user_data = async(userID,preferred_username,email, user_role,res)=>{
    let user_roles = JSON.stringify(user_role)
    db.getConnection( async (err, connection) => {
        if (err) throw (err)
        console.log("user_role",user_roles);
        const execquery = util.promisify(connection.query.bind(connection))
        try {
            let users_table_data = await execquery('SELECT * FROM pms_users WHERE user_id =?',[userID]);
            console.log("users_table_data",users_table_data);
            var h = users_table_data.filter(i=>i.user_id==userID);
            console.log("user_data", h);
            var result =h[0];
            if(result && result.user_id){
                try {
                    let sql = 'UPDATE pms_users SET previous_login_time=?, user_type =? WHERE user_id=?';
                    let results = await  execquery(sql,[new Date().toLocaleString(), user_roles, userID]);
                        console.log(results);
                        res.send(results);
                } catch (error) {
                    res.send(error);
                }
            }
            else {
                try {
                    console.log("userId", userID);
                    let sql = "INSERT INTO pms_users (user_id, created_date, party_id, username, email, user_type, previous_login_time) VALUES (?,?,?,?,?,?,?);"
                    let results = await execquery(sql,[userID, new Date().toLocaleString(), userID, preferred_username ,email , user_roles, new Date().toUTCString()]); 
                        console.log(results);
                        res.send(results);
                } catch (error) {
                    res.send(error);
                }
            }
      } catch (error) {
            console.log(error);
            res.send(error);
      }
      connection.release();
    })
}
 module.exports = add_user_data;
