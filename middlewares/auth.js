const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

function auth(req, res, next){
    const token = req.header('x-auth-token');

    //Check for token
    let errors = {};
    if(!token) 
        errors.noToken = "No token, authorization denied";
        res.status(400).json({
            success: false,
            errors 
        });

    try{
        const decode = jwt.verify(token, keys.secretOrKey);
        req.email = decode.email;
        next();
    }catch(e){
        errors.invalidToken = "Invalid token";
        res.status(400).json({
            success: false,
            errors
        });
    }
}

module.exports = auth;