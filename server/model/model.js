// const mongoose = require('mongoose');

// var schema = new mongoose.Schema({
//     name : {
//         type : String,
//         required: true
//     },
//     dob : {
//         type : Date,
//         required: true
//     },
//     mobile : {
//         type : String,
//         required: true,
//         unique: true
//     },
//     username : {
//         type : String,
//         required: true,
//         unique: true
//     },
//     email : {
//         type: String,
//         required: true,
//         unique: true
//     },
//     gender : String,
//     location : {
//         type: String,
//         required: true,
//     },
//     password : {
//         type: String,
//         required: true,
//     },
//     confirmPassword : {
//         type: String,
//         required: true,
//     },
// })

// const Userdb = mongoose.model('userdb', schema);

// module.exports = Userdb;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    location: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
});

// Middleware for hashing the password before saving
schema.pre('save', async function (next) {
    try {
        // Hash the password only if it is new or modified
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);

            // Ensure confirmPassword is not stored in the database
            this.confirmPassword = undefined;
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Method to validate password during login
schema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Create the model
const Userdb = mongoose.model('Userdb', schema);

// Export the model
module.exports = Userdb;
