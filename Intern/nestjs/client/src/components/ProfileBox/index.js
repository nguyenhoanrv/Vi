import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const ProfileBox = (props) => {
  const history = useHistory()
  const [user, setUser] = useState({
    username: '',
    email: '',
  })
  useEffect(() => {

    const fetchData = async () => {
      const response = await axios.post('http://localhost:3002/users/', {
        token: JSON.parse(localStorage.getItem('token')),
      })
      const res = response.data

      if (!res.email) history.push('/')
      setUser({
        username : res.username,
        email : res.email
      })
    }
    if(localStorage.getItem('token'))
      fetchData()
    else{
      history.push('/')
    }
  }, [user.email])
  function handleOnclick() {
    localStorage.removeItem('token')
    setUser({
      
    })
  }
  async function handleOnclickVerifyTk(){
    const tokenStr =  JSON.parse(localStorage.getItem('token'))
    const res = await axios.get('http://localhost:3002/users/verifyToken',{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
    console.log(res.data)
    return (res.data)
  }
  return (
    <div className='m-2'>
      <p>Username : {user.username}</p>
      <p>Email : {user.email}</p>
      <button onClick={handleOnclick} className='btn btn-primary'>
        Logout
      </button>
      {/* test */}
      <button onClick={handleOnclickVerifyTk}>Verify Token</button> 
    </div>
  )
}

export default ProfileBox
