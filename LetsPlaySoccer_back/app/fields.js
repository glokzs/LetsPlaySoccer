const express = require('express');
const router = express.Router();
const {Day, Format, Field, Image, Time} = require('../sequelize');
const nanoid = require('nanoid');
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

const upload = multer({storage});

router.get('/', async (req, res) => {
    const fields = await Field.findAll({include: [Format, {model: Day, include: [Time]}]});
    res.send(fields);
});
//
// router.get('/:id', async (req, res) => {
// });

router.post('/',upload.single('image'), async (req, res) => {
    const body = req.body;
    let days;
    let formats;
    if (body.formats && body.formats.length > 0) {
        formats = await body.formats.map(format => Format.findOrCreate({ where: { title: format.title }, defaults: { title: format.title }})
            .spread((format, created) => format));
    }
    if (body.days && body.days.length > 0) {
        days = body.days.map(day => {

            return Day.findOrCreate({ where: { title: day.title }, defaults: { day: day.title }})
                .spread((createdDay, created) => createdDay)
                .then(async createdDay => {
                    const dayId = createdDay.id;
                    day.times.map(time =>  {
                        Time.create({from: time.from, to: time.to, price: time.price, dayId: dayId}).catch(err=>res.send(err));
                    });
                    return createdDay;
                });


        })
    }
    Field.create(body)
        .then(field => Promise.all(formats).then(storedFormats => field.addFormats(storedFormats),err => console.log(err)).then(() => field))
        .then(field => Promise.all(days).then(storedDays => field.addDays(storedDays)).then(() => field))
        .then(field => Field.findOne({ where: {id: field.id}, include: [Format, {model: Day, include: [Time]}]}))
        .then(field => {
            if (req.file) {
                const image = req.file.filename;
                Image.create({url: image, fieldId: field.id});
            }
            return field;
        })
        .then(fieldWithAssociations => res.send(fieldWithAssociations))
        .catch(err => res.status(400).send(err));

});

// router.delete('/', async (req, res) => {
//
// });

module.exports = router;
