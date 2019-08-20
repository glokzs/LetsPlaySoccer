const express = require('express');
const router = express.Router();
const { Format } = require('../sequelize');


router.get('/', async (req, res) => {
    const formats = await Format.findAll();
    res.send(formats);
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
                    res.status(404).send({message: "Некорректные данные"});
                }
            })
    } catch (e) {
        res.status(500).send("Что-то пошло не так");
    }
});

router.post('/', async (req, res) => {
    const format = req.body;
    const formats = await Format.create({name: format.name});
    res.send(formats);
});
router.put("/:id", async (req, res, next) => {
    const format = await Format.update(
        {name: req.body.name},
        {where: {id: req.params.id}}
    );
    res.send(format);
});
module.exports = router;
