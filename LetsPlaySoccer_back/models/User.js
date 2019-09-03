const bcrypt = require('bcrypt');

module.exports = (sequelize, type) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        unique: true,
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
      email: {
        type: type.STRING,

        validate: {
          isEmail: {
            msg: "Некорректный почтовый адрес."
          }
        }
      },
      avatar: {
        type: type.STRING
      },
      token: {
        type: type.STRING
      },
      role: {
        type: type.STRING,
        defaultValue: "user",
        validate: {
          isIn: {
            args: [['user', 'admin']]
          }
        }
      }
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
      });
  });

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
  };

  return User;
};
