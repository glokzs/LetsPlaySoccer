module.exports = (sequelize, type) => {
    const Type = sequelize.define(
        'type',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: type.STRING,
            }
        },
        {
            timestamps: false
        }
    );
    return Type;
};