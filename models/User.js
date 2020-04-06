const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_GROUP', 'ONE_PIECE'],
        default : 'ROLE_USER'
    }
});

module.exports = User = mongoose.model('user', UserSchema);