const fs = require('fs');
const express = require('express');
const router = express.Router();
const {Format, Field} = require('../sequelize');
const nanoid = require('nanoid');
const multer  = require('multer');
const path = require('path');
const config = require('../config');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.fieldPath);
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

router.post('/',upload.array('images'), async (req, res) => {
    const timetable = JSON.stringify(req.body.timetable);

    const formats = JSON.stringify(req.body.formats);

    const field = {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        timetable: timetable,
        covers: req.body.covers,
        types: req.body.types,
        formats: formats,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        site: req.body.site,
    };

    if (req.files) {
        const dir = [];
        req.files.map(file => {
            dir.push(file.filename);
        });

        field.images = JSON.stringify(dir);
    }


    Field.create(field).then(data => {
        const field = data.toJSON();
        res.json(field);
    }).catch(err => {
        console.log(err)
    });
});

// router.delete('/', async (req, res) => {
//
// });

module.exports = router;
