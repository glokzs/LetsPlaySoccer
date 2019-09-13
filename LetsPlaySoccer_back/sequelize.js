const Sequelize = require('sequelize');
const UserModel = require("./models/User");
const FieldModel = require("./models/Field");
const FormatModel = require("./models/Format");
const CoverModel = require("./models/Cover");
const TypeModel = require("./models/Type");
const MatchModel = require("./models/Match");
const UserMatchModel = require('./models/UserMatch');
const {_user, _password} = require('./mysqlpass');

// create locally file, name it 'mysqlpass.js'
// write following in it:
//-----------------------------------------------
//module.exports = {
//     _user: 'your_sql_user',
//     _password: 'your_sql_password'
// };
//------------------------------------------------


const sequelize = new Sequelize("LetsPlaySoccer", _user, _password, {

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

const Match = MatchModel(sequelize, Sequelize);
const UserMatch = UserMatchModel(sequelize, Sequelize);

User.belongsToMany(Match, {through: UserMatch});
Match.belongsToMany(User, {through: UserMatch});

Match.belongsTo(Field);
Field.belongsTo(Type);
Field.belongsTo(Cover);

sequelize.sync();
module.exports = {
    User,
    Field,
    Format,
    Cover,
    Type,
    Match,
    UserMatch
};

