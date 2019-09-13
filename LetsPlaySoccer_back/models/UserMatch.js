module.exports = (sequelize, type) => {
    return sequelize.define(
    'user_match',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            confirmed: {
                type: type.BOOLEAN,
            },
            organizer: {
                type: type.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: false
        }
    );
};
