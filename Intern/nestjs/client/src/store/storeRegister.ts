import { makeObservable,observable,action } from "mobx"
export class ObservableRegisterStore {
    @observable username?:string
    @observable email?:string
    @observable password?:string
    constructor(){
        makeObservable(this)
    }
    @action
    setUserName(username:string):void{
        this.username = username
    }
    @action
    setEmail(email:string):void{
        this.email = email
    }
    @action
    setPassword(password:string):void{
        this.password = password
    }
}