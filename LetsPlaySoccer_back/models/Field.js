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

            },
            address: {
                type: type.CHAR,
                allowNull: false,
            },
            latitude: {
                type: type.INTEGER,
                allowNull: true,
                defaultValue: null,
                validate: {
                    min:  {
                        args: -90,
                        msg: "Не допустимое значение ширины"
                    },
                    max: {
                        args: 90,
                        msg: "Не допустимое значение ширины"
                    }
                }
            },
            longitude: {
                type: type.INTEGER,
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
                type: type.STRING,
                validate: {
                    isMobilePhone: {
                        args: ['kk-KZ', {strictMode: true}],
                        msg: "Не правильный формат номера"
                    }
                },
                allowNull: false,
            },
            email: {
                type: type.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            timetable: {
              type: type.TEXT
            },
            webSite: {
                type: type.STRING
            },
            covers: {
                type: type.STRING,
            },
            formats: {
                type: type.STRING,
            },
            shower: {
                type: type.BOOLEAN
            },
            types: {
                type: type.STRING,
            },
            disabled: {
                type: type.BOOLEAN,
                allowNull: false,
                defaultValue: false

            },
            images: {
                type: type.TEXT
            }
        },
        {
            timestamps: false
        },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        }
    );
    return Field;
};
