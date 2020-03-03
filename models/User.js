const mongoose = require('mongoose');
const Item = require('./Item');

const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    items: [{type: Schema.Types.ObjectId, ref: Item}]
});

module.exports = User = mongoose.model('user', UserSchema);