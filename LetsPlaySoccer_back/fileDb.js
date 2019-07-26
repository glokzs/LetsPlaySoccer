const fs = require('fs');

let data = {
    users: []
};

const file = './db.json';

module.exports = {
    init() {
        try {
            const fileContents = fs.readFileSync(file);
            data = JSON.parse(fileContents);
        } catch (e) {
            console.log(e);
            data = [];
        }
    },
    getItems(type) {
        switch (type) {
            case 'users':
                return data.users;
            case 'matches':
                return data.matches;
        }
    },
    findBy(casing, attrib, type) {
        switch (type) {
            case 'users':
                switch (casing) {
                    case 'id':
                        const indexId = data.users.findIndex(item => item.id === attrib);
                        return data.users[indexId];
                    case 'number':
                        const indexNum = data.users.findIndex(item => item.phoneNumber === attrib);
                        return data.users[indexNum];
                    case 'token':
                        const indexToken = data.users.findIndex(item => item.token === attrib);
                        return data.users[indexToken];
                    default:
                        return [];
                }
            case 'matches':
                return [];
            default:
                return [];
        }
    },
    addItem(item, type) {
        data.users.push(item);
        this.save();
    },
    save() {
        fs.writeFileSync(file, JSON.stringify(data));
    },
    saveToken(user) {
        const index = data.users.findIndex(item => item.id === user.id);
        data.users[index].token = user.token;
        this.save();
    },
    deleteToken(id) {
        const index = data.users.findIndex(item => item.id === id);
        data.users[index].token = '';
        this.save();
    }
};
