require('dotenv').config()
var axios = require('axios');
var https = require('https');
var qs = require('qs');
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var superset_url = process.env.SUPERSET_URL;
const get_access_token = (redirect_uri, grant_type, code, res) => {
    let resultdata;
    var data = qs.stringify({
        'grant_type': grant_type,
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'redirect_uri': redirect_uri
    });
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    var config = {
        method: 'post',
        httpsAgent: httpsAgent,
        url: superset_url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            resultdata = response.data;
            res.send(resultdata)
        })
        .catch(function (error) {
            console.log(error);
            res.send(resultdata)
        })

}

module.exports = get_access_token