import {makeObservable, observable,action } from 'mobx'
export class ObservableLoginStore {
    @observable email?:string
    @observable password?:string
    constructor(){
        makeObservable(this)
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