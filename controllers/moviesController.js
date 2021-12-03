const Movies = require('../models/movies')
const Joi = require('joi');

/**
 * Checks the user input
 * @param body
 * @returns {{validationErrors: Joi.ValidationErrorItem[]}}
 */
const validateBody = (body) => {

    // Get the values from the body
    const { title, director, year, color, duration } = body;

    // Validate the user input
    const { error } = Joi.object({
        title: Joi.string().max(255).required(),
        director: Joi.string().max(255).required(),
        year: Joi.number().integer().min(1888).required(),
        color: Joi.number().min(0).max(1).required(),
        duration: Joi.number().integer().min(1).required(),
    }).validate(
        { title, director, year, color, duration },
        { abortEarly: false }
    );

    // If there was an error, send them back to the client
    return error;
}

/**
 * GET all movies
 */
const getAllMovies = async (req, res) => {
    const data = await Movies.getAllMovies();
    if(data.length) {
        res.status(200).json(data)
    } else {
        res.status(404).send('No movies not found');
    }
}

/**
 * GET one movie
 */
const getOneMovie =  async (req, res) => {
    const data = await Movies.getOneMovie([req.params.id]);
    if(data.length) {
        res.status(200).json(data)
    } else {
        res.status(404).send('Movie not found');
    }
}


/**
 * POST movies
 */
const addMovie = async (req, res) => {

    // Validate
    const error = validateBody(req.body)
    if(error) {
        res.status(422).json({ validationErrors: error.details });
        return
    }

    // Destructure the body
    const { title, director, year, color, duration } = req.body;

    // Perform the post request
    const result = await Movies.addMovie(title, director, year, color, duration);

    // If it was successful
    if(result.affectedRows) {
        const id = result.insertId;
        const createdMovie = { id, title, director, year, color, duration };
        res.status(201).json(createdMovie);
    }
    else res.status(500).send('Error creating a movie.');
}

/**
 * UPDATE a movie
 */
const updateMovie = async (req, res) => {

    // Check to see if the item already exists
    const data = await Movies.getOneMovie([req.params.id]);
    if(data.length !== 1) {
        res.status(404).send(`Movie with id ${req.params.id} not found.`);
        return
    }

    // Validate
    const error = validateBody(req.body)
    if(error) {
        res.status(422).json({ validationErrors: error.details });
        return
    }

    // Update the record
    const affectedRows = await Movies.updateMovie(req.body, req.params.id)
    if (affectedRows) {
        res.status(200).json({
            id: req.params.id,
            body: req.body,
        })
    } else {
        res.status(500).send('Error updating a movie.');
    }
}

/**
 * DELETE a movie
 */
const deleteMovie = async (req, res) => {
    const affectedRows = await Movies.deleteMovie([req.params.id]);
    if (affectedRows) {
        res.send('🎉 Movie deleted!');
    } else {
        res.status(404).send('Movie not found');
    }
}

// Export the movie routes
module.exports = {
    getAllMovies,
    getOneMovie,
    addMovie,
    updateMovie,
    deleteMovie
};