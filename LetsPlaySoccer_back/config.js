const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    userPath: path.join(rootPath, 'public/uploads/user'),
    fieldPath: path.join(rootPath, 'public/uploads/field')
};
