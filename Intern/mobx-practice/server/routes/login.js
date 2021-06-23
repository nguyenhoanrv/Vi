var express = require('express');
var router = express.Router();
const loginController = require('../src/controllers/loginController');


router.get('/', loginController.index);
router.post('/',loginController.login);


module.exports = router;