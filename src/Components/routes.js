import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login/Login'
import Register from './Register/Register'
import AboutUs from './AboutUs/AboutUs';
import Events from './ViewEvents/Events';
import Dashboard from './DashBoard/Dashboard';
//import EditEvent from './EditEvent/EditEvent';


export default (
    <Switch>
      <Route exact path='/' component={ AboutUs }/>
      <Route exact path='/register' component={ Register }/>
      <Route exact path='/login' component={ Login }/>
      <Route exact path='/aboutus' component={ AboutUs }/>
      <Route exact path='/events' component={ Events }/>
      <Route exact path='/dashboard' component={ Dashboard }/>
      <Route exact path='*' render={() => (<h1> 404 Not Found </h1>)}/>
    </Switch>
);

//      <Route exact path='/eventseditor' component={ EditEvent }/>