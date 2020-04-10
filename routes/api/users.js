const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");
const User = require('../../models/User');
// Bcrypt Validations
const bcryptValidation = require('../../common-scripts/security-commons');
const auth = require('../../middlewares/auth');
const attachCurrentUser = require('../../middlewares/attachCurrentUser');
const impersonateUser = require('../../middlewares/impersonateUser');

// @route    POST api/users/login
// @desc     Get user by username and password and return JWT Token
// @access   Pubic
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(422).json({
            success: false,
            errors
        });
    }else{
        User.findOne({email: req.body.email})
            .then(user => {
                if(!user){
                    errors.email = "Email or Username are incorrect.";
                    res.status(400).send({
                        success: false,
                        errors
                    });
                }else{     
                    bcryptValidation.checkEncryptedPassword(req.body.password, user.password)
                        .then(isMatch => {
                            if(isMatch){                               
                                //Create JWT Payload
                                const payload = {
                                    _id: user._id,
                                    email: user.email
                                }; 
                                //Sign token
                                jwt.sign(payload, keys.secretOrKey, 
                                        {expiresIn: keys.expirationTime}, 
                                        (err, token) => {
                                            if(err) throw err;
                                            //Creo el usuario a devolver sin el password
                                            //El password nunca debe ir al front end!!
                                            const userToReturn = {
                                                firstname: user.firstname,
                                                lastname: user.lastname,
                                                email: user.email,
                                                role: user.role
                                            };
                                            //Devuelvo mi jwt token con la info del usuario en 
                                            //caso de necesitarla
                                            res.json({ 
                                                token, 
                                                user: userToReturn 
                                            });
                                        });
                            }else{
                                console.log("False => Password not match.");
                                errors.email = "Email or Username are incorrect.";
                                res.status(400).json({
                                    success: false,
                                    errors
                                });
                            }     

                        })
                        .catch(err => console.log("checkEncryptedPassword => error: ", err));           
                }
            })
            .catch(err => {
                console.log(err);
                errors.internal = "Internal Server Error: Connection error, please try again later.";
                res.status(500).json({
                    success: false,
                    errors
                })
            });
    }
    
});

// @route   POST api/user/register
// @desc    Create new user
// @access  Public
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(422).json({
            success: false, 
            errors
        });
    }else{
        //Se encripta la clave del usuario y se devuelve el usuario actualizado
        bcryptValidation.getUserWithEncryptedData(req.body)
            .then(user_with_hashed_password => {                             
                User.create(user_with_hashed_password)
                    .then(user => {
                        console.log("Account created => User => ", user);
                        res.status(200).json({
                            success: true, 
                            message: "Account created."
                        });
                    })
                    .catch(err => {
                        console.log("Error creating Account => ", err);
                        errors.dusplicated = `Email -> ${req.body.email} is already in use.`;
                        res.status(422).json({
                            success: false,
                            errors
                        });
                    });

            });
    }
})

//Login sin validaciones, desde la sesión de un usuario
router.post('/login-as-user', auth, attachCurrentUser, impersonateUser('ONE_PIECE'), (req, res) => {
    //No desarrollado aún!!
})


module.exports = router;