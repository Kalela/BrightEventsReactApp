import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Redirect, NavLink, Switch } from 'react-router-dom'

import './index.css';
import registerServiceWorker from './registerServiceWorker';

//App Components
import CreateEvent from './Components/CreateEvent/CreateEvent';
import Dashboard from './Components/DashBoard/Dashboard';
import Events from './Components/ViewEvents/Events';
import Login from './Components/Login/Login'
import LandingPage from './Components/LandingPage/LandingPage';
import MyEvents from './Components/ViewEvents/MyEvents';
import MyGuests from './Components/MyGuests/MyGuests';
import MyRSVPs from './Components/MyRSVPs/myRsvps';
import Register from './Components/Register/Register'
import SearchPage from './Components/SearchPage/SearchPage';
import ViewSingleEvent from './Components/ViewEvents/ViewSingleEvent';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("Logged_in") ?
     <Component {...props} />
     : <Redirect to='/login' />
  )}/>
)

ReactDOM.render(
  <Router>
    <Switch>
      <ProtectedRoute exact path='/createevent' component={ CreateEvent }/>
      <ProtectedRoute exact path='/dashboard' component={ Dashboard }/>
      <ProtectedRoute exact path='/:username/events' component={ MyEvents }/>
      <ProtectedRoute exact path='/:username/guests' component={ MyGuests }/>
      <Route exact path='/' component={ LandingPage }/>
      <Route exact path='/register' component={ Register }/>
      <Route exact path='/login' component={ Login }/>
      <Route exact path='/events' component={ Events }/>
      <Route exact path='/search' component={ SearchPage }/>
      <Route exact path='/events/eventname' component={ ViewSingleEvent }/>
    </Switch>
  </Router>,
    document.getElementById('root'));
registerServiceWorker();
