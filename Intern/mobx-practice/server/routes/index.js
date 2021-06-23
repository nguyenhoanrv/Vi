const loginRouter = require('./login');
const todoRouter = require('./todo');
function route(app) {
    app.use('/login', loginRouter);
    app.use('/todo',todoRouter);
}


module.exports = route;
