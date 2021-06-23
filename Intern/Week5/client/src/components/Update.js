import React, { Component } from 'react';
import Inc from './Inc';
import { Redirect,Link } from 'react-router-dom';

import axios from 'axios';
class Update extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            isLogin: true,
            desc: "",
            title: ""
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
    
      const update = {
          title: this.state.title,
          desc: this.state.desc,
      };
      axios.post('/todo/'+this.props.match.params.id, update)
      .then()
      .catch(error => console.log(error));
  };
    componentDidMount() {
        console.log("this.props.match.params.id", this.props.match.params.id);
        axios.get('/todo/'+ this.props.match.params.id).then(result => {
          this.setState({ 
              isLogin : result.data.isLogin,
              data : result.data.data,
              title : result.data.data.title,
              desc : result.data.data.description,
           });
           console.log(this.state.isLogin);
        })
       .catch(error => console.log(error));
      };
  
    render() {
      return(

        <div className="container">
            {!this.state.isLogin ? (<Redirect to="/" />) : 
            (
                <div className="mt-5">
            <Inc />
            <h1>
              <span className="mr-3">Update</span>
            </h1>
            <div className="d-flex align-items-center">
            </div>
            {this.state.data ? (
              <form  onSubmit={this.handleInsertSubmit}>
                <table className="table table-striped" id="todo-list">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>desc</th>
                    <th>is_done</th>
                    <th>delete</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                         {this.state.data.id}
                      </td>
                      <td>
                        <input type="text" name="title" placeholder={this.state.data.title}  onChange={this.handleInputChange} />
                      </td>
                      <td>
                        <input type="text" name="desc" placeholder={this.state.data.description} onChange={this.handleInputChange}/>
                      </td>
                      <td>
                        {this.state.data.is_done ? "true" : "false"}
                      </td>
                      <td>
                        <Link to="/todo" className="btn btn-danger">
                          {" "}
                          Delete{" "}
                        </Link>
                      </td>
                    </tr>
                </tbody>
              </table>
              <input type="submit" value="Update" />
              </form>
            ) : (
              "Danh sach trong !"
            )}
          </div>
            )}
            
        </div>
      )
    };
  };
  
export default Update;