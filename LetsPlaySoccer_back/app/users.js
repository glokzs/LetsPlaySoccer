const express = require('express');
const router = express.Router();
const User = require('../models/User');

const multer  = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

    router.get('/', (req, res) => {
        User.findAll()
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
            }
        }).then(user => {
                if (user) {
                    res.json(user)
                } else {
                    res.send('User does not exist')
                }
        }).catch(err => {
            res.send('error: ' + err)
        })

    });

    router.post('/', upload.single('avatar'), (req, res) => {
        console.log('hello');
        const user = {
            displayName: req.body.displayName,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        };

        if (req.file) {
            user.avatar = req.file.filename;
        }

        User.create(user)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.json('error: ' + err)
            });
    });

    router.post('/sessions', async (req, res) => {
        const user = await User.findOne({
            where: {
                phoneNumber: req.body.phoneNumber
            }
        });

        if(!user) {
            return res.status(400).send({message: 'User not found'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch) {
            return res.status(400).send({message: 'Wrong password'});
        }

        user.update({token: nanoid()});

        res.send(user);

    });

    router.delete('/sessions', async (req, res) => {
        const token = req.get("Token");
        const success = {message: "Logged out!"};
        if(!token) return res.send(success);

        const user = await User.findOne({
            where: {
                token: token
            }
        });

        if(!user) return res.send(success);

        user.update({token: ''});

        res.send(success);
    });



module.exports = router;
