const express = require('express');
const router = express.Router();
const {GenerationCode, User} = require('../sequelize');
const axios = require('axios');
const generate = require('nanoid/generate');
const accountSid = 'AC320c849bbb97b563aca1ec17ee1e15f8';
const authToken = 'c43cd2acdd619291bde086a66d1bd9e0';
const client = require('twilio')(accountSid, authToken);

router.post('/', async (req, res) => {
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

    if(userFromDB) {
      return res.status(400).send({message: 'Пользователь уже существует'});
    }


    await GenerationCode.findOrCreate({where: {phoneNumber: user.phoneNumber}, defaults: {displayName: user.displayName, code: user.code, password: user.password}}).spread((user, created) => {
      return user;
    })
      .then( data => {
        const user = data.toJSON();
        let message = "\nВаш код подтверждения: " + user.code;
        console.log(message);
        client.messages.create({
            body: message,
            from: '+19384440294',
            to: user.phoneNumber
          })
          .then(message => console.log(message.sid));
        delete user.password;
        delete user.code;
        console.log(user);
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