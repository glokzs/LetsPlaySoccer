const express = require('express');
const router = express.Router();
const {User, GenerationCode} = require('../sequelize');

const multer  = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.userPath);
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber
      },
    }).then(data => {
      if (data) {
        cb(null, false);
      } else {
        cb(null, true);
      }
    }).catch(err => {
      cb(null, false);
    });
  }
});

router.get('/', (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['password']
    }
  })
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: ['password']
    }
  }).then(user => {
    if (user) {
      res.json(user)
    } else {
      res.send('Такого пользователя нет')
    }
  }).catch(err => {
    res.status(400).send('Ошибка: ' + err)
  })

});

router.post('/register/:code', async (req, res) => {

  const generationCode = await GenerationCode.findOne({where: {phoneNumber: req.body.phoneNumber}});
  const code = generationCode.dataValues.code;
  console.log(req.params);
  const userCode = parseInt(req.params.code);
  if(code === userCode) {
    const user = {
      displayName: req.body.displayName,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      email: req.body.email,
      token: nanoid()
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
      User.create(user)
          .then(data => {
            const user = data.toJSON();
            delete user.password;
            res.json(user);
          })
          .catch(err => {
            res.json({message: err.errors[0].message})
          });

    } else {
      return res.status(400).send({message: "Введите номер телефона"})
    }
  }
  else res.send({message: "Error"});
});

router.post('/sessions', async (req, res) => {
  // console.log(req.body);
  try {
    const user = await User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber
      },
    });

    console.log(user);

    if(!user) {
      return res.status(400).send({message: 'Такого пользователя нет'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if(!isMatch) {
      return res.status(400).send({message: 'Неверный пароль'});
    }

    user.update({token: nanoid()});
    const copyUser = user.toJSON();
    delete copyUser.password;
    res.status(200).json(copyUser);
  }catch (e) {
    res.status(404).send({message: "Что-то пошло не так"});
  }
});

router.delete('/sessions', async (req, res) => {
  const token = req.get("Authorization");
  const success = {message: "Вы вышли из сессии"};
  if(!token) return res.send(success);

  const user = await User.findOne({
    where: {
      token: token
    },
    attributes: {
      exclude: ['password']
    }
  });

  if(!user) return res.send(success);

  user.update({token: nanoid()});

  res.send(success);
});

module.exports = router;
