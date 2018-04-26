import React, { Component } from 'react';
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Events extends Component {
  constructor(props){
    super(props);
    this.state = {
        events: [],
        guests: [],
        current_user: "Guest",
        JWTtoken:"",
        toggled:true,
        myevents:false,
        myguests:false,
        settings:false,
        contacts:false,
        dashboard:false,
        myrsvps:false
    };
    this.toggleWrapper = this.toggleWrapper.bind(this)
    this.toggleTabs = this.toggleTabs.bind(this)
    this.logout = this.logout.bind(this)
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
  toggleTabs(tab){
    switch (tab){
      case 1:
        this.setState({
          dashboard:!this.state.dashboard,
          myevents:false,
          settings:false,
          contacts:false,
          myguests:false,
          myrsvps:false
        })
        break;
      case 2:
        this.setState({
          myevents:!this.state.myevents,
          dashboard:false,
          settings:false,
          contacts:false,
          myguests:false,
          myrsvps:false
        })
        break;
      case 3:
        this.setState({
          settings:!this.state.myguests,
          myevents:false,
          dashboard:false,
          contacts:false,
          myguests:false,
          myrsvps:false
        })
        break;
      case 4:
        this.setState({
          myrsvps:!this.state.myrsvps,
          myevents:false,
          settings:false,
          dashboard:false,
          myguests:false,
          contacts:false
        })
        break;
      case 5:
        this.setState({
          settings:!this.state.settings,
          myevents:false,
          contacts:false,
          dashboard:false,
          myguests:false,
          myrsvps:false
        })
        break;
      case 6:
          this.setState({
            contacts:!this.state.contacts,
            myevents:false,
            settings:false,
            dashboard:false,
            myguests:false,
            myrsvps:false
          })
        break;
    }
  }
  logout(){
    fetch(`http://localhost:5000/api/v2/logout`, {
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token': this.state.JWTtoken
        }
      })
    localStorage.removeItem("Logged_in") && this.setState({
      current_user: "Guest"
    })
    this.props.history.push("/")

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
    if(this.state.JWTtoken){
      fetch(`http://localhost:5000/api/v2/events/${dynamicData.eventname}/rsvp`)
      .then(response => response.json())
      .then((findresp) => {
          console.log(findresp.Guests)
          if(findresp.Guests){
              this.setState(
                {
                  events:findresp.Guests
                })
          }else {
            this.setState(
              {
                rsvp_message:findresp.message
              })
          }
      })
      .catch(error => console.log('parsing failed', error)),{
          method:'GET',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json',
              'x-access-token': this.state.JWTtoken
          }

      }
    }
  }

  componentDidMount(){
      const user = jwt.decode(this.state.JWTtoken);
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
              events:findresp.MyEvents,
              current_user: this.state.current_user
          })
        }
      })
      .catch(error => console.log('parsing failed', error))
   }
  render(){
    return (
      <div className="Events">
        <div id="wrapper">
        { this.state.toggled ?
          <nav id="sidebar">
            <div className="sidebar-header">
              <a href="/">
                <h3>BrightEvents</h3>
              </a>
            </div>
            <ul className="list-unstyled components">
              <p>Hi, { this.state.current_user }</p>
              <li className="active">
                <a href="#Dashboard" onClick={() => this.toggleTabs(1)} >Account</a>
              </li>
              <li>
                <a href="#MyEvents" onClick={() => this.toggleTabs(2)} >MyEvents</a>
              </li>
              <li>
                <a href="#MyGuests" onClick={() => this.toggleTabs(3)} >MyGuests</a>
              </li>
              <li>
                <a href="#MyRSVPs" onClick={() => this.toggleTabs(4)} >MyRSVPs/ Event Wishlist</a>
              </li>
              <li>
                <a href="#Settings" onClick={() => this.toggleTabs(5)} >Settings</a>
              </li>
              <li>
                <a href="#Contacts" onClick={() => this.toggleTabs(6)} >Contacts</a>
              </li>
              <li>
                <a href="#Signout" onClick={() => this.logout()} >Sign Out</a>
              </li>
            </ul>
          </nav> : ""
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
            {  this.state.myevents ?
            <div id="MyEvents">
              <div className="card text-center">
              {
                this.state.events.map((dynamicData,key) =>
                <div>
                  <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                      <li className="nav-item">
                        <a className="nav-link active" href="/events/eventname">{dynamicData.eventname}</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" onClick={() => this.showGuests(dynamicData)} href="#">Guests</a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{dynamicData.eventname}</h5>
                    <p className="card-text">{dynamicData.location}</p>
                    <p className="card-text">{dynamicData.date}</p>
                    <p className="card-text">{dynamicData.category}</p>
                    <a href="/events/eventname" className="btn btn-primary">View Event</a>
                    <a onClick={() => this.sendRSVP(dynamicData)} className="btn btn-danger">Send Rsvp</a>
                  </div>
                </div>
                )
              }
              </div>
            </div>:""
          }
          </div>
        </div>
      </div>
         );
  }
};

export default Events;
