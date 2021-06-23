import React, { useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/store';


import './LoginBox.css'

const LoginBox: React.FC = observer(() => {
  const history = useHistory()
  const store = useStore().loginStore
  const [mess, setMess] = useState()
  function handleOnChangeEmail(event: { target: { value: any; }; }) {
    const email = event.target.value
    store.setEmail(email)
  }
  function handleOnChangePw(event: { target: { value: any; }; }) {
    const password = event.target.value
    store.setPassword(password)
  }
  async function submit(event: { preventDefault: () => void; }) {
    event.preventDefault()
    const response = await axios.post('http://localhost:3002/users/login', {
      email: store.email,
      password: store.password
    })
    if (response.data.success) {
      localStorage.setItem('token', JSON.stringify(response.data.accessToken))
      history.push('/profile')

    } else {
      setMess(response.data.mess)
    }
  }
  return (
    <div>
      <form action='' onSubmit={submit} >
        <input type='text' placeholder='Email address' onChange={handleOnChangeEmail} />
        <input type='password' placeholder='password' onChange={handleOnChangePw} />
        <Link to='/register'>register</Link>
        <input type='submit' value='Continue' className='btn-primary' />
      </form>
      {mess ? <p className='alert alert-danger'> {mess} </p> : ''}
    </div>
  )
})

export default LoginBox