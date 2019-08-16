const Sequelize = require('sequelize');
const UserModel = require("./models/User");
const FieldModel = require("./models/Field");
const FormatModel = require("./models/Format");
const CoverModel = require("./models/Cover");
const TypeModel = require("./models/Type");

const sequelize = new Sequelize("LetsPlaySoccer", 'root', '1qaz@WSX29', {
    host: 'localhost',
    dialect: 'mysql',
    charset: 'utf8',
    collate: 'utf8_general_ci',
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

const Format = FormatModel(sequelize, Sequelize);
const Cover = CoverModel(sequelize, Sequelize);
const Type = TypeModel(sequelize, Sequelize);


sequelize.sync();
module.exports = {
    User,
    Field,
    Format,
    Cover,
    Type
};
