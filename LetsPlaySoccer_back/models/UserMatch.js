module.exports = (sequelize, type) => {
    const UserMatch = sequelize.define(
        'user_match',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            confirmed: {
                type: type.BOOLEAN,
            }
        },
        {
            timestamps: false
        }
    );
    return UserMatch;
};
