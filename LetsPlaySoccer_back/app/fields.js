const express = require('express');
const router = express.Router();
const {Field, Type, Cover} = require('../sequelize');
const nanoid = require('nanoid');
const multer  = require('multer');
const path = require('path');
const config = require('../config');
const Sequelize = require("sequelize");
const auth = require('../middlewares/auth');
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

router.get('/', auth, async (req, res) => {
  let query = {disabled: false};
  let fieldOffset = 0;
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
      res.send(fields);
  }catch (error) {
    res.status(500).send({message: "Что-то пошло не так"});
  }

});

router.get('/:id',auth, async (req, res) => {
  Field.findOne({where: {id: req.params.id}, include: [Type, Cover]})
    .then(data => {
      if(data) {
        const field = data.dataValues;
        res.send(field);
      } else {
        res.status(404).send({message: "Некорректный запрос"});
      }
    })
});

router.post('/', auth, upload.array('images'), async (req, res) => {

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
    phoneNumber: req.body.phoneNumber,
    timetable: req.body.timetable,
    formats: req.body.formats,
    images: req.body.images
  };

  Field.create(field)
    .then(data => {res.send(data)}).catch(error => {
      res.status(400).send({message: error.errors[0].message});
    })
});


module.exports = router;
