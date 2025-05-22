const connection = require('../connection/connection')
const mongoose = require('mongoose');


const userModel = new mongoose.Schema({
    name: {
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
    role: {
        type: String,
        enum: ["admin", 'user'],
        default: 'user'
    }
})
const User = mongoose.model('user', userModel);
module.exports = User