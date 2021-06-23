import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 

import axios from 'axios';
class UpdateStatus extends Component {
    constructor (props) {
        super(props);
        this.state = {
            redirect: "",
            isLogin: true
          }
      };
  
    componentDidMount() {
      axios.get('/todo/update_status/'+ this.props.match.params.id).then(result => {
        this.setState({ 
            redirect : result.data.redirect,
            isLogin : result.data.isLogin
         });
         console.log(this.state.redirect);
      })
     .catch(error => console.log(error));
    };
  
    render() {
      return(
        <div>
          {!this.state.isLogin ? (
          <Redirect to="/" />
        ) : (<Redirect to="/todo" />)}
        </div>
      )
    };
  };
  
export default UpdateStatus;