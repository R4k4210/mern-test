const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");
// Item Model
const User = require('../../models/User');
// Bcrypt Validations
const bcryptValidation = require('../../common-scripts/security-commons');

// @route    POST api/users/login
// @desc     Get user by username and password and return JWT Token
// @access   Pubic
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(422).json(errors);
    }else{
        User.findOne({email: req.body.email})
            .then(user => {
                if(!user){
                    res.status(400).send({success: false, message: 'Email or Username are incorrect.'});
                }else{     
                    bcryptValidation.checkEncryptedPassword(req.body.password, user.password)
                        .then(isMatch => {

                            if(isMatch){                               
                                //Create JWT Payload
                                const payload = {
                                    email: user.email
                                }; 
                                //Sign token
                                jwt.sign(payload, //using client as payload
                                        keys.secretOrKey, 
                                        {expiresIn: keys.expirationTime}, 
                                        (err, token) => {
                                            if(err) throw err;
                                            res.json({
                                                success: true,
                                                token,
                                                user: user
                                            });
                                        });
                            }else{
                                res.status(400).send({success: false, message: 'Email or Username are incorrect.'});
                            }     

                        })
                        .catch(err => console.log(err));           
                }
            })
            .catch(err => res.status(500).json({success: false, message: "Internal Server Error: Connection error, please try again later." + err}));
    }
    
});

// @route   POST api/user/register
// @desc    Create new user
// @access  Public
router.post('/register', (req, res) => {
    console.log("Register requested => ", req.body);
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(422).json(errors);
    }else{
        //New user
        let user_with_hashed_password;
        //Create a new User with encrypted password
        bcryptValidation.getUserWithEncryptedData(req.body)
            .then(user => {
                user_with_hashed_password = user;
                if(user_with_hashed_password){
                    User.create(user_with_hashed_password)
                        .then(user => {
                            console.log("Account created => User => ", user);
                            res.status(200).json({success: true, message: "Account created."});
                        })
                        .catch(err => {
                            console.log("Error creating Account => ", err);
                            res.status(422).json({success: false, message: `Email -> ${req.body.email} is already in use.`});
                        });
                }else{
                    console.log("Non-existent account");
                }
            })
            .catch(err => console.log("Error hashing user password. Details => ", err));
    }
})


module.exports = router;