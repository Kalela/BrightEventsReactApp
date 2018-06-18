import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../Navbar/Navbar';
import EventCard from '../EventCard/EventCard';


/**
Functional component to render all public events in the database.
*/
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JWTtoken: '',
      current_user: '',
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
        <h3 id="eventsTitle"> All Events </h3>
        <EventCard type="allevents" />
        <ToastContainer />
      </div>
    );
  }
}

export default Events;
