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
                allowNull: false,
                defaultValue: false
            }
        },
        {
            timestamps: false
        }
    );
    return Image;
};