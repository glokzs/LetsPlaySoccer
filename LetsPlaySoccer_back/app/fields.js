const express = require('express');
const router = express.Router();
const {Day, Format, Field, Image, Time} = require('../sequelize');

const multer  = require('multer');
const path = require('path');
const config = require('../config');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

// const upload = multer({storage});
//
router.get('/', async (req, res) => {
    const fields = await Field.findAll({include: [Format, Day]});
    res.send(fields);
});
//
// router.get('/:id', async (req, res) => {
// });

router.post('/', async (req, res) => {
    const body = req.body;
    let days;
    let formats;
    if (body.formats.length > 0) {
        formats = await body.formats.map(format => Format.findOrCreate({ where: { title: format.title }, defaults: { title: format.title }})
            .spread((format, created) => format));
    }
    if (body.days.length > 0) {
        days = await body.days.map(day => Day.findOrCreate({ where: { title: day.title }, defaults: { day: day.title }})
            .spread((day, created) => day));
    }
    Field.create(body)
        .then(field => Promise.all(formats).then(storedFormats => field.addFormats(storedFormats)).then(() => field))
        .then(field => Promise.all(days).then(storedDays => field.addDays(storedDays)).then(() => field))
        .then(field => Field.findOne({ where: {id: field.id}, include: [Format, Day]}))
        .then(fieldWithAssociations => res.send(fieldWithAssociations))
        .catch(err => res.status(400).send(err));

});

// router.delete('/', async (req, res) => {
//
// });

module.exports = router;
