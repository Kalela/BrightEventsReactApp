import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import LandingPage from './Components/LandingPage/LandingPage';
import Events from './Components/ViewEvents/Events';
import CreateEvent from './Components/CreateEvent/CreateEvent';
import Dashboard from './Components/DashBoard/Dashboard';
import EditEvent from './Components/EditEvent/EditEvent';
import SearchPage from './Components/SearchPage/SearchPage';

export default (
    <Switch>
      <Route exact path="/" render={() => (
          localStorage.getItem("Logged_in") ? (
          <Redirect to="/dashboard"/>
        ) : (
          <LandingPage/>
        )
      )}/>
      <Route exact path='/register' component={ Register }/>
      <Route exact path='/login' component={ Login }/>
      <Route exact path='/events' component={ Events }/>
      <Route exact path='/dashboard' component={ Dashboard }/>
      <Route exact path='/createevent' component={ CreateEvent }/>
      <Route exact path='/editevent' component={ EditEvent }/>
      <Route exact path='/search' component={ SearchPage }/>
      <Route exact path='*' render={() => (<h1> 404 Not Found </h1>)}/>
    </Switch>
);
