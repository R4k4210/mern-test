const express = require('express');
const router = express.Router();
const auth = require("../../middlewares/auth");

router.post('/checkToken', auth, (req, res) => {

    console.log("Is auth checktoken => ", req.authorized);
    if(req.authorized){
        return res.status(200).json({
            authorized: req.authorized
        });
    }else{
        return res.status(400).json({
            authorized: req.authorized
        }); 
    }
    
});

module.exports = router;