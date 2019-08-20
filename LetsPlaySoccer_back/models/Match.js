module.exports = (sequelize, type) => {
    const Match = sequelize.define(
        'match',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            start: {
                type: type.DATE,
                allowNull: false
            },
            end: {
                type: type.DATE,
                allowNull: false
            },
            status: {
                type: type.STRING
            },
            organizer: {
                type: type.TEXT
            },
            playersInTeam: {
                type: type.INTEGER
            },
            numOfTeams: {
                type: type.INTEGER
            },
            price: {
                type: type.INTEGER
            },
            private: {
                type: type.BOOLEAN
            }
        },
        {
            timestamps: false
        },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        }
    );
    return Match;
};
