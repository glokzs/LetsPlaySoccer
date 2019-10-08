const express = require('express');
const router = express.Router();
const {GenerationCode, User} = require('../sequelize');
const generate = require('nanoid/generate');
const accountSid = 'AC320c849bbb97b563aca1ec17ee1e15f8';
const authToken = 'c43cd2acdd619291bde086a66d1bd9e0';
const client = require('twilio')(accountSid, authToken);

router.post('/', async (req, res) => {
    try {
        const user = {
            displayName: req.body.displayName,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            code: generate('123456789', 4)
        };

        if(req.body.phoneNumber) {
            const userFromDB = await User.findOne({
                where: {
                    phoneNumber: req.body.phoneNumber
                },
            });
            const isCode = await GenerationCode.findOne({
                where: {
                    phoneNumber: req.body.phoneNumber
                },
            });
            if(isCode) {
                let message = "\nВаш код подтверждения: " + isCode.dataValues.code;
                console.log(message);
                client.messages.create({
                    body: message,
                    from: '+19384440294',
                    to: user.phoneNumber
                }).then(message => console.log(message));
                return res.send(isCode);
            }
            if(userFromDB) {
                return res.status(400).send({message: 'Пользователь уже существует'});
            }
            GenerationCode.create(user)
                .then( data => {
                const user = data.toJSON();
                let message = "\nВаш код подтверждения: " + user.code;
                console.log(message);
                client.messages.create({
                    body: message,
                    from: '+19384440294',
                    to: user.phoneNumber
                }).then(message => console.log(message));
                delete user.password;
                delete user.code;
                console.log(user);
                res.send(user);
            }, error => {
                    res.status(400).send({message: error.errors[0].message});
                })


        } else {
            return res.status(400).send({message: "Введите номер телефона"});
        }
    }catch (e) {
        res.status(500).send({message: "Что-то пошло не так"});
    }

});
module.exports = router;