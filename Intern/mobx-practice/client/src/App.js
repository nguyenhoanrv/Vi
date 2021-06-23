import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Todolist from './components/Todolist'
import TodoDetail from './components/Todolist/TodoDetail.tsx'

function App() {
  return (
    <Router>
      <div className='App'>
        <Route path='/login' exact={true} component={Login}></Route>
        <Route path='/todo' exact={true} component={Todolist}></Route>
        <Route path='/todo/detail' exact={true} component={TodoDetail}></Route>
      </div>
    </Router>
  )
}

export default App
