const express = require('express');
const router = express.Router();
const { Type } = require('../sequelize');


router.get('/', async (req, res) => {
  try {
    const types = await Type.findAll();
    res.send(types);
  }catch (e) {
    res.status(500).send({message: "Что-то пошло не так"})
  }
});
//
router.get('/:id', async (req, res) => {
  try {
    const type = await Type.findOne({where: {id: req.params.id}});
    res.send(type);
  } catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});

router.post('/', async (req, res) => {
  try {
    const type = req.body;
    const types = await Type.create({name: type.name})
      .catch(error => {res.status(400).send({message: error.errors.message})});
    res.send(types);
  } catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});
router.put("/:id", async (req, res) => {
  try {
    const type = await Type.update(
      {name: req.body.name},
      {where: {id: req.params.id}}
    ).catch(error => {res.status(400).send({message: error.errors.message})});
    res.send(type);
  } catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});
module.exports = router;
