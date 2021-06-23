const knex = require('../../config/connect').knex
const get = require('../models/getUser')

function responseApi(status, message, data = null) {
  const result = { status, message, data }
  return result
}

class LoginController {
  //GET
  index(req, res) {
    res.render('login', { error: false, message: null })
  }

  //POST
  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await get(username, password)
      const result = responseApi(true, 'Success', user.toJSON())
      return res.json(result)
    } catch (err) {
      const result = responseApi(false, err.message, null)
      return res.json(result)
    }
  }
}

module.exports = new LoginController()
