const knex = require('../../config/database/db');
const bookshelf = require("bookshelf")(knex);

var todo = bookshelf.Model.extend({
    tableName: "todo"
});

module.exports = todo