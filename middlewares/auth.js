const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

function auth(req, res, next){
    const token = req.header('x-auth-token');

    //Check for token
    if(!token) res.status(400).json({msg: 'No token, authorization denied.'});

    try{
        const decode = jwt.verify(token, keys.secretOrKey);
        console.log("Decode => ", decode.email);
        req.email = decode.email;
        next();
    }catch(e){
        res.status(400).json({msg: 'Invalid token.'});
    }
}

module.exports = auth;