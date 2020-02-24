const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    //Convert all field to string
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Validate email format and filled
    if(Validator.isEmpty(data.email)){
        errors.email = "Email is a required field";
    }else if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    //Validate password
    if(Validator.isEmpty(data.password)){
        errors.password = "Password is a required field";
    }else if (!Validator.isLength(data.password, { min: 5, max: 10 })) {
        errors.password = "Password must be at least 5 characters and max of 10";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }

}