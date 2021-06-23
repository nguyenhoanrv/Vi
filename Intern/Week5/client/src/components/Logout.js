import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 

import axios from 'axios';
class Logout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLogin: true,
            redirect: false
          }
      };
  
    componentDidMount() {
      axios.get('/logout').then(result => {
        this.setState({ 
            isLogin : result.data.isLogin,
            redirect :true
         });
        
      })
     .catch(error => console.log(error));
    };
    render() {
      return(
        <div>
            {this.state.redirect ? (<Redirect to="/" />):""}
        </div>
      )
    };
  };
  
export default Logout;