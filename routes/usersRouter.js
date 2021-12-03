const usersRouter = require('express').Router()
const userController = require('../controllers/usersController')

/**
 * User Routers
 */
usersRouter.get('/', userController.getAllUsers)
usersRouter.get('/:id', userController.getOneUser)
usersRouter.post('/', userController.addUser)
usersRouter.put('/:id', userController.updateUser)
usersRouter.delete('/:id', userController.deleteUser)

// Export the user routes
module.exports = usersRouter;