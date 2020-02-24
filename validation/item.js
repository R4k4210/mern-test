const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateItemInput(data){
    
    let errors = {};

    //Convert all field to string
    data.name = !isEmpty(data.name) ? data.name : "";

    if(Validator.isEmpty(data.name)){
        errors.name = "Name is a required field";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}