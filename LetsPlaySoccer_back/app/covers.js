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

router.post('/',upload.single('image'), async (req, res) => {
    const cover = req.body.cover;
    const covers = Cover.create(cover);
    res.send(cover);
});

module.exports = router;
