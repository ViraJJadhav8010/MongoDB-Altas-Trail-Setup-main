// var Userdb = require('../model/model');

// // create and save new user
// exports.create = (req,res)=>{
//     // validate request
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }

//     // new user
//     const user = new Userdb({
//         name: req.body.name,
//         dob: req.body.dob,
//         mobile: req.body.mobile,
//         username: req.body.username,
//         email: req.body.email,
//         gender: req.body.gender,
//         location: req.body.location,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword
//     })

//     // save user in the database
//     user
//         .save(user)
//         .then(data => {
//             res.redirect('/');
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "Some error occurred while creating a create operation"
//             });
//         });

// }

// // retrieve and return all users/ retrive and return a single user
// exports.find = (req, res)=>{

//     if(req.query.id){
//         const id = req.query.id;

//         Userdb.findById(id)
//             .then(data =>{
//                 if(!data){
//                     res.status(404).send({ message : "Not found user with id "+ id})
//                 }else{
//                     res.send(data)
//                 }
//             })
//             .catch(err =>{
//                 res.status(500).send({ message: "Erro retrieving user with id " + id})
//             })

//     }else{
//         Userdb.find()
//             .then(user => {
//                 res.send(user)
//             })
//             .catch(err => {
//                 res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
//             })
//     }

    
// }

// // Update a new idetified user by user id
// exports.update = (req, res)=>{
//     if(!req.body){
//         return res
//             .status(400)
//             .send({ message : "Data to update can not be empty"})
//     }

//     const id = req.params.id;
//     Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
//             }else{
//                 res.send(data)
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({ message : "Error Update user information"})
//         })
// }

// // Delete a user with specified user id in the request
// exports.delete = (req, res)=>{
//     const id = req.params.id;

//     Userdb.findByIdAndDelete(id)
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
//             }else{
//                 res.send({
//                     message : "User was deleted successfully!"
//                 })
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message: "Could not delete User with id=" + id
//             });
//         });
// }

const Userdb = require('../model/model');
const bcrypt = require('bcrypt'); // For password hashing

// Create and save a new user
exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            return res.status(400).send({ message: "Content cannot be empty!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const user = new Userdb({
            name: req.body.name,
            dob: req.body.dob,
            mobile: req.body.mobile,
            username: req.body.username,
            email: req.body.email,
            gender: req.body.gender,
            location: req.body.location,
            password: hashedPassword,
            confirmPassword: hashedPassword, // Optional: Ensure this logic aligns with your requirements
        });

        // Save user to the database
        const data = await user.save();
        res.status(201).redirect('/'); // Successfully created
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user.",
        });
    }
};

// Retrieve and return all users or a single user by ID
exports.find = async (req, res) => {
    try {
        if (req.query.id) {
            const id = req.query.id;
            const data = await Userdb.findById(id);

            if (!data) {
                return res.status(404).send({ message: `User not found with id ${id}` });
            }

            res.send(data);
        } else {
            const users = await Userdb.find();
            res.send(users);
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while retrieving user information.",
        });
    }
};

// Update a user by ID
exports.update = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            return res.status(400).send({ message: "Data to update cannot be empty!" });
        }

        const id = req.params.id;
        const data = await Userdb.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false,
            new: true, // Return the updated document
        });

        if (!data) {
            return res.status(404).send({ message: `Cannot update user with id ${id}. User not found!` });
        }

        res.send(data);
    } catch (err) {
        res.status(500).send({ message: "Error updating user information." });
    }
};

// Delete a user by ID
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Userdb.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).send({ message: `Cannot delete user with id ${id}. User not found!` });
        }

        res.send({ message: "User was deleted successfully!" });
    } catch (err) {
        res.status(500).send({
            message: `Could not delete user with id=${id}.`,
        });
    }
};
