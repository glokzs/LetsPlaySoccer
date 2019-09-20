const express = require('express');
const router = express.Router();
const {GenerationCode, User} = require('../sequelize');
const axios = require('axios');
const generate = require('nanoid/generate');
const numbers = require('nanoid-dictionary/numbers');


router.post('/', async (req, res) => {
    const user = {
        displayName: req.body.displayName,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        code: generate(numbers, 4)
    };

    if(req.body.phoneNumber) {
        const userFromDB = await User.findOne({
            where: {
                phoneNumber: req.body.phoneNumber
            },
        });

        if(userFromDB) {
            return res.status(400).send({message: 'Пользователь уже существует'});
        }


        await GenerationCode.findOrCreate({where: {phoneNumber: user.phoneNumber}, defaults: {displayName: user.displayName, code: user.code, password: user.password}}).spread((user, created) => {
            return user;
        })
            .then(async data => {
                const user = data.toJSON();
                delete user.password;
                console.log(user.code);
                const phone = user.phoneNumber.replace('+', '');
                console.log(phone);
                res.send(user);
            })
            .catch(err => {
                res.json({message: err.errors[0].message});
            });

    } else {
        return res.status(400).send({message: "Введите номер телефона"});
    }
});
module.exports = router;