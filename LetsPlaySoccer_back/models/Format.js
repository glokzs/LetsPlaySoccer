module.exports = (sequelize, type) => {
    const Format = sequelize.define(
        'format',
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
    return Format;
};