//Dependencies
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar.js'

/**
The dashboard component
*/
class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
        my_events: [],
        all_events: [],
        guests: [],
        current_user: "Guest",
        JWTtoken:"",
        toggled:true
    };
    this.toggleWrapper = this.toggleWrapper.bind(this)
    this.showGuests = this.showGuests.bind(this)
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
      localStorage.getItem("Logged_in") && this.setState({
          current_user: localStorage.getItem("Logged_in")
      })
  }

  /**
  Toggles the dashboard sidebar
  */
  toggleWrapper(){
    this.setState({
      toggled:!this.state.toggled
    })
  }

  /**
  Use fetch API to send rsvps
  */
  sendRSVP(dynamicData) {
    if(this.state.JWTtoken){
      const owner = {owner:dynamicData.owner}
      fetch(`http://localhost:5000/api/v2/events/${dynamicData.eventname}/rsvp`, {
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token': this.state.JWTtoken
        },
        body:JSON.stringify(owner)
      })
      .then(response => response.json())
      .then((findresp) => {
           toast.success(findresp.message,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
           })
      })
    }
  }

  /**
  Use fetch API to get guests to specific events
  */
  showGuests(dynamicData) {
    fetch(`http://localhost:5000/api/v2/events/${dynamicData.eventname}/rsvp`, {
        method:'GET',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token': this.state.JWTtoken
        }
      })
    .then(response => response.json())
    .then((findresp) => {
        this.setState({
          myguests:findresp.Guests
      })
    })
    .catch(error => console.log('parsing failed', error))
  }

  componentDidMount(){
      fetch(`http://localhost:5000/api/v2/events`, {
          method:'GET',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json',
              'x-access-token': this.state.JWTtoken
          }
        })
      .then(response => response.json())
      .then((findresp) => {
            this.setState({
              all_events:findresp.Events,
              current_user: this.state.current_user
          })
      })
      .catch(error => console.log('parsing failed', error))
   }
   
  render(){
    return (
      <div className="Events">
        <div id="wrapper">
          { this.state.toggled ?
            <Sidebar current_user={this.state.current_user}/>
            :""
          }
          <div id="content">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" id="sidebarCollapse" onClick={this.toggleWrapper} className="btn btn-info navbar-btn">
                    <i className="glyphicon glyphicon-align-left"></i>
                    <span>Toggle Sidebar</span>
                  </button>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Page</a></li>
                  </ul>
                </div>
              </div>
            </nav>
            <ToastContainer />
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a href={`/${this.state.current_user}/createevent`} id="dashboardCreateEvent" className="btn btn-info navbar-btn">
                    <i className="glyphicon glyphicon-align-left"></i>
                    <span>Create an Event</span>
                  </a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Page</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
         );
  }
};

export default Dashboard;
