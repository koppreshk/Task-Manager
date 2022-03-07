const establishDBConnection = require('./db/connect');
const express = require('express');
const tasks = require('./routes/tasks');
require('dotenv').config();
const notFound = require('./middleware/route-not-found');

//Initialize express
const app = express();

//Middleware
app.use(express.json());

app.use('/api/v1/tasks', tasks);
app.use(notFound);

const init = async () => {
    try {
        await establishDBConnection(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => console.log(`Server started at http://localhost:${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}

init();