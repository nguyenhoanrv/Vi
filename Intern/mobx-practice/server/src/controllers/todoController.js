const knex = require('../../config/connect').knex
let bookshelf = require('bookshelf')(knex)
const toDo = require('../models/toDo')

function responseApi(status, message, data = null) {
  const result = { status, message, data }
  return result
}

class ToDoController {
  //GET
  async index(req, res) {
    const { title, status } = req.query

    try {
      toDo
        .query((qb) => {
          if (title) {
            qb.where('title', 'iLIKE', title + '%')
          }

          if (status == 'done') {
            //console.log("status", status)

            qb.andWhere('is_done', '=', true)
          } else if (status == 'not_done') {
            qb.andWhere('is_done', '=', false)
          }
        })
        .fetchAll()
        .then((data) => {
          const result = responseApi(true, 'Success', data.toJSON())
          return res.json(result)
        })
    } catch (err) {
      const result = responseApi(false, err.message, null)
      return res.json(result)
    }
  }

  async delete(req, res) {
    try {
      const todo = await toDo.where({ id: req.params.id }).fetch()
      if (!todo) {
        throw new Error('Todo not found')
      }
      const data = await todo.destroy()
      const result = responseApi(true, 'Success', null)
      return res.json(result)
    } catch (err) {
      const result = responseApi(false, err.message, null)
      return res.json(result)
    }
  }

  async updatestatus(req, res) {
    try {
      const { id } = req.params
      const { is_done } = req.body

      if (is_done === undefined) {
        const result = responseApi(false, 'is_done is required', null)
        return res.json(result)
      }

      const todo = await toDo
        .forge()
        .where({ id: req.params.id })
        .fetch({ require: false })
      if (todo) {
        await toDo.where({ id }).save({ is_done }, { method: 'update' })
        const result = responseApi(true, 'Sucdess', null)
        return res.json(result)
      } else {
        const result = responseApi(false, 'Todo is not existed', null)
        return res.json(result)
      }
    } catch (err) {
      const result = responseApi(false, err.message, null)
      return res.json(result)
    }
  }

  async edit(req, res) {
    const todos = await toDo.where({ id: req.params.id }).fetch()

    const result = responseApi(true, 'success', todos.toJSON())
    return res.json(result)
  }

  async edittodo(req, res) {
    const { is_done, title, description } = req.body
    const { id } = req.params

    console.log('req', req.body)
    console.log('req', req.params)

    try {
      let data = {
        title,
        description,
        is_done,
      }

      const saved = await toDo.where({ id }).save(data, { patch: true })
      const result = responseApi(true, 'Success', null)
      res.json(result)
    } catch (error) {
      const result = responseApi(false, error.message, null)
      res.json(result)
    }
  }

  // async searchTitle(req, res) {
  //   try {
  //     const todos = await toDo
  //       .where('title', 'iLIKE', '%' + req.body.searchByTitle + '%')
  //       .fetchAll()
  //     const { searchByTitle, status } = req.body
  //     let result = []
  //     if (['true', 'false'].includes(searchByTitle)) {
  //       result = await toDo
  //         .where('is_done', '=', req.body.searchByTitle)
  //         .fetchAll()
  //     } else {
  //       result = await toDo
  //         .where('title', 'iLIKE', '%' + req.body.searchByTitle + '%')
  //         .fetchAll()
  //     }

  //     console.log('result', result)

  //     res.render('todo', { todos: result.toJSON() })
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
}

module.exports = new ToDoController()
