import { action, makeObservable, observable } from 'mobx'

export class ObservableTodoDetailStore{
    @observable todo:any
    @observable title?:string 
    @observable description?:string
    @observable status?:boolean

    constructor(){
        makeObservable(this)
    }
    @action 
    setTodoDetail(todo:any){
        this.todo = todo
    }

}