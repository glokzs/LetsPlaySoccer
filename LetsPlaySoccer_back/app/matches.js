const fs = require('fs');
const express = require('express');
const router = express.Router();
const {Match, User} = require('../sequelize');

router.get('/', async (req, res) => {
    const matches = await Match.findAll();
    res.send(matches);
});

router.get('/:id', async (req, res) => {
    const match = await Match.findOne({where: {id: req.params.id}});
    res.send(match);

});

// router.post('/', async (req, res) => {
//
//     const match = {
//         start: req.body.start,
//         end: req.body.end,
//         status: 'в ожидании',
//         organizerId: req.user.id,
//         playersInTeam: req.body.playersInTeam,
//         numOfTeams: req.body.numOfTeams,
//         price: req.body.price,
//         private: req.body.private
//     }
// };

module.exports = router;
