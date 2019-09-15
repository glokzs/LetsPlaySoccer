const express = require('express');
const router = express.Router();
const {UserMatch, User, Match} = require('../sequelize');

router.post('/', async (req, res) => {
    const user = await User.findOne({where: {id: req.body.userId}});
    const match = await Match.findOne({where: {id: req.body.matchId}});
    if(user && match) {
        UserMatch.create({
            matchId: req.body.matchId,
            userId: req.body.userId,
            confirmed: false,
            organizer: false
        }).then(data => {
            res.send(data);
        })
            .catch(err => res.json(err.errors));
    } else {
        res.status(400).send({message: 'Неправильные данные'});
    }
});

router.delete('/', async (req, res) => {
    const user = await User.findOne({where: {id: req.body.userId}});
    const match = await Match.findOne({where: {id: req.body.matchId}});
    if(user && match) {
        UserMatch.destroy({
            where: {
                matchId: req.body.matchId,
                userId: req.body.userId
            }
        }).then(data => {
            res.sendStatus(200);
        })
            .catch(err => res.json(err.errors));
    } else {
        res.status(400).send({message: 'Неправильные данные'});
    }
});

module.exports = router;
