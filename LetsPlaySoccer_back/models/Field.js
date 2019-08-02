module.exports = (sequelize, type) => {
    const Field = sequelize.define(
        'user',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: type.STRING,
                required: true,
            },
            description: {
                type: type.text,
            },
            address: {
                type: type.STRING,
                required: true,
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
            typeField: {
                type: type.STRING(30)
            },
            covering: {
                type: type.STRING(100)
            },
            phoneNumber: {
                type: type.STRING,
                validate: {
                    isMobilePhone: {
                        args: ['kk-KZ', {strictMode: true}],
                        msg: "Не правильный формат номера"
                    }
                },
                required: true,
            },
            email: {
                type: type.STRING,
                required: true,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            webSite: {
                type: type.STRING
            }
        },
        {
            timestamps: false
        },
        {
            validate: {
                bothCoordsOrNone() {
                    if ((this.latitude === null) !== (this.longitude === null)) {
                        throw new Error('Require either both latitude and longitude or neither');
                    }
                }
            }
        }
    );
    return Field;
};