const fs = require('fs');
const express = require('express');
const router = express.Router();
const {Field} = require('../sequelize');
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
    try {
        if(req.query.type) {
            Field.findAll({
                where: {
                    types: req.query.type
                }
            })
                .then(fields => {
                    fields.map(field => {
                        field.timetable = JSON.parse(field.timetable);
                        field.formats = JSON.parse(field.formats);
                        field.images = JSON.parse(field.images);
                        field.phoneNumber = JSON.parse(field.phoneNumber);
                        return field;
                    });
                    res.send(fields);
                })
        } else if (req.query.cover) {
            Field.findAll({
                where: {
                    covers: req.query.cover
                }
            })
                .then(fields => {
                    fields.map(field => {
                        field.timetable = JSON.parse(field.timetable);
                        field.formats = JSON.parse(field.formats);
                        field.images = JSON.parse(field.images);
                        field.phoneNumber = JSON.parse(field.phoneNumber);
                        return field;
                    });
                    res.send(fields);
                })
        } else if (req.query.shower) {
            let shower = true;
            if (req.query.shower === 'false') shower = false;
            Field.findAll({
                where: {
                    shower
                }
            })
                .then(fields => {
                    fields.map(field => {
                        field.timetable = JSON.parse(field.timetable);
                        field.formats = JSON.parse(field.formats);
                        field.images = JSON.parse(field.images);
                        field.phoneNumber = JSON.parse(field.phoneNumber);
                        return field;
                    });
                    res.send(fields);
                })
        } else {
            const fields = await Field.findAll({where: {disabled: false}});
            const formatedFields = fields.map(field => {
                field.timetable = JSON.parse(field.timetable);
                field.formats = JSON.parse(field.formats);
                field.images = JSON.parse(field.images);
                return field;
            });
            res.send(formatedFields);
        }
    }catch (e) {
        res.status(500).send({message: e});
    }

});

router.get('/:id', async (req, res) => {
    Field.findOne({where: {id: req.params.id}})
        .then(data => {
            if(data) {
                const field = data.dataValues;
                console.log(field.timetable);
                field.timetable = JSON.parse(field.timetable);
                // field.covers = JSON.parse(field.covers);
                // field.types = JSON.parse(field.types);
                field.formats = JSON.parse(field.formats);
                field.images = JSON.parse(field.images);
                field.phoneNumber = JSON.parse(field.phoneNumber);
                res.send(field);
            } else {
                res.status(404).send("Некорректные данные");
            }
        })
});

router.post('/',upload.array('images'), async (req, res) => {
    const timetable = JSON.stringify(req.body.timetable);
    const formats = JSON.stringify(req.body.formats);
    const phoneNumber = JSON.stringify(field.phoneNumber);
    const images = JSON.stringify(field.images);

    const field = {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        covers: req.body.covers,
        types: req.body.types,
        email: req.body.email,
        site: req.body.site,
        timetable,
        images,
        phoneNumber,
        formats,
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
        res.json(err.errors[0].message);
    });
});


module.exports = router;
