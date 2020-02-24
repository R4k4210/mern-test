const express = require('express');
const router = express.Router();
//Item model
const Item = require('../../models/Item');
//Validations
const validateItemInput = require('../../validation/item');
//Authorization middleware
const auth = require('../../middlewares/auth');

// @route    POST api/items/add
// @desc     Create new item
// @access   Private
router.post('/add', auth, (req, res) => {
    
    const { errors, isValid } = validateItemInput(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors);
    } else {
        
        const newItem = new Item({
            name: req.body.name
        });
        
        Item.create(newItem)
            .then(item => {
                console.log("Item created => Item => ", item);
                res.status(200).json({success: true, message: "Item created."});
            })
            .catch(err => {
                console.log("Error creating item. Details => ", err);
                res.status(500).json({error: "Internal error"});
            });
    }
    
});

module.exports = router;