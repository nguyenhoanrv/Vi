const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'thinh123',
    database: 'todo',
    charset: 'utf8',
  },
})
const bookshelf = require('bookshelf')(knex)
module.exports.knex = knex
