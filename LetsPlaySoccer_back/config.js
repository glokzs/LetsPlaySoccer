const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    userPath: path.join(rootPath, 'public/uploads/users'),
    fieldPath: path.join(rootPath, 'public/uploads/fields')
};
