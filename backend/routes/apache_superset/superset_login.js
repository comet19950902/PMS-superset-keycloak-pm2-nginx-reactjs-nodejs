require('dotenv').config()
var axios = require('axios');
// app.use(express.json())
var superset_admin = process.env.SUPERSET_ADMIN
var superset_admin_password = process.env.SUPERSET_ADMIN_PASSWORD
var superset_user_clause = process.env.SUPERSET_USER_CLAUSE
var resource_type = process.env.SUPERSERT_USER_RESOURCE_TYPE
var resource_id = process.env.SUPERSERT_USER_RESOURCE_ID

// console.log(superset_user_clause);
// console.log(resource_type);
// console.log(resource_id);


const login_superset = async(getusername,res)=>{

    var data = JSON.stringify({
        "password": superset_admin_password,
        "provider": "db",
        "refresh": true,
        "username": superset_admin
    });
    try {
        let admin_result = await axios(config = {
            method: 'post',
            url: 'http://13.126.238.54:8088/api/v1/security/login',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        })
        let admin_data = admin_result.data;
        // console.log(admin_data.access_token);
        // console.log(admin_result.access_token);
        try {
            var data2 = JSON.stringify({
                "user": {
                    "username": getusername,
                },
                "resources": [
                    {
                    "type": resource_type,
                    "id": resource_id
                    }
                ],
                "rls": [
                    {
                    "clause": superset_user_clause
                    }
                ]
            });

            let user_result = await axios(config2 = {
                method: 'post',
                url: 'http://13.126.238.54:8088/api/v1/security/guest_token/',
                headers: { 
                    'Authorization': 'Bearer'+" "+admin_data.access_token, 
                    'Content-Type': 'application/json'
                },
                data : data2
            })
            console.log(user_result.data);
            res.send(user_result.data)
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }

}



module.exports = login_superset