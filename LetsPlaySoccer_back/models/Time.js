module.exports = (sequelize, type) => {
    const Time = sequelize.define(
        'time',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            from: {
                type: type.TIME,
                allowNull: false
            },
            to: {
                type: type.TIME,
                allowNull: false
            },
            price: {
                type: type.INTEGER,
                allowNull: false,
            },
            disabled: {
                type: type.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            timestamps: false
        }
    );
    return Time;
};