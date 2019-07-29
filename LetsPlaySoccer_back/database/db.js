const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize("LetsPlaySoccer", 'root', 'password10', {
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

sequelize.sync();
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
