const knex = require('../../config/database/db');
const bookshelf = require("bookshelf")(knex);

const User = bookshelf.model('User', {
    tableName: 'users'
})
module.exports = User