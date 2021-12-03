const Joi = require('joi');
const Users = require('../models/users')

/**
 * Checks the user input
 * @param body
 * @returns {{validationErrors: Joi.ValidationErrorItem[]}}
 */
const validateBody = (body) => {

    // Get the values from the body
    const { email, firstname, lastname, city, language } = body;

    // Validate the user input
    const { error } = Joi.object({
        email: Joi.string().email().max(255).required(),
        firstname: Joi.string().max(255).required(),
        lastname: Joi.string().max(255).required(),
        city: Joi.string().allow(null, '').max(255),
        language: Joi.string().allow(null, '').max(255),
    }).validate(
        { email, firstname, lastname, city, language },
        { abortEarly: false }
    );

    // If there was an error, send them back to the client
    return error;
}

/**
 * GET all users
 */
const getAllUsers = async (req, res) => {
    const data = await Users.getAllUsers();
    if(data.length) {
        res.status(200).json(data)
    } else {
        res.status(404).send('No Users found');
    }
}

/**
 * GET one user
 */
const getOneUser = async (req, res) => {
    const data = await Users.getOneUser([req.params.id]);
    if(data.length) {
        res.status(200).json(data)
    } else {
        res.status(404).send('User not found');
    }
}

/**
 * POST user
 */
const addUser = async (req, res) => {

    // Validate
    const error = validateBody(req.body)
    if(error) {
        res.status(422).json({ validationErrors: error.details });
        return
    }

    // Destructure the body
    const { email, firstname, lastname, city, language } = req.body;

    // Check if that email has already been used
    const emailCheck = await Users.checkUserEmail(email);
    if(emailCheck.length) {
        res.status(409).json({ message: 'This email is already used' });
        return
    }

    // Perform the post request
    const result = await Users.addUser(email, firstname, lastname, city, language);

    // If it was successful
    if(result.affectedRows) {
        const id = result.insertId;
        const createdUser = { id, email, firstname, lastname, city, language };
        res.status(201).json(createdUser);
    }
    else res.status(500).send('Error creating the user.');
}

/**
 * UPDATE a user
 */
const updateUser = async (req, res) => {

    // Check to see if the item already exists
    const data = await Users.getOneUser([req.params.id]);
    if(data.length !== 1) {
        res.status(404).send(`User with id ${req.params.id} not found.`);
        return
    }

    // Validate
    const error = validateBody(req.body)
    if(error) {
        res.status(422).json({ validationErrors: error.details });
        return
    }

    // Update the record
    const affectedRows = await Users.updateUser(req.body, req.params.id)
    if (affectedRows) {
        res.status(200).json({
            id: req.params.id,
            body: req.body,
        })
    } else {
        res.status(500).send('Error updating a user.');
    }
}

/**
 * DELETE a user
 */
const deleteUser = async (req, res) => {
    const affectedRows = await Users.deleteUser([req.params.id]);
    if (affectedRows) {
        res.send('🎉 User deleted!');
    } else {
        res.status(404).send('User not found');
    }
}

// Export the movie routes
module.exports = {
    getAllUsers,
    getOneUser,
    addUser,
    updateUser,
    deleteUser
}