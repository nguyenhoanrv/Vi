const User = require('../models/User')
const session = require('express-session')
class loginController{
    async index(req,res){
        try {
            var email = req.body.email;
            var password = req.body.password;
            var data = await new User().where({ email: email, password: password }).fetch();
            req.session.User = {
                email: data.toJSON().email,
                id: data.toJSON().id,
            }
            res.json({
                isLogin: true,
                error: ""
            })
        } catch (error) {
            res.json({
                isLogin: false,
                error: "Tai khoan khong ton tai hoac mat khau sai !"
            })
    
        }
    }
    async logout(req,res){
        try {
            req.session.destroy();
            res.json({
                isLogin: false
            })
        } catch (error) {
            res.json({
                isLogin: false
            })
        }
    }
}
module.exports = new loginController()