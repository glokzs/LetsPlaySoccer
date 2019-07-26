const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../database/db.js');

const User = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        password: {
            type: Sequelize.STRING,
            required: true,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            unique: true,
            required: true,
        },
        displayName: {
            type: Sequelize.STRING,
            required: true,
        },
        avatar: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false
    }
);

User.beforeCreate((user) => {
    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => {
            throw new Error(err);
            // console.log(err)
        });
});

User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
};

module.exports = User;
