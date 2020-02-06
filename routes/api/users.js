const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// Item Model
const User = require('../../models/User');

// Bcrypt Validations
const bcryptValidation = require('../../common-scripts/security-commons');

// @route    POST api/users/login
// @desc     Get user by username and password
// @access   Pubic
router.post('/login', [check('email').isEmail()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }else{
        User.findOne({email: req.body.email})
            .then(user => {
                if(!user){
                    res.status(422).send({success: false, message: 'Email or Username are incorrect.'});
                }else{     
                    let isMatch = bcryptValidation.checkEncryptedPassword(req.body.password, user.password);
                    console.log("Luego del let ",isMatch);
                    if(isMatch){
                        res.status(200).send({success: true, message: 'Loggin in...'});
                    }else{
                        res.status(422).send({success: false, message: 'Email or Username are incorrect.'});
                    }           
                }
            })
            .catch(err => res.status(500).json({success: false, message: "Internal Server Error: Conection error, please try again later." + err}));
    }
    
});

// @route   POST api/user/register
// @desc    Create new user
// @access  Public
router.post('/register', [check('email').isEmail(), check('password').isLength({min: 5})
    .withMessage('must be at least 5 chars long').matches(/\d/).withMessage('must contain a number')
    ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }else{
        //New user
        let user_with_hashed_password;
        //Create a new User with encrypted password
        bcryptValidation.getUserWithEncryptedData(req.body.password, req.body.email)
            .then(user => {
                user_with_hashed_password = user;
                if(user_with_hashed_password){
                    User.create(user_with_hashed_password)
                        .then(user => {
                            console.log("Acount created => User => ", user);
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