const connection = require('../db-config');

// Get all of the movies
const getAllUsers = async () => {
    return await connection.promise().query('SELECT * FROM users')
        .then(([results, fields]) => results)
}

// Get one movie
const getOneUser = async (id) => {
    return await connection.promise().query('SELECT * FROM users WHERE id = ?', [id])
        .then(([results, fields]) => results)
}

// Check if email exists
const checkUserEmail = async (email) => {
    return await connection.promise().query('SELECT * FROM users WHERE email = ?', [email])
        .then(([results, fields]) => results)
}

// Add a movie
const addUser = async (email, firstname, lastname, city, language) => {
    return await connection.promise().query('INSERT INTO users (email, firstname, lastname, city, language) VALUES (?, ?, ?, ?, ?)', [email, firstname, lastname, city, language])
        .then(([results]) => results)
}

// Update a movie
const updateUser = async (body, id) => {
    return await connection.promise().query('UPDATE users SET ? WHERE id = ?', [body, id])
        .then(([results]) => results.affectedRows)
}

// Delete a movie
const deleteUser = async (id) => {
    // Connection is automatically released when query resolves
    // results contains rows returned by server
    return await connection.promise()
        .query('DELETE FROM users WHERE id = ?', id)
        .then(([results]) => results.affectedRows)
}


module.exports = {
    getAllUsers,
    getOneUser,
    checkUserEmail,
    addUser,
    updateUser,
    deleteUser
}