module.exports = (sequelize, type) => {
    const Format = sequelize.define(
        'format',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: type.STRING,
            }
        },
        {
            timestamps: false
        }
    );
    return Format;
};