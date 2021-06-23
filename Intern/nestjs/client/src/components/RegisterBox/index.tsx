import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/store';

import './RegisterBox.css'
import { useState } from 'react';

const RegisterBox: React.FC = observer(() => {
  const history = useHistory()
  const store = useStore().registerStore
  const [mess, setMess] = useState()
  function handleOnChangeEmail(event: React.ChangeEvent<HTMLInputElement>): void {
    const email = event.target.value
    store.setEmail(email)
  }
  function handleOnChangePw(event: React.ChangeEvent<HTMLInputElement>): void {
    const password = event.target.value
    store.setPassword(password)
  }
  function handleOnChangeUserName(event: React.ChangeEvent<HTMLInputElement>): void {
    const username = event.target.value
    store.setUserName(username)
  }
  async function submit(event: { preventDefault: () => void; }) {
    event.preventDefault()
    const response = await axios.post('http://localhost:3002/users/register', {
      email: store.email,
      password: store.password,
      username: store.username
    })
    if (response.data.success) {
      history.push('/')
    } else {
      setMess(response.data.mess)
    }
  }
  return (
    <div>
      <form action='' onSubmit={submit}>
        <input type='text' placeholder='Username' onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeUserName(event)} name='username' />
        <input type='text' placeholder='Email address' onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeEmail(event)} name='email' />
        <input type='password' placeholder='password' onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangePw(event)} name='password' />
        <input type='submit' value='Sign in' className='btn-primary' />
      </form>
      {mess ? <p className='alert alert-danger'> {mess} </p> : ''}
    </div>
  )
})

export default RegisterBox