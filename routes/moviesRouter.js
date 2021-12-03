const moviesRouter = require('express').Router()
const moviesController = require('../controllers/moviesController')

/**
 * Movie Routers
 */
moviesRouter.get('/', moviesController.getAllMovies)
moviesRouter.get('/:id', moviesController.getOneMovie)
moviesRouter.post('/', moviesController.addMovie)
moviesRouter.put('/:id', moviesController.updateMovie)
moviesRouter.delete('/:id', moviesController.deleteMovie)

// Export the movie routes
module.exports = moviesRouter;