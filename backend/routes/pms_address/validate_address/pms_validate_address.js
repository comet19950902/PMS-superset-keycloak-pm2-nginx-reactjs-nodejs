
var WAValidator = require('multicoin-address-validator');

const validate_address_type = async (address_id,address_type, res) => {
    var valid =await WAValidator.validate(address_id, address_type);
    if(valid){
        console.log('This is a valid address');
        res.send("This is a valid address")
    }
    else{
        console.log('Address INVALID');
        res.send("Address INVALID")
    }
}


module.exports = validate_address_type;