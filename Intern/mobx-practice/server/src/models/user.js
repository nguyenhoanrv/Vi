const knex = require('../../config/connect').knex
const bookshelf = require('bookshelf')(knex)
const User = bookshelf.model('User', {
  tableName: 'users',
})

module.exports = new User()
