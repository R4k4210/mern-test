const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

function auth(req, res, next){

    const token = req.header('x-auth-token');
    //Check for token
    let errors = {};
    if(!token) {
        errors.noToken = "No token, authorization denied";
        return res.status(400).json({
            success: false,
            authorization: false,
            errors 
        });
    }
    try{
        const decode = jwt.verify(token, keys.secretOrKey);
        req.authorized = true;
        req.email = decode.email;
        next();
    }catch(e){
        console.log("catch error => ", e);
        errors.name = e.name;
        errors.message = e.message;
        res.status(400).json({
            success: false,
            authorization: false,
            errors
        });
    }
}

module.exports = auth;