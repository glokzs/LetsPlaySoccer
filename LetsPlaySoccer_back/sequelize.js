const Sequelize = require('sequelize');
const UserModel = require("./models/User");
const FieldModel = require("./models/Field");
const ImageModel = require('./models/Image');
const sequelize = new Sequelize("LetsPlaySoccer", 'root', 'mypass', {
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
const Field = FieldModel(sequelize, Sequelize);
const Image = ImageModel(sequelize, Sequelize);
sequelize.sync();
module.exports = {
    User,
    Field,
    Image
};
