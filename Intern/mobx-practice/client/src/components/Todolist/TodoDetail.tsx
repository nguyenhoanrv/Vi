import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { observer, Observer } from "mobx-react-lite";
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../store/store';
import { url } from './index';


//function TodoDetail(props: { location: { state: { id: any; }; }; }) {
const TodoDetail:React.FC<{}> = observer((props:any)=> {
    const todoDetail = useStore().todoDetailStore
    const todoId = props.location.state ? props.location.state.id : null;
    const history = useHistory();
    // const todoDetail= useLocalObservable(()=> ({
    //     todo: { 
    //         title:'', 
    //         description:  '', 
    //         is_done: true
    //     },
    //     setTodoDetail(todo:any){
    //         this.todo = todo;
    //     }
    // }))

    useEffect(() => {
        if (todoId) {
            fetchData(todoId)
        }
    }, [todoId])

    const fetchData = async (id:any) => {
        const response = await axios.get(`${url}/todo/${todoId}`)
        const res = response.data;
        if (res.status) {
            todoDetail.setTodoDetail(res.data)
        }
    }

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let _todo = { ...todoDetail.todo };
        _todo.title = value;
        todoDetail.setTodoDetail(_todo)
        
    }

    const onDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
       let _todo = { ...todoDetail.todo };
        _todo.description = value;
        todoDetail.setTodoDetail(_todo)
    }

    const onCheckBoxChange = () => {
        let _todo = { ...todoDetail.todo };
        _todo.is_done = !todoDetail.todo.is_done;
        todoDetail.setTodoDetail(_todo)
    }

    const onUpdate = async () => {
        const response = await axios.post(`${url}/todo/edit/${todoId}`, todoDetail.todo)
        const res = response.data;
        if (res.status) {
            history.goBack()
        } else {
            fetchData(todoId)
        }
    }

    return <Observer>
        {()=> { 
            return <div className="todolists mt-4">
        {todoDetail.todo ? <div

            className="input-data" >
            <div className="form-group">
                <label>Title</label>
                <input className="form-control" type="text" name="title" 
                    onChange={(event) => {
                        onTitleChange(event)
                    }}
                     value={todoDetail.todo.title} />
            </div>

            <div className="form-group">
                <label>Description</label>
                <input className="form-control"
                    onChange={(event) => {
                        onDescription(event)
                    }}
                    type="text" name="description" value={todoDetail.todo.description} />
            </div>

            <div className="form-group">
                <div className="form-check">
                    <input className="form-chck-input"

                        onChange={() => {
                            onCheckBoxChange()
                        }}

                        id="defaultCheck1" type="checkbox" name="is_done" checked={todoDetail.todo.is_done} />
                    <label className="form-check-label" htmlFor="defaultCheck1">Done</label>
                </div>
            </div>

            <button className="btn btn-primary"
                onClick={onUpdate}
            > Update    </button>
            <div />
        </div> : <div>
            Empty
        </div>
        }
    </div >
        }}
    </Observer>
})

export default TodoDetail
