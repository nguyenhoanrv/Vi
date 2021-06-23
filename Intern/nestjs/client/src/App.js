import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginBox from './components/LoginBox/LoginBox'
import RegisterBox from './components/RegisterBox'
import ProfileBox from './components/ProfileBox'
function App() {
  return (
    <div className='App'>
      <div className='App-main'>
        <div className='App-box'>
          <img
            src='https://scontent.fhan5-4.fna.fbcdn.net/v/t1.6435-9/160923761_111464247682999_1328555697644411001_n.png?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DJbq_8k-kN8AX-iqidG&_nc_ht=scontent.fhan5-4.fna&oh=cce9eafaffde4dffad7d70bfd677becd&oe=60D4DA33'
            alt=''
            className='App-logo'
          />
          <h2>Pionero</h2>
          <p>Login to continue</p>
          <BrowserRouter>
            <Switch>
              <Route path='/' component={LoginBox} exact />
              <Route path='/register' component={RegisterBox} />
              <Route path='/profile' component={ProfileBox} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
