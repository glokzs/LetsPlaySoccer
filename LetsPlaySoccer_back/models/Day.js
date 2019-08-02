module.exports = (sequelize, type) => {
    const Day = sequelize.define(
        'day',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: type.STRING,
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
    return Day;
};