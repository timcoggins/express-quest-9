const connection = require('../db-config');

// Get all of the movies
const getAllMovies = async () => {
    return await connection.promise().query('SELECT * FROM movies')
        .then(([results, fields]) => results)
}

// Get one movie
const getOneMovie = async (id) => {
    return await connection.promise().query('SELECT * FROM movies WHERE id = ?', [id])
        .then(([results, fields]) => results)
}

// Add a movie
const addMovie = async (title, director, year, color, duration) => {
    return await connection.promise().query('INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)', [title, director, year, color, duration])
        .then(([results]) => results)
}

// Update a movie
const updateMovie = async (body, id) => {
    return await connection.promise().query('UPDATE movies SET ? WHERE id = ?', [body, id])
        .then(([results]) => results.affectedRows)
}

// Delete a movie
const deleteMovie = async (id) => {
    // Connection is automatically released when query resolves
    // results contains rows returned by server
    return await connection.promise()
        .query('DELETE FROM movies WHERE id = ?', id)
        .then(([results]) => results.affectedRows)
}



module.exports = {
    getAllMovies,
    getOneMovie,
    addMovie,
    updateMovie,
    deleteMovie
}