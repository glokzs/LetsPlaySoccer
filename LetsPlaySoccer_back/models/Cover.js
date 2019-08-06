module.exports = (sequelize, type) => {
    const Cover = sequelize.define(
        'cover',
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
    return Cover;
};