const todoRouter = require('./todo')
const loginRouter = require('./login')
const logoutRouter = require('./logout')
function route(app){
    app.use('/todo',todoRouter)
    app.use('/login',loginRouter)
    app.use('/logout',logoutRouter)
    app.use('/')
}
module.exports = route