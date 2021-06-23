// import React, { Component } from "react";
// class Todo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       session: "",
//       s: "",
//       isLogin: true,
//     };
//   }
//   handleInputChange = (event) => {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value,
//     });
//   };
//   handleInsertSubmit = (event) => {
//     event.preventDefault();
//     const search = {
//       s: this.state.s,
//     };
//     axios
//       .post("/todo/search", search)
//       .then((result) => {
//           console.log(result.data)
//         this.setState({
//           data: result.data.data,
//           session: result.data.session,
//           s: result.data.s,
//         });
//       })
//       .catch((error) => console.log(error));
//   };
//   componentDidMount() {
//     axios
//       .get("/todo")
//       .then((result) => {
//         this.setState({
//           data: result.data.data,
//           session: result.data.session,
//           isLogin: result.data.isLogin,
//         });
//       })
//       .catch((error) => console.log(error));
//   }

//   render() {
//     return (
//       <div className="container">
//         {!this.state.isLogin ? (
//           <Redirect to="/" />
//         ) : (
//           <div className="mt-5">
//             <Inc />
//             <h1>
//               <span className="mr-3">Week5</span>
//             </h1>
//             <div className="d-flex align-items-center">
//               <form onSubmit={this.handleInsertSubmit} className="ml-auto">
//                 <input
//                   type="text"
//                   name="s"
//                   placeholder="Search by title or status"
//                   className="form-control"
//                   onChange={this.handleInputChange}
//                 />
//                 <input type="submit" value="Search" />
//               </form>
//             </div>
//             {this.state.data ? (
//               <table className="table table-striped" id="todo-list">
//                 <thead>
//                   <tr>
//                     <th>id</th>
//                     <th>title</th>
//                     <th>desc</th>
//                     <th>is_done</th>
//                     <th>view</th>
//                     <th>delete</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {this.state.data.map((item) => (
//                     <tr key={item.id}>
//                       <td>
//                         <Link to={`/update/${item.id}`}> {item.id} </Link>
//                       </td>
//                       <td>{item.title}</td>
//                       <td>{item.description}</td>
//                       <td>
//                         {item.is_done ? "true " : "false "}
//                         <Link to={`/todo/update_status/${item.id}`}>
//                           Change status
//                         </Link>
//                       </td>
//                       <td>
//                         <Link to={`/update/${item.id}`} className="btn btn-light">
//                           View
//                         </Link>
//                       </td>
//                       <td>
//                         <Link to={`/delete/${item.id}`} className="btn btn-danger">
//                           Delete
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               "Danh sach trong !"
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default Todo;

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Inc from './Inc'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
const history = require('history')

Todo.propTypes = {}

function Todo(props) {
  const { state, setState } = useState({
    data: [],
    session: '',
    s: '',
    isLogin: true,
  })
  useEffect(() => {
    fetchData()
    if (!state.isLogin || state.status) history.replace('/login')
  }, [])
  useEffect(() => {
    fetchData()
  }, [state.data])
  const fetchData = async () => {
    const result = await axios.get('/todo')
    if (result.data.status) {
      setState({
        data: result.data.data,
        session: result.data.session,
        isLogin: result.data.isLogin,
      })
    }
  }
  async function handleInsertSubmit(event) {
    event.preventDefault()
    const search = {
      s: state.s,
    }
    const result = await axios.post('/todo/search', search)
    setState({
      data: result.data.data,
      session: result.data.session,
      s: result.data.s,
    })
  }
  function handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      ...state,
      [name]: value,
    })
  }
  async function handleOnChangeStatus(id) {
    const url = `/todo/update_status/${id}`
    const result = await axios.get(url)
    if (result.data.status) fetchData()
  }
  async function handleOnDeleteItem(id) {
    const url = `/todo/delete/${id}`
    const result = await axios.get(url)
    if (result.data.status) fetchData()
  }

  return (
    <div className='container'>
      <div className='mt-5'>
        <Inc />
        <h1>
          <span className='mr-3'>Week5</span>
        </h1>
        <div className='d-flex align-items-center'>
          <form onSubmit={handleInsertSubmit} className='ml-auto'>
            <input
              type='text'
              name='s'
              placeholder='Search by title or status'
              className='form-control'
              onChange={handleInputChange}
            />
            <input type='submit' value='Search' />
          </form>
        </div>
        {state.data ? (
          <table className='table table-striped' id='todo-list'>
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
                <th>desc</th>
                <th>is_done</th>
                <th>view</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/update/${item.id}`}> {item.id} </Link>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className='btn btn-primary'
                      onClick={() => handleOnChangeStatus(item.id)}
                    >
                      {item.is_done ? 'true' : 'false'}
                    </button>
                  </td>
                  <td>
                    <Link to={`/update/${item.id}`} className='btn btn-light'>
                      View
                    </Link>
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleOnDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          'Danh sach trong !'
        )}
      </div>
    </div>
  )
}

export default Todo
