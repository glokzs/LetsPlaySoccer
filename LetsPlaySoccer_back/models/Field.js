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
                // unique: true
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
                validate: { min: -90, max: 90 }
            },
            longitude: {
                type: type.INTEGER,
                allowNull: true,
                defaultValue: null,
                validate: { min: -180, max: 180 }
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
                // validate: {
                //     isEmail: true
                // }
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
