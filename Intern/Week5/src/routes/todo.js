const express = require('express')
const router = express.Router()
const todoController = require('../app/controllers/todoController')

router.get('/update_status/:id',todoController.update_status)

router.get('/delete/:id',todoController.delete)

router.post('/search',todoController.search)

router.get('/:id',todoController.detail)

router.post('/:id',todoController.update)

router.get('/',todoController.index)

module.exports = router
