//Dependencies
import React, { Component } from 'react';
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'

// Dashboard Components
import ContactUs from '../ContactUs/contactUs.js'
import Eventpic from '../../img/dave.jpg';
import Events from '../ViewEvents/Events'
import MyRSVPs from '../MyRSVPs/myRsvps.js'
import MyGuests from '../MyGuests/MyGuests.js'
import Settings from '../Settings/Settings.js'
import Sidebar from '../Sidebar/Sidebar.js'

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
    this.loadCreateEvent = this.loadCreateEvent.bind(this)
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

  toggleWrapper(){
    this.setState({
      toggled:!this.state.toggled
    })
  }

  loadCreateEvent() {
    this.props.history.push("/createevent")
  }
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
      const user = jwt.decode(this.state.JWTtoken);
      console.log(this.props)
      fetch(`http://localhost:5000/api/v2/events/${user.public_id}`, {
          method:'GET',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json',
              'x-access-token': this.state.JWTtoken
          }
        })
      .then(response => response.json())
      .then((findresp) => {
          if (user.public_id) {
            this.setState({
              my_events:findresp.MyEvents,
              current_user: this.state.current_user
          })
        }
      })
      .catch(error => console.log('parsing failed', error))

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
                  <button type="button" id="dashboardCreateEvent" onClick={this.loadCreateEvent} className="btn btn-info navbar-btn">
                    <i className="glyphicon glyphicon-align-left"></i>
                    <span>Create Event</span>
                  </button>
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
