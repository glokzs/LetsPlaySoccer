const express = require('express');
const router = express.Router();
const {Format, Field} = require('../sequelize');
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
    const fields = await Field.findAll();
    const formatedFields = fields.map(field => {
        field.timetable = JSON.parse(field.timetable);
        field.formats = JSON.parse(field.formats);
        field.images = JSON.parse(field.images);
        return field;
    });
    res.send(formatedFields);
});

router.get('/:id', async (req, res) => {
    const field = await Field.findOne({where: {id: req.params.id}});
    field.timetable = JSON.parse(field.timetable);
    field.covers = JSON.parse(field.covers);
    field.types = JSON.parse(field.types);
    field.formats = JSON.parse(field.formats);
    field.images = JSON.parse(field.images);
    res.send(field);

});

router.post('/',upload.single('image'), async (req, res) => {
    const field = req.body;
    const timetable = JSON.stringify(field.timetable);
    const formats = JSON.stringify(field.formats);
    const images = JSON.stringify(field.images);

    const fields = await Field.create({
        name: field.name,
        address: field.address,
        description: field.description,
        longitude: field.longitude,
        latitude: field.latitude,
        timetable,
        covers: field.covers,
        types: field.types,
        formats,
        images,
        phoneNumber: field.phoneNumber,
        email: field.email,
        site: field.site
    });
    res.send(fields);
});

// router.delete('/', async (req, res) => {
//
// });

module.exports = router;
