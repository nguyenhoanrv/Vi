const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose');
class CourseController {
    show(req, res,next) {
        Course.findOne({slug: req.params.slug })
            .then(course => {
                course = mongooseToObject(course);
                res.render('course/show',{course});
            })
            
    }
    // get route create
    create(req,res){
        res.render('course/create');
    }

    // post route create 
    store(req,res,next){
        const dataForm = req.body;
        dataForm.image = `https://img.youtube.com/vi/${dataForm.videoId}/sddefault.jpg`;
        const newCourse = new Course(dataForm);
        newCourse.save().then(() => res.redirect('/'))
            .catch(next);
    }

    // get route edit 
    edit(req,res,next){
        Course.findOne({slug: req.params.slug })
            .then(course => {
                course = mongooseToObject(course);
                res.render('course/edit',{course});
            })
            .catch(next);
   
    }
    // post route edit
    update(req,res,next){
        const formData = req.body;
        const data = {};
        if(formData.name.length !== 0 )
            data.name = formData.name;
        if(formData.description.length !== 0 )
            data.description = formData.description;
        if(formData.videoId.length !== 0 )
            data.videoId = formData.videoId;
        Course.findOneAndUpdate({slug : req.params.slug}, {$set: data},function(err){
            if (err){
                next();
            }else{
                res.redirect('/');
            }
        })
    }
}

module.exports = new CourseController();
