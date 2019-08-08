const express = require('express');
const router = express.Router();
const { Cover } = require('../sequelize');


router.get('/', async (req, res) => {
    const covers = await Cover.findAll();
    res.send(covers);
});
//
router.get('/:id', async (req, res) => {
    const cover = await Cover.findOne({where: {id: req.params.id}});
    res.send(cover);
});

router.post('/', async (req, res) => {
    const cover = req.body;
    const covers = await Cover.create({name: cover.name});
    res.send(covers);
});
router.put("/:id", async (req, res, next) => {
    const cover = await Cover.update(
        {name: req.body.name},
        {where: {id: req.params.id}}
    );
    res.send(cover);
});
module.exports = router;
