const todo = require('../models/Todo')
const session = require('express-session')
class todoController {
  async index(req, res) {
    if (req.session.User) {
      try {
        var data = await new todo().fetchAll()
        return res.json({
          data: data.toJSON(),
          session: req.session.User,
          isLogin: true,
          status: true,
        })
      } catch (error) {
        return res.json({
          status: false,
        })
      }
    } else {
      return res.json({
        data: [],
        session: '',
        isLogin: false,
        status: false,
      })
    }
  }
  async detail(req, res) {
    if (req.session.User) {
      try {
        var id = req.params.id
        var data = await todo.where('id', id).fetch()
        res.json({
          data: data.toJSON(),
          session: req.session.User,
          isLogin: true,
        })
      } catch {
        res.json({
          data: [],
        })
      }
    } else {
      return res.json({
        isLogin: false,
      })
    }
  }
  // router post todo/:id
  async update(req, res) {
    await todo.forge({ id: req.params.id }).save({
      title: req.body.title,
      description: req.body.desc,
    })
  }
  // router post todo/search
  async search(req, res) {
    if (req.session.User) {
      var s = req.body.s
      var data = await new todo().fetchAll()
      var f = 'false'
      var t = 'true'
      var result
      var data = await new todo().fetchAll()
      if (f.indexOf(s.toLocaleLowerCase()) !== -1) {
        var a = await data.where('is_done', 'false').fetch()
        result = a.toJSON()
      } else if (t.indexOf(s.toLocaleLowerCase()) !== -1) {
        var a = await data.where('is_done', 'true').fetch()
        result = a.toJSON()
      } else {
        result = data.toJSON().filter(function (data) {
          return data.title.toLowerCase().indexOf(s.toLocaleLowerCase()) !== -1
        })
      }
      res.json({
        data: result,
        s: s,
        session: req.session.User,
      })
    } else {
      res.json({
        session,
      })
    }
  }

  // router get todo/delete/:id
  async delete(req, res) {
    if (req.session.User) {
      try {
        var data = await todo.where('id', req.params.id).destroy()
        return res.json({
          status: true,
        })
      } catch {
        return res.json({
          status: false,
        })
      }
    } else {
      return res.json({
        status: false,
      })
    }
  }
  // update status
  async update_status(req, res) {
    if (req.session.User) {
      try {
        var id = req.params.id
        var arr = [false, true]
        var data = await todo.where('id', id).fetch()
        var status = data.toJSON().is_done

        if (arr.indexOf(status) == 0) {
          await todo.forge({ id: req.params.id }).save({
            is_done: true,
          })
        } else {
          await todo.forge({ id: req.params.id }).save({
            is_done: false,
          })
        }
        const result = {
          status: true,
        }
        return res.json(result)
      } catch {
        const result = {
          status: false,
        }
        return res.json(result)
      }
    } else {
      const result = {
        status: false,
      }
      return res.json(result)
    }
  }
}
module.exports = new todoController()
