const express = require('express');
const router = express.Router();
const { Cover } = require('../sequelize');


router.get('/', async (req, res) => {
  try {
    const covers = await Cover.findAll();
    res.send(covers);
  } catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});
//
router.get('/:id', async (req, res) => {
  try {
    const cover = await Cover.findOne({where: {id: req.params.id}});
    res.send(cover);
  }catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});

router.post('/', async (req, res) => {
  try {
    const cover = req.body;
    const covers = await Cover.create({name: cover.name}).catch(error => {res.status(400).send({message: error.errors[0].message})});
    res.send(covers);
  } catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});
router.put("/:id", async (req, res) => {
  try {
    const cover = await Cover.update(
      {name: req.body.name},
      {where: {id: req.params.id}}
    ).catch(error => {res.status(400).send({message: error.errors[0].message})});
    res.send(cover);
  } catch (e) {
    res.status(500).send({message: "Что-то пошло не так"});
  }
});
module.exports = router;
