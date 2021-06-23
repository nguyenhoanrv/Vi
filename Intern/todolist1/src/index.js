import * as React from "react"
import { render } from "react-dom"
import { observer } from "mobx-react-lite"
import { observable, action } from "mobx"
import { makeObservable, computed } from "mobx"
import Navbar from './components/Navbar'
import Switch from "react-switch";
import { Table } from 'reactstrap';
import { Button} from 'reactstrap';

class Todo {
    id = Math.random()
    title = ""
    description=""
    is_done = false

    constructor(title,description) {
        makeObservable(this, {
            title: observable,
            is_done: observable,
            toggle: action,
        })
        this.title = title;
        this.description = description
    }

    toggle() {
        this.is_done = !this.is_done
    }
}

class TodoList {
    todos = []
    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.is_done).length
    }
    constructor(todos) {
        makeObservable(this, {
            todos: observable,
            unfinishedTodoCount: computed,
            addTodo: action,
            deleteTodo: action,
            updateTodo: action
        })
        this.todos = todos
    }
    addTodo(title,description){
      this.todos.push(new Todo(title,description))
    }
    deleteTodo = (todo) => {
      this.todos = this.todos.filter(t=>t!==todo);
    }
    updateTodo = (todoId,update) => {
      const todoIndex = this.todos.findIndex((todo)=>todo.id===todoId);
      if(todoIndex > -1 && update) {
        this.todos[todoIndex] = update;
      }
    }

}

const TodoListView = observer(({ todoList }) => {
  const handleDelete = (todo) => {
    todoList.deleteTodo(todo)
  }
  const handleUpdate = (todo) => {
    todo.title = prompt("New todo title",todo.title);
    todo.description = prompt("New todo title",todo.description);
    todoList.updateTodo(todo.id,todo);
  }
  return(
    <div>
        <Navbar/>
        <Table>
          <thead>
            <tr>
              <th>title</th>
              <th>desc</th>
              <th>is_done</th>
              <th>delete</th>
              <th>view</th>
            </tr>
          </thead>
          <tbody>
            {todoList.todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <label>
                    <Switch type="checkbox" checked={todo.is_done} onChange={() => todo.toggle()} />
                  </label>
                </td>
                <td>
                  <Button color="danger" onClick={()=>handleDelete(todo)} >Delete</Button>
                </td>
                <td><Button color="info" onClick={()=>handleUpdate(todo)}>Edit</Button></td>
              </tr>
            ))}

          </tbody>
        </Table>
        Tasks left: {todoList.unfinishedTodoCount}
    </div>
)})
const store = new TodoList([new Todo("Get Coffee","desc1"), new Todo("Write simpler code","desc2") ,new Todo("abc","desc3")])
render(<TodoListView todoList={store} />, document.getElementById("root"))