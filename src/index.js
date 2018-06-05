import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

//  App Components
import AboutUs from './Components/About/About';
import CreateEvent from './Components/CreateEvent/CreateEvent';
import Dashboard from './Components/DashBoard/Dashboard';
import Events from './Components/ViewEvents/Events';
import Login from './Components/Login/Login';
import LandingPage from './Components/LandingPage/LandingPage';
import MyEvents from './Components/ViewEvents/MyEvents';
import MyGuests from './Components/MyGuests/MyGuests';
import MyRSVPs from './Components/Myrsvps/Myrsvps';
import Register from './Components/Register/Register';
import SearchPage from './Components/SearchPage/SearchPage';
import ViewSingleEvent from './Components/ViewEvents/ViewSingleEvent';
import ResetPassword from './Components/ResetPassword/ResetPassword';

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
      <ProtectedRoute exact path="/:username/createevent" component={CreateEvent} />
      <ProtectedRoute exact path="/:username/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/:username/events" component={MyEvents} />
      <ProtectedRoute exact path="/:username/guests" component={MyGuests} />
      <ProtectedRoute exact path="/:username/rsvps" component={MyRSVPs} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/aboutus" component={AboutUs} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/reset_password" component={ResetPassword} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/:username/:eventname" component={ViewSingleEvent} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
