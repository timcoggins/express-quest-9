const express = require('express');
const serverPort = process.env.PORT || 8000;


//const cors = require('cors')
// const pool = require('./conf');
const app = express();
const { setupRoutes } = require('./routes/index');

// global middlewares
app.use(express.json());
//app.use(cors());
setupRoutes(app);

app.listen(serverPort, (err) => {
    if (err) {
        throw new Error(`An error occurred: ${err.message}`);
    }
    console.log(`Server is listening on ${serverPort}`);
});