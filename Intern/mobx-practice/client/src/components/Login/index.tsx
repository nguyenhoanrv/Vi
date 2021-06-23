import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../store/store'
import { getUserStorage, setUserToStorage } from '../../utils';
import { url } from '../Todolist';
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
// const LoginPage = ()   =>{
//     const LoginStore = new ObservableLoginStore();
//     return <Login store = {LoginStore}></Login>
// }
const Login:React.FC = observer(()=>{

    const store = useStore().loginStore 
    
    const history = useHistory();
    
    useEffect(() => {
        const loged = getUserStorage();
        if (loged) { 
            history.push('/todo')
        }
    }, [])

    function onChangeEmail(event:React.ChangeEvent<HTMLInputElement>):void {
        const value = event.target.value;
        store.setUsername(value);
    }

    function onChangePassword(event:React.ChangeEvent<HTMLInputElement>):void {
        const value = event.target.value;
        store.setPassword(value);
    }

    async function login(){
        const response = await axios.post(`${url}/login`, {
            username : store.username,
            password : store.password
        });

        const res = response.data;
        if (res.status) {
            setUserTevent:React.ChangeEvent<HTMLInputElement>oStorage(res.data.username)
            history.push("/todo");
        }
    }

    return (
        <div>
            <Container className='mt-5'>
                <Form encType="application/x-www-form-urlencoded">

                    <FormGroup controlId="formBasicEmail">
                        <FormLabel >Email address</FormLabel>
                        <FormControl className="form-control" type="text" name="username" placeholder="Enter email" onChange={(event:React.ChangeEvent<HTMLInputElement>) => onChangeEmail(event)} />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel htmlFor="exampleInputPassword1">Password</FormLabel>
                        <FormControl className="form-control" id="exampleInputPassword1" type="password" name="password" placeholder="Password" onChange={(event:React.ChangeEvent<HTMLInputElement>) => onChangePassword(event)} />
                    </FormGroup>
                    <Button onClick={login} className="btn btn-primary" type="submit">Login</Button>
                </Form>
            </Container>
        </div>
    );
})

export default Login;