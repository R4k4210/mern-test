const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/User');
const bcryptValidation = require('../../common-scripts/security-commons');

//La primera vez que entra lo guarda en la DB si no existe.
//Si existe, verifica la data desde el token y el mail
router.post('/glogin', (req, res) => {
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
        //Creo el cliente para verificar el token
        const client = new OAuth2Client(keys.googleClientID);
        client.verifyIdToken({
            idToken: token,
            audience: keys.googleClientID,
        }).then(response => {   
            const payload = response.getPayload();
            const aud = payload['aud'];

            if(aud === keys.googleClientID){
                User.findOne({email: payload['email']}).then(userReturned => {
                    if(!userReturned){
                        console.log("Creating new user...");
                        const newGoogleUser = {
                            firstname: payload['given_name'],
                            lastname: payload['family_name'],
                            email: payload['email'],
                            password: payload['sub'],
                            picture: payload['picture']
                        };

                        bcryptValidation.getUserWithEncryptedData(newGoogleUser)
                            .then(user_with_hashed_password => {                             
                                User.create(user_with_hashed_password)
                                    .then(user => {
                                        //Una vez creado el usuario, genero un token, como un usuario normal.
                                        console.log("Google Account Created => User => ", user);
                                        const payload = {
                                            _id: user._id,
                                            email: user.email
                                        }; 

                                        jwt.sign(payload, keys.secretOrKey, 
                                            {expiresIn: keys.expirationTime}, 
                                            (err, newToken) => {
                                            if(err) throw err;
                                            //Creo el usuario a devolver sin el password
                                            //El password nunca debe ir al front end!!
                                            const userToReturn = {
                                                firstname: user.firstname,
                                                lastname: user.lastname,
                                                email: user.email,
                                                role: user.role,
                                                picture: user.picture
                                            };
                                            //Devuelvo mi jwt token con la info del usuario
                                            res.status(200).json({ 
                                                token: newToken, 
                                                user: userToReturn 
                                            });
                                        });                                  
                                    });
                            });
                    }else{
                        //Si el usuario existe genero el token y lo devuelvo al cliente.
                        const payload = {
                            _id: userReturned._id,
                            email: userReturned.email
                        }; 

                        jwt.sign(payload, 
                            keys.secretOrKey, 
                            {expiresIn: keys.expirationTime}, 
                            (err, newToken) => {
                            if(err) throw err;
                            //Creo el usuario a devolver sin el password
                            //El password nunca debe ir al front end!!
                            const userToReturn = {
                                firstname: userReturned.firstname,
                                lastname: userReturned.lastname,
                                email: userReturned.email,
                                role: userReturned.role,
                                picture: userReturned.picture
                            };
                            //Seteo el nuevo header
                            req.headers['x-auth-token'] = newToken;
                            //Devuelvo mi jwt token con la info del usuario 
                            res.status(200).json({ 
                                token: newToken,
                                user: userToReturn 
                            });
                        }); 
                    }
                })
                .catch(err => console.log("Error => ", err));
            }
        });

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
    
});

module.exports = router;