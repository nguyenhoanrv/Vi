import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 

import axios from 'axios';
class Delete extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLogin: true,
            redirect: false
          }
      };
  
    componentDidMount() {
      axios.get('/delete/'+ this.props.match.params.id).then(result => {
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
          {!this.state.isLogin ? (
          <Redirect to="/" />
        ) : (
            <div>
                {this.state.redirect ? (<Redirect to="/todo" />):("")}
            </div>
        )
        }
        </div>
      )
    };
  };
  
export default Delete;