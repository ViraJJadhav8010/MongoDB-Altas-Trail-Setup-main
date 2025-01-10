const UserData = require('../model/model');

// Create and save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    // New user
    const user = new UserData({
        username: req.body.username,
        password: req.body.password
    });

    // Save user in the database
    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
}

// Update a user by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty!" });
    }

    const id = req.params.id;
    UserData.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with id ${id}. User not found!` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating user information." });
        });
};

// Delete a user by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    UserData.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user with id ${id}. User not found!` });
            } else {
                res.send({ message: "User was deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete user with id ${id}.`+id });
        });
};
