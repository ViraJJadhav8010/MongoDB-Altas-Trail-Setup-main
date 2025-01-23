// const UserData = require('../model/model');

// // Retrieve and return all users, or retrieve and return a single user
// exports.find = (req, res) => {
//     if (req.query.id) {
//         const id = req.query.id;

//         UserData.findById(id)
//             .then(data => {
//                 if (!data) {
//                     res.status(404).send({ message: `User not found with id ${id}` });
//                 } else {
//                     res.send(data);
//                 }
//             })
//             .catch(err => {
//                 res.status(500).send({ message: `Error retrieving user with id ${id}` });
//             });
//     } else {
//         UserData.find()
//             .then(users => {
//                 res.send(users);
//             })
//             .catch(err => {
//                 res.status(500).send({ message: err.message || "Error occurred while retrieving user information." });
//             });
//     }
// };
