const express = require('express');
const router = express.Router();
const {UserMatch, User, Match} = require('../sequelize');
const auth = require('../middlewares/auth');


router.post('/', auth, async (req, res) => {
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

router.delete('/', auth, async (req, res) => {
    const user = await User.findOne({where: {id: req.body.userId}});
    const match = await Match.findOne({where: {id: req.body.matchId}});
    if(user && match) {
        UserMatch.destroy({
            where: {
                matchId: req.body.matchId,
                userId: req.body.userId
            }
        }).then(data => {
            res.json({matchId: req.body.matchId});
        })
            .catch(err => res.json(err.errors));
    } else {
        res.status(400).send({message: 'Неправильные данные'});
    }
});

router.patch('/', auth, async (req, res) => {
    const user = await User.findOne({where: {id: req.body.data.userId}});
    const match = await Match.findOne({where: {id: req.body.data.matchId}});
    if(user && match) {
        UserMatch.findOne({
            where: {
                matchId: req.body.data.matchId,
                userId: req.body.data.userId,
            }
        })
            .then(data => {
                data.update({
                    confirmed: true
                });
                return data;
            })
            .then(data => {
            res.json({matchId: req.body.data.matchId});
        })
            .catch(err => res.json(err.errors));
    } else {
        res.status(400).send({message: 'Неправильные данные'});
    }
});

module.exports = router;
