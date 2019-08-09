const express = require('express');
const router = express.Router();
const { Type } = require('../sequelize');


router.get('/', async (req, res) => {
    const types = await Type.findAll();
    res.send(types);
});
//
router.get('/:id', async (req, res) => {
    const type = await Type.findOne({where: {id: req.params.id}});
    res.send(type);
});

router.post('/', async (req, res) => {
    const type = req.body;
    const types = await Type.create({name: type.name});
    res.send(types);
});
router.put("/:id", async (req, res, next) => {
    const type = await Type.update(
        {name: req.body.name},
        {where: {id: req.params.id}}
    );
    res.send(type);
});
module.exports = router;
