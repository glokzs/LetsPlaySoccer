const express = require('express');
const router = express.Router();
const {User, GenerationCode} = require('../sequelize');

const multer  = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.userPath);
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

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

router.put('/', [auth, upload.single('avatar')], async (req, res) => {
 try {
   const updateUser = {
     displayName: req.body.displayName
   };
   if(req.body.email) {
     updateUser.email = req.body.email;
   }
   console.log(req.body);
   console.log(req.file);
   if (req.file) {
     updateUser.avatar = req.file.filename;
   }
   const user = await User.findOne({
     where: {
       id: req.user.id
     },
     attributes: {
       exclude: ['password']
     }
   });

   console.log(updateUser);
   user.update({...updateUser})
     .then(data => {
       const user = data.toJSON();
       console.log(user);
       res.send(user);
     })
 } catch (e) {
   res.send(e);
 }
});


router.post('/sessions', async (req, res) => {
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
    res.status(500).send({message: "Что-то пошло не так"});
  }
});

router.delete('/sessions', async (req, res) => {
try {
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
}catch (e) {
  res.status(500).send({message: "Что-то пошло не так"});
}
});

module.exports = router;
