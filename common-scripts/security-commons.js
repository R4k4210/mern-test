const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Is time needed to calculate a BCrypt Hash
// Higher number represent more hashing rounds. Must be a random number
// for each transaction, so the result is never equal even for same passwords.
const salt_rounds = require('../config/keys').saltRoundsNumber;

//Check password with encrypted password.
const checkEncryptedPassword = function(pass_from_request, stored_password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass_from_request, stored_password, (err, isMatch) => {
            console.log(isMatch);
            if(err){
                console.log(err);
                reject(err);
            }else if(!isMatch){
                console.log("Password not match.");
                resolve(false);
            }else{
                console.log("Password match.");
                resolve(true);        
            }
        })
    })
}

//Encrypt the password and return a User
const getUserWithEncryptedData = function(pass_from_request, email_from_request){
    const user_with_encypted_password = new Promise((resolve, reject) => {
        bcrypt.hash(pass_from_request, salt_rounds, (err, hash) => {
            if(err) return reject(err);
            const user = new User({
                email: email_from_request,
                password: hash
            });
            resolve(user);
        })
    });
    return user_with_encypted_password;
}

module.exports = {
    checkEncryptedPassword,
    getUserWithEncryptedData
}