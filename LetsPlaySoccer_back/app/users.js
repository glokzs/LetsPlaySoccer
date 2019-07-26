const express = require('express');
const router = express.Router();
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

const createRouter = (db) => {
    db.init();

    router.get('/', (req, res) => {
        let users = db.getItems('users');
        res.send(users);
    });

    router.get('/:id', (req, res) => {
        const user = db.findBy('id', req.params.id, 'users');
        if (user) res.send(user);
        else res.sendStatus(500);

    });

    router.post('/', upload.single('avatar'), (req, res) => {
        if (db.getItems('users').length) {
            const busyNumber = db.findBy('number', req.body.phoneNumber, 'users');

            if (busyNumber) res.status(500).send({message: 'busy phone number'});
        }

        const user = {
            id: nanoid(),
            displayName: req.body.displayName,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        };

        if (req.file) {
            user.avatar = req.file.filename;
        }

        db.addItem(user, 'users');

        res.send(user);
    });

    router.post('/sessions', async (req, res) => {
        const user = db.findBy('number', req.body.phoneNumber, 'users');
        console.log(user);
        if(!user) {
            return res.status(400).send({message: 'User not found'});
        }

        if(!(user.password === req.body.password)) {
            return res.status(400).send({message: 'Wrong password'});
        }

        user.token = nanoid();

        db.saveToken(user);

        res.send(user);

    });

    router.delete('/sessions', async (req, res) => {
        const token = req.get("Token");
        const success = {message: "Logged out!"};
        if(!token) return res.send(success);

        const user = db.findBy('token', token, 'users');
        if(!user) return res.send(success);

        db.deleteToken(user.id);

        res.send(success);
    });

    return router

};

module.exports = createRouter;
