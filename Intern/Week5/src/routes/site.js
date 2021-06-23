const siteController = require('../app/controllers/siteController')
const express = require('express')
const router = express.Router()

router.get('/',siteController.index)

module.exports = router