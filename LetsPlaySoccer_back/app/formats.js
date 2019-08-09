const express = require('express');
const router = express.Router();
const { Format } = require('../sequelize');


router.get('/', async (req, res) => {
    const formats = await Format.findAll();
    res.send(formats);
});
//
router.get('/:id', async (req, res) => {
    const format = await Format.findOne({where: {id: req.params.id}});
    res.send(format);
});

router.post('/', async (req, res) => {
    const format = req.body;
    const formats = await Format.create({title: format.title});
    res.send(formats);
});
router.put("/:id", async (req, res, next) => {
    const format = await Format.update(
        {title: req.body.title},
        {where: {id: req.params.id}}
    );
    res.send(format);
});
module.exports = router;
