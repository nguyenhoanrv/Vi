const express = require('express')
const router = express.Router
const loginController = require('../app/controllers/loginController')

router.get('/',loginController.logout)

module.exports = router