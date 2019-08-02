module.exports = (sequelize, type) => {
    const Image = sequelize.define(
        'image',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            url: {
                type: type.STRING,
            },
            disabled: {
                type: type.BOOLEAN,
                default: false
            }
        },
        {
            timestamps: false
        }
    );
    return Image;
};