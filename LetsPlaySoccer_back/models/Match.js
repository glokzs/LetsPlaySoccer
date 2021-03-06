module.exports = (sequelize, type) => {
    return sequelize.define(
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
                type: type.STRING,
                allowNull: false,
                defaultValue: 'В ожидании' // values: В ожидании, Игра началась, Игра Завершена | changes in backend
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
                type: type.BOOLEAN,
                defaultValue: false
            },
            organizer: {
                type: type.TEXT,
                defaultValue: '{}',
                get() {
                    return (JSON.parse(this.getDataValue('organizer')))
                },
                set(value) {
                    this.setDataValue('organizer', JSON.stringify(value))
                }
            },
            organizerId: {
                type: type.INTEGER,
                allowNull: false
            },
            disabled: {
                type: type.BOOLEAN,
                defaultValue: false
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
};
