const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    //Convert all field to string
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.repassword = !isEmpty(data.repassword) ? data.repassword : "";

    //Validate email format and filled
    if(Validator.isEmpty(data.firstname)){
        errors.firstname = "Firstname is a required field";
    }else if(!Validator.isLength(data.firstname, { min: 2, max: 25 })){
        errors.firstname = "Firstname must be at least 2 characters";
    }

    //Validate lastname format and filled
    if(Validator.isEmpty(data.lastname)){
        errors.lastname = "Email is a required field";
    }else if(!Validator.isLength(data.lastname, { min: 2, max: 25 })){
        errors.lastname = "Lastname must be at least 2 characters";
    }

    //Validate email format and filled
    if(Validator.isEmpty(data.email)){
        errors.email = "Email is a required field";
    }else if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    //Validate password
    if(Validator.isEmpty(data.password)){
        errors.password = "Password is a required field";
    }else if (!Validator.isLength(data.password, { min: 5, max: 15 })) {
        errors.password = "Password must be at least 5 characters and max of 15";
    }else if(data.password !== data.repassword){
        errors.repassword = "Re-password must be equal to password";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }

}