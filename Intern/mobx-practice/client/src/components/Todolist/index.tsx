import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserStorage } from '../../utils';
import {useStore} from '../../store/store'
export const url = "http://localhost:3001"


const TodoList:React.FC<{}> = observer(()=>{
    const store = useStore().todoStore
    const history = useHistory();
    useEffect(() => {
        const existUser = getUserStorage()
        if (!existUser) {
            history.replace('/login')
        }
    }, [])

    useEffect(() => {
       fetchData();
   }, [])

    const onSearchChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        store.setTitle(value)
    }

    const onFilterStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        store.setStatus(value)
    }

    const fetchData = async () => {
        const response = await axios.get(`${url}/todo`, {
            params: {
                title: store.title,
                status: store.status
            }
        });

        const res = response.data;
        if (res.status) {
            store.setTodos(res.data)
        }
    }

    const handleSearch = async () => {
        fetchData();
    }

    const deleteTodo = async (id:number) => {
        const response = await axios.post(`${url}/todo/${id}`)
        const res = response.data;
        if (res.status) {
           store.deleteTodo(id)
          
        }
    }

    const updateToDoStatus = async (id:number, is_done:boolean) => {
        const updateUrl = `${url}/todo/update/${id}`;
        console.log("update url", updateUrl)
        const response = await axios.post(updateUrl, {
            is_done
        })

        if (response.data.status) {
            fetchData()
        }
    }

    const toDetail = async (id:number) => {
        history.push('/todo/detail', { id })
    }
    return (

        <div>
            <select onChange={(event) => onFilterStatusChange(event)}
                className="form-control form-control-lg">
                <option value='none'>None</option>
                <option value='done'>Done</option>
                <option value='not_done'>Not done</option>
            </select>

            <div className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search"
                    onChange={onSearchChange}
                    placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleSearch}>Search</button>
            </div>

            <ul className="todo-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.todos.map((todo: { is_done: any; title: {} | null | undefined; description: {} | null | undefined; id: number; }) => (<tr>
                            {todo.is_done ? <td style={{ color: "green" }}>{todo.title}</td> : <td style={{ color: "red" }}>{todo.title}</td>}
                            {todo.is_done ? <td style={{ color: "green" }}>{todo.description}</td> : <td style={{ color: "red" }}>{todo.description}</td>}
                            <td>
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => {
                                    deleteTodo(todo.id)
                                }} >Delete</button>

                                <button type="button" style={{ backgroundColor: todo.is_done ? "red" : "green", marginLeft: 10 }} className="btn btn-success btn-sm"
                                    onClick={() => {
                                        let status = todo.is_done ? false : true;
                                        updateToDoStatus(todo.id, status)
                                    }}

                                >{todo.is_done ? "Not done" : "Done"} </button>

                                <button type="button"

                                    onClick={() => {
                                        toDetail(todo.id)
                                    }}
                                    style={{ marginLeft: 10 }}>Update </button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </ul>
        </div>

    );
})

export default TodoList;