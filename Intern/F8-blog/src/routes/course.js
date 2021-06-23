const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.get('/create',courseController.create);
router.post('/create',courseController.store);
router.get('/:slug', courseController.show);
router.get('/:slug/edit',courseController.edit);
router.post('/:slug/edit',courseController.update);

module.exports = router;
