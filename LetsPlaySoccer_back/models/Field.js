module.exports = (sequelize, type) => {
  const Field = sequelize.define(
    'field',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: type.CHAR,
        allowNull: false,
        validate: {
          len: {
            args: [4,50],
            msg: "Не допустимое кол-во символов в имени"
          },
          notNull: {
            msg: "Не допустимое кол-во символов в имени"
          }
        },
      },
      description: {
        type: type.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [50, 5000],
            msg: "Описание слишком короткое"
          },
          notNull: {
            msg: "Описание слишком короткое"
          }
        },
      },
      address: {
        type: type.CHAR,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Введите адрес поля"
          }
        }
      },
      lat: {
        type: type.DOUBLE,
        allowNull: true,
        defaultValue: null,
        validate: {
          min:  {
            args: -90,
            msg: "Не допустимое значение широты"
          },
          max: {
            args: 90,
            msg: "Не допустимое значение широты"
          }
        }
      },
      lng: {
        type: type.DOUBLE,
        allowNull: true,
        defaultValue: null,
        validate: {
          min:  {
            args: -180,
            msg: "Не допустимое значение долготы"
          },
          max: {
            args: 180,
            msg: "Не допустимое значение долготы"
          }
        }
      },
      phoneNumber: {
        type: type.TEXT,
        defaultValue: '{}',
        get() {
            return (JSON.parse(this.getDataValue('phoneNumber')))
        },
        set(value) {
            this.setDataValue('phoneNumber', JSON.stringify(value))
        }
      },
      email: {
        type: type.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Некорректно указан почтовый адрес"
          }
        }
      },
      timetable: {
        type: type.TEXT,
        defaultValue: '{}',
        get() {
          return (JSON.parse(this.getDataValue('timetable')))
        },
        set(value) {
          this.setDataValue('timetable', JSON.stringify(value))
        }
      },
      webSite: {
        type: type.STRING
      },
      formats: {
        type: type.TEXT,
        defaultValue: '{}',
        get() {
          return (JSON.parse(this.getDataValue('formats')))
        },
        set(value) {
          this.setDataValue('formats', JSON.stringify(value))
        }
      },
      shower: {
        type: type.BOOLEAN,
        defaultValue: false,
      },
      minPrice: {
        type: type.INTEGER,
        validate: { min: 0 }
      },
      disabled: {
        type: type.BOOLEAN,
        allowNull: false,
        defaultValue: false

      },
      images: {
        type: type.TEXT,
        defaultValue: '{}',
        get() {
          return (JSON.parse(this.getDataValue('images')))
        },
        set(value) {
          this.setDataValue('images', JSON.stringify(value))
        }
      }
    },
    {
      timestamps: false,
      validate: {
        bothCoordsOrNone() {
          if ((this.latitude === null) !== (this.longitude === null)) {
            throw new Error('Укажите широту и долготу.');
          }
        }
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }
  );
  return Field;
};
