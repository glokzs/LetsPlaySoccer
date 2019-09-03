const express = require('express');
const router = express.Router();
const {Field, Type, Cover} = require('../sequelize');
const nanoid = require('nanoid');
const multer  = require('multer');
const path = require('path');
const config = require('../config');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
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
  let query = {disabled: false};
  let fieldOffset = 0;
  let search = {};
  ;
  try {
    if(req.query.offset) fieldOffset = parseInt(req.query.offset);
    if(req.query.cover) {
      query = {...query, coverId: req.query.cover}
    }
    if(req.query.shower) {
      let shower = true;
      if (req.query.shower === 'false') shower = false;
      query = {...query, shower}
    }
    if (req.query.search) {
      query = {name: {[Op.like]: `%${req.query.search}%` }}
    }
    if(req.query.type) {
      query = {...query, typeId: req.query.type}
    }
      const fields = await Field.findAll({
        group: "id",
        where: query,
        include: [Cover, Type],
        limit: 10,
        offset: fieldOffset,
      });
      const formatedFields = fields.map(field => {
        field.timetable = JSON.parse(field.timetable);
        field.formats = JSON.parse(field.formats);
        field.images = JSON.parse(field.images);
        field.phoneNumber = JSON.parse(field.phoneNumber);
        return field;
      });
      res.send(formatedFields);
  }catch (error) {
    res.status(500).send({message: "Что-то пошло не так"});
  }

});

router.get('/:id', async (req, res) => {
  Field.findOne({where: {id: req.params.id}, include: [Type, Cover]})
    .then(data => {
      if(data) {
        const field = data.dataValues;
        field.timetable = JSON.parse(field.timetable);
        field.formats = JSON.parse(field.formats);
        field.images = JSON.parse(field.images);
        field.phoneNumber = JSON.parse(field.phoneNumber);
        res.send(field);
      } else {
        res.status(404).send({message: "Некорректный запрос"});
      }
    })
});

router.post('/',upload.array('images'), async (req, res) => {
  const timetable = JSON.stringify(req.body.timetable);
  const formats = JSON.stringify(req.body.formats);
  const phoneNumber = JSON.stringify(req.body.phoneNumber);

  const field = {
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    email: req.body.email,
    site: req.body.site,
    typeId: req.body.typeId,
    coverId: req.body.coverId,
    phoneNumber,
    timetable,
    formats,
  };

  if (req.files) {
    const dir = [];
    req.files.map(file => {
      dir.push(file.filename);
    });

    field.images = JSON.stringify(dir);
  }
  Field.create(field)
    .then(data => {res.send(data)}).catch(error => {
      res.status(400).send({message: error.errors[0].message});
    })
});


module.exports = router;
