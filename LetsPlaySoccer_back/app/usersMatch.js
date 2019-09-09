const fs = require('fs');
const express = require('express');
const router = express.Router();
const {UserMatch, User} = require('../sequelize');

router.get('/:id', async (req, res) => {
    console.log(req);
    console.log(res);

    const userMatch = await UserMatch.findOne({where: {id: User.id}});
    res.send(userMatch);
});
// router.post('/', async (req, res) => {
//     const userMatch = await UserMatch.findOne({where: {id: User.id}});
//     userMatch.confirmed = User.confirmed;
//     res.send(userMatch);
// });