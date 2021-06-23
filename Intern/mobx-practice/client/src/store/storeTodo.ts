import { observable, makeObservable, action } from 'mobx'

export class ObservableTodoStore {
  @observable todos:Array<any> = []
  @observable title?:string 
  @observable status?:string 

  constructor() {
    makeObservable(this)
  }
  
  @action
  setTodos(todos:Array<any>):void {
    this.todos = todos
  }
  
  @action
  setStatus(status:string):void {
    this.status = status
  }

  @action
  setTitle(title:string):void {
    this.title = title
  }
  
  @action
  deleteTodo(id:number) {
    const index = this.todos.findIndex((t) => t.id == id)
    const todos = this.todos.splice(index, 1)
  }
}
