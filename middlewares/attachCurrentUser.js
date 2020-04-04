const User = require('../models/User');

function attachCurrentUser(req, res, next){
    const currentUserMail = req.email;
    User.findOne({email: currentUserMail})
        .then(user => {
            if(!user) {
                const errors = {
                    notfound: "User not found"
                };
                return res.status(401).end({
                    success: false,
                    errors
                })
            }else{
                req.currentUser = user;
                return next();
            }
        })
        .catch(err => console.log("attachCurrentUser => ", err));

}

module.exports = attachCurrentUser;