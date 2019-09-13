const express = require('express');
const router = express.Router();
const { Format } = require('../sequelize');


router.get('/', async (req, res) => {
  try {
    const formats = await Format.findAll();
    res.send(formats);
  } catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});
//
router.get('/:id', async (req, res) => {
  try{
    Format.findOne({where: {id: req.params.id}})
      .then(data => {
        if(data) {
          const format = data.dataValues;
          res.send(format);
        } else {
          res.status(404).send({message: "Некорректный запрос"});
        }
      })
  } catch (e) {
    res.status(500).send("Что-то пошло не так");
  }
});

router.post('/', async (req, res) => {
  try {
    const format = req.body;
    const formats = await Format.create({name: format.name})
      .catch(error => {
        res.status(400).send({message: error.errors[0].message});
    });
    res.send(formats);
  }catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});
router.put("/:id", async (req, res) => {
  try {
    const formats = await Format.update({name: req.body.name}, {where: {id: req.params.id}})
      .catch(error => {
        res.status(400).send({message: error.errors[0].message});
    });
    res.send(formats);
  }catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});
module.exports = router;