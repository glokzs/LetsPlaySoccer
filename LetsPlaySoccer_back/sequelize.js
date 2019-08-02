const Sequelize = require('sequelize');
const UserModel = require("./models/User")
const sequelize = new Sequelize("LetsPlaySoccer", 'root', '1qaz@WSX29', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const User = UserModel(sequelize, Sequelize);
sequelize.sync({force: true});
module.exports = {
    User
};
