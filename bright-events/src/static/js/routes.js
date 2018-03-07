import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './Login'
import Register from './Register'
import AboutUs from './AboutUs';
import Events from './Events';


export default (
    <Switch>
      <Route exact path='/' component={ AboutUs }/>
      <Route exact path='/register' component={ Register }/>
      <Route exact path='/login' component={ Login }/>
      <Route exact path='/aboutus' component={ AboutUs }/>
      <Route exact path='/events' component={ Events }/>
    </Switch>
);