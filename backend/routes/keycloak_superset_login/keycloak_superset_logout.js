var axios = require('axios');
const { response } = require('express');
var qs = require('qs');
var client_id =  process.env.CLIENT_ID;
var client_secret=  process.env.CLIENT_SECRET;
var superset_url = process.env.SUPERSET_URL;

const logout_user = (access_token, refresh_token, res)=>{
    var data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token': refresh_token
    };
    var config = {
        method: 'post',
        url: superset_url,
        // url: 'http://13.126.238.54:8080/auth/realms/PMS_dev/protocol/openid-connect/logout',
        headers: {
            'Authorization': 'Bearer '+ access_token,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            data : data
    };
    axios(config)   
    .then(function (response) {
        console.log(JSON.stringify(response));
        res.send(response)
    })
    .catch(function (error) {
        console.log(error);
        res.send(error)
    });

}


module.exports = logout_user