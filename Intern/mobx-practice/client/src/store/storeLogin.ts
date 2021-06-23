import { makeObservable, observable, action } from 'mobx'
export class ObservableLoginStore {
  @observable username?:string
  @observable password?:string
  constructor() {
    makeObservable(this)
  }

  @action 
  setUsername(username:string):void {
    this.username = username
  }

  @action
  setPassword(password:string):void {
    this.password = password
  }
}
