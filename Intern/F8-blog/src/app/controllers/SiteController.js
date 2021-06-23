const Course = require('../models/Course');
const {multiMongooseToObject} = require('../../util/mongoose');
class SiteController {
    index(req, res,next) {
        Course.find({})
            .then(course => {
                course = multiMongooseToObject(course);
                res.render('home',{course});
            })
            .catch(next)
    }
}

module.exports = new SiteController();
