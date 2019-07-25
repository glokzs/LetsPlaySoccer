const express = require('express');
const app = express();
const PORT = 8000;
const users = require('./app/users');
const db = require('./fileDb.js');

app.use(express.json());
app.use('/users', users(db));

app.listen(PORT, () => {
    console.log(`Server running at ${PORT} port`);
});
