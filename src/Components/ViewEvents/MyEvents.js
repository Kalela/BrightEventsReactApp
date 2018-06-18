import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import EventCard from '../EventCard/EventCard';


/**
Functional component to render all logged in users events from the database.
*/
class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: '',
      JWTtoken: '',
      page: 1,
    };
  }

  componentWillMount() {
    localStorage.getItem('BrightEventsJWTtoken') && this.setState({
      JWTtoken: localStorage.getItem('BrightEventsJWTtoken'),
    });
    localStorage.getItem('Logged_in') && this.setState({
      current_user: localStorage.getItem('Logged_in'),
    });
  }

  render() {
    return (
      <div className="container">
        <Navbar current_user={this.state.current_user} JWTtoken={this.state.JWTtoken} />
        <h3 id="eventsTitle"> My Events </h3>
        <div>
          <EventCard type="myevents" />
          <ToastContainer />
          <Link to={`/${this.state.current_user}/createevent`} id="dashboardCreateEvent" className="btn btn-info navbar-btn">
            <i className="glyphicon glyphicon-align-left"></i>
            <span>Create an Event</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default MyEvents;
