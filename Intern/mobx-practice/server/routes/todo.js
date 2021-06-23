var express = require('express')
var router = express.Router()
const todoController = require('../src/controllers/todoController')

router.get('/', todoController.index)
router.post('/update/:id', todoController.updatestatus)
//router.post('/', todoController.searchTitle);
router.post('/:id', todoController.delete)
router.get('/:id', todoController.edit)
router.post('/edit/:id', todoController.edittodo)

module.exports = router
