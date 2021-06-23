const session = require('express-session')
class siteController{
    async index(req,res){
        try {
            if (req.session.User) {
                var email = req.session.User.email;
                res.json({
                    email: email,
                    session: req.session.User,
                    isLogin:true
                })
            }
        } catch (error) {
            res.json({
                isLogin:false,
                session: ""
            })
            console.log("error", error.message);
        }
    }
}
module.exports = new siteController()