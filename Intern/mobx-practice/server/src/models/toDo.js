const knex = require('../../config/connect').knex;
const bookshelf = require('bookshelf')(knex);
const toDo = bookshelf.model('todo', {
    tableName: "todo"
});

module.exports = toDo;