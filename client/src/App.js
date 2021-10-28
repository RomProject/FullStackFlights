import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Title from './components/Title'
import AddVac from './components/AddVac'
import {Redirect} from 'react-router-dom'

import{BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import Charts from './components/Charts'

export default function App() {
  return (
    <Router>
    <div>
      <Title/>
      <Switch>
    
    <Route exact  path ="/register" component={Register} />
    <Route  path ="/login" component ={Login} />
    <Route path = "/home" component ={Home}/>
    <Route path = "/add" component={AddVac}/>
    <Route path ="/charts" component={Charts}/>
    <Redirect path = "/" to = "/login"/>
   


      </Switch>
    </div>
    </Router>
  )
}
