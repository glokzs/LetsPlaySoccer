const bcrypt = require('bcrypt');

module.exports = (sequelize, type) => {
    const GenerationCode = sequelize.define(
        'generationCode',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            code: {
                type: type.INTEGER,
                unique: true,
                notNull: true,
                notEmpty: true
            },
            password: {
                type: type.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [8, 40],
                        msg: "Пароль должен быть не короче 8 символов."
                    },
                    is: {
                        args: "[0-9a-zA-Z!@#$%^&*]",
                        msg: "Пароль должен содержать только латинские буквы и специальные символы."
                    }
                }
            },
            phoneNumber: {
                type: type.STRING,
                validate: {
                    isMobilePhone: {
                        args: ['kk-KZ', {strictMode: true}],
                        msg: "Не правильный формат номера."
                    }
                },
                allowNull: false,
            },
            displayName: {
                type: type.STRING(100),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Введите ваше имя."
                    },
                    notEmpty: {
                        msg: "Введите ваше имя."
                    }
                }
            },
        },
        {
            timestamps: false
        }
    );
    GenerationCode.beforeCreate((code) => {
        return bcrypt.hash(code.password, 10)
            .then(hash => {
                code.password = hash;
            })
            .catch(err => {
                throw new Error(err);
            });
    });

    GenerationCode.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password)
    };

    return GenerationCode;
};
