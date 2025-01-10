const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    dob : {
        type : Date,
        required: true
    },
    mobile : {
        type : String,
        required: true,
        unique: true
    },
    username : {
        type : String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    location : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    confirmPassword : {
        type: String,
        required: true,
    },
})

// const UserData = mongoose.model('userdb', schema);

// module.exports = Userdb;


// const mongoose = require('mongoose');

// var schema = new mongoose.Schema({
//     username : {
//         type : String,
//         required: true,
//         unique: true
//     },
//     password : {
//         type: String,
//         required: true,
//     },
// })

// const UserDta = mongoose.model('userdb', schema);
// module.exports = UserData;