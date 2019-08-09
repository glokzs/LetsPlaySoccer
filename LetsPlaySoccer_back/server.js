const express = require('express');
const bodyParser = require('body-parser');

const users = require('./app/users');
const fields = require('./app/fields');
const covers = require('./app/covers');
const types = require("./app/types");
const formats = require("./app/formats");
const cors = require('cors');

const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);
app.use('/fields', fields);
app.use('/covers', covers);
app.use('/types', types);
app.use('/formats', formats);
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running at ${PORT} port`);
});
