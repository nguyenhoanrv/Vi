import React, { Component } from 'react';
import Inc from './Inc';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite' ; 

import axios from 'axios';
class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            isLogin:false,
            error: ""
        }
    };
  
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    };
    handleInsertSubmit = (event) => {
        event.preventDefault();
      
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        axios.post('/login', user)
        .then(result => {
            this.setState({
                isLogin: result.data.isLogin,
                error: result.data.error
            })
        })
        .catch(error => console.log(error));
    };
  
    render() {
      return(

        <div className="container">
            <Inc/>
            <div className="mt-5">
                <h2>Login</h2>
                {this.state.error !== "" ?(<div className="alert alert-danger"> Sai mat khau hoac khong ton tai tai khoan ! </div>):("")} 
                {this.state.isLogin ? (<Redirect to="/" />):("")}
                <div className="row">
                    <div className="col-5 text-center" style={{margin: '0px auto'}}>
                        <form onSubmit={this.handleInsertSubmit} className="p-5 border">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" className="form-control" name="email" onChange={this.handleInputChange}/>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" className="form-control"  onChange={this.handleInputChange} name="password"/>
                            <input type="submit" className="mt-4 btn btn-success" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
      )
    };
  };
  
export default Login;