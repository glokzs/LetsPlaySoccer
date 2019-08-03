const Sequelize = require('sequelize');
const UserModel = require("./models/User");
const FieldModel = require("./models/Field");
const ImageModel = require('./models/Image');
const TimeModel = require("./models/Time");
const FormatModel = require("./models/Format");
const DayModel = require("./models/Day");
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
const Image = ImageModel(sequelize, Sequelize);
const FieldFormat = sequelize.define('field_format', {}, {timestamps: false});
const FieldDay = sequelize.define('field_day', {}, {timestamps: false});
const Day = DayModel(sequelize, Sequelize);
const Format = FormatModel(sequelize, Sequelize);
const Time = TimeModel(sequelize, Sequelize);

Day.hasMany(Time);
Image.belongsTo(Field);
Field.belongsToMany(Format, { through: FieldFormat, unique: false });
Format.belongsToMany(Field, { through: FieldFormat, unique: false });
Field.belongsToMany(Day, { through: FieldDay, unique: false });
Day.belongsToMany(Field, { through: FieldDay, unique: false });

sequelize.sync();
module.exports = {
    User,
    Field,
    Image,
    Day,
    Time,
    Format
};
