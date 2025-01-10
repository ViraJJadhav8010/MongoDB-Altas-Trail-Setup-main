
const UserData = mongoose.model('userdb', schema);

module.exports = Userdb;


const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
    },
})
