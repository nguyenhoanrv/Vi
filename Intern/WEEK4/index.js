// import thư viện express
const knex = require('./db');
const bookshelf = require("bookshelf")(knex);
const express = require('express');
const session = require('express-session');
const app = express();
var PORT = process.env.PORT || 3000;
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }
}));
const User = bookshelf.model('User', {
    tableName: 'users'
})
var todo = bookshelf.Model.extend({
    tableName: "todo"
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'))

app.get('/todo', async(req, res) => {
    if (req.session.User) {
        var data = await new todo().fetchAll();
        return res.render('todo/index', {
            data: data.toJSON(),
            session: req.session.User
        })
    } else {
        res.redirect('/login');
    }

});
app.get('/todo/search', async(req, res) => {
    if (req.session.User) {
        var s = htmlEntities(req.query.s);
        var data = await new todo().fetchAll();
        var f = "false";
        var t = "true";
        var result;
        var data = await new todo().fetchAll();
        if (f.indexOf(s.toLocaleLowerCase()) !== -1) {
            var a = await data.where('is_done', 'false').fetch();
            result = a.toJSON();
        } else if (t.indexOf(s.toLocaleLowerCase()) !== -1) {
            var a = await data.where('is_done', 'true').fetch();
            result = a.toJSON();
        } else {
            result = data.toJSON().filter(function(data) {
                return data.title.toLowerCase().indexOf(s.toLocaleLowerCase()) !== -1;
            });
        }
        return res.render('todo/index', {
            data: result,
            s: s,
            session: req.session.User
        });
    } else {
        res.redirect('/login');
    }
})



app.get('/', function(req, res) {
    try {
        if (req.session.User) {
            var email = req.session.User.email;
            return res.render('index', {
                email: email,
                session: req.session.User
            })
        }
        res.render('index');
    } catch (error) {
        console.log("error", error.message);
    }
});

app.get('/todo/:id', async(req, res) => {
    if (req.session.User) {
        try {
            var id = req.params.id;
            var data = await todo.where('id', id).fetch();
            return res.render('todo/update', {
                data: data.toJSON(),
                session: req.session.User
            })
        } catch {
            res.redirect('/todo');
        }
    } else {
        res.redirect('/login');
    }
})
app.post('/todo/:id', async(req, res) => {
    await todo.forge({ id: req.params.id }).save({
        title: htmlEntities(req.body.title),
        description: htmlEntities(req.body.desc)
    });
    res.redirect('/todo');
})
app.get('/delete/:id', async(req, res) => {
    if (req.session.User) {
        try {
            var data = await todo.where("id", req.params.id).destroy();
            res.redirect('/todo');
        } catch {
            res.redirect('/todo');
        }
    } else {
        res.redirect('/login');
    }
})
app.get('/todo/update_status/:id', async(req, res) => {
    if (req.session.User) {
        try {
            var id = req.params.id;
            var arr = [false, true];
            var data = await todo.where('id', id).fetch();
            var status = data.toJSON().is_done;

            if (arr.indexOf(status) == 0) {
                await todo.forge({ id: req.params.id }).save({
                    is_done: true
                });
            } else {
                await todo.forge({ id: req.params.id }).save({
                    is_done: false
                });
            }
            res.redirect('/todo');
        } catch {
            res.redirect('/todo');
        }
    } else {
        res.redirect('/login');
    }
})
app.get('/login', async(req, res) => {
    res.render('auth/login');
})
app.post('/login', async(req, res) => {
    try {
        var email = req.body.email;
        var password = req.body.password;
        var data = await new User().where({ email: email, password: password }).fetch();
        req.session.User = {
            email: data.toJSON().email,
            id: data.toJSON().id,
        }
        res.redirect('/');
    } catch (error) {
        res.render('auth/login', {
            error: 'Không tồn tài tài khoản hoặc mật khẩu sai !'
        })
    }
})
app.get('/logout', async(req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        res.redirect('/');
    }
})
app.listen(PORT, function() {
    console.log('Express listening on port' + PORT + ' !');
});


function htmlEntities(str) {
    return String(str).replace(/&amp;amp;/g, '&amp;amp;amp;').replace(/&amp;lt;/g, '&amp;amp;lt;').replace(/&amp;gt;/g, '&amp;amp;gt;').replace(/"/g, '&amp;amp;quot;');
}