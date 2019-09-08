const fs = require('fs');
const express = require('express');
const router = express.Router();
const {Match, User, Field, UserMatch} = require('../sequelize');

router.get('/', async (req, res) => {
    let query = {};
    if(req.query.organizerId) {
        query = {organizerId: req.query.organizerId};
    }
    const matches = await Match.findAll({
        where : query,
        include: [
            {
                model: Field,
                attributes: {
                    exclude: [
                        'coverId',
                        'description',
                        'disabled',
                        'email',
                        'formats',
                        'id',
                        'minPrice',
                        'phoneNumber',
                        'shower',
                        'timetable',
                        'typeId',
                        'webSite'
                    ]
                }
            },
            {
                model: User,
                attributes: {
                    exclude: ['password', 'role', 'id', 'token']
                }
            }
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
    const organizer = await User.findOne(
        {
            where: {id: req.body.userId},
            attributes: {
                exclude: ['password', 'role', 'id', 'token']
            }
        })
        .then(data => JSON.stringify(data));
    const match = {
        start: req.body.start,
        end: req.body.end,
        playersInTeam: req.body.playersInTeam,
        numOfTeams: req.body.numOfTeams,
        price: req.body.price,
        private: req.body.private,
        fieldId: req.body.fieldId,
        organizerId: req.body.userId,
        organizer
        // organizer: req.user.id

    };

    Match.create(match).then(match => UserMatch.create({
        matchId: match.id,
        userId: req.body.userId,
        confirmed: true,
        organizer: true
    }))
        .then(userMatch => {
            Match.findOne({
                where: {
                    id: userMatch.matchId
                },
                include: [
                    {
                        model: Field,
                        attributes: {
                            exclude: [
                                'coverId',
                                'description',
                                'disabled',
                                'email',
                                'formats',
                                'id',
                                'minPrice',
                                'phoneNumber',
                                'shower',
                                'timetable',
                                'typeId',
                                'webSite'
                            ]
                        }
                    },
                    {
                        model: User,
                        attributes: {
                            exclude: ['password', 'role', 'id', 'token']
                        }
                    }
                ]
            }).then((data => res.json(data)))
        })
        .catch(err => res.json(err.errors));
});

module.exports = router;
