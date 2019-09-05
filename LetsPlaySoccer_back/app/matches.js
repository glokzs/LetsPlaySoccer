const fs = require('fs');
const express = require('express');
const router = express.Router();
const {Match, User, Field, UserMatch} = require('../sequelize');

router.get('/', async (req, res) => {
    const matches = await Match.findAll({
        include: [
            {model: Field},
            {model: User}
        ]
    });
    res.send(matches);
});

router.get('/:id', async (req, res) => {
    const match = await Match.findOne({
        where: {id: req.params.id}
    });
    res.send(match);

});

router.post('/', async (req, res) => {

    const match = {
        start: req.body.start,
        end: req.body.end,
        playersInTeam: req.body.playersInTeam,
        numOfTeams: req.body.numOfTeams,
        price: req.body.price,
        private: req.body.private,
        fieldId: req.body.fieldId,
        organizer: req.body.userId
        // organizer: req.user.id

    };

    Match.create(match).then(match => UserMatch.create({
        matchId: match.id,
        userId: match.organizer,
        confirmed: true,
        organizer: true
    }))
        .then(userMatch => {
            Match.findOne({
                where: {
                    id: userMatch.matchId
                },
                include: [
                    {model: Field},
                    {model: User}
                ]
            }).then((data => res.json(data)))
        })
        .catch(err => res.json(err.errors));
});

module.exports = router;
