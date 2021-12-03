const moviesRouter = require('./moviesRouter');
const usersRouter = require('./usersRouter');

const setupRoutes = (app) => {
    app.use('/api/movies', moviesRouter);
    app.use('/api/users', usersRouter);
};

module.exports = { setupRoutes };