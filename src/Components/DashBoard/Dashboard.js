import React, { Component } from 'react';
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, CardDeck } from 'reactstrap';

import Settings from '../Settings/settings.js'
import ContactUs from '../ContactUs/contactUs.js'
import MyRSVPs from '../MyRSVPs/myRsvps.js'
import EditEvent from '../EditEvent/editEvent.js'
import Eventpic from '../../img/dave.jpg';
import DeleteModal from './DeleteModal.js';

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
        myrsvps:false,
        edit_event:false
    };
    this.toggleWrapper = this.toggleWrapper.bind(this)
    this.toggleTabs = this.toggleTabs.bind(this)
    this.logout = this.logout.bind(this)
    this.loadCreateEvent = this.loadCreateEvent.bind(this)
    this.showGuests = this.showGuests.bind(this)
    this.editEvent = this.editEvent.bind(this)
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
      localStorage.getItem("Logged_in") && this.setState({
          current_user: localStorage.getItem("Logged_in")
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
          myguests:!this.state.myguests,
          myevents:false,
          dashboard:false,
          contacts:false,
          settings:false,
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

  editEvent () {
    this.setState({
      edit_event:!this.state.edit_event
    })
  }

  toggleWrapper(){
    this.setState({
      toggled:!this.state.toggled
    })
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
                  guests:findresp.Guests
                })
          }else {
            toast.warning(findresp.message,{
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true
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
            {
              this.state.settings ?
              < Settings/>
              :""
            }
            {
              this.state.contacts ?
              < ContactUs/>
              :""
            }
            {
              this.state.myrsvps ?
              < MyRSVPs/>
              :""
            }
            {
              this.state.edit_event ?
              <EditEvent />
              :
              ""
            }
            {  this.state.myevents ?
            <div id="MyEvents">
              <CardDeck>
                {
                  this.state.events.map((dynamicData,key) =>
                  <div key={dynamicData.eventname}>
                    <Card>
                      <CardBody>
                        <CardTitle>{dynamicData.eventname}</CardTitle>
                        <CardSubtitle>At {dynamicData.location}</CardSubtitle>
                        <CardSubtitle>On {dynamicData.date}</CardSubtitle>
                        <CardSubtitle>Category: {dynamicData.category}</CardSubtitle>
                      </CardBody>
                      <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                      <CardBody>
                        <CardLink onClick={() => this.sendRSVP(dynamicData)}>Send RSVP</CardLink>
                        <CardLink onClick={() => this.editEvent(dynamicData)}>Edit Event</CardLink>
                        <DeleteModal dynamicData={dynamicData}/>
                      </CardBody>
                    </Card>
                  </div>
                  )
                }
                </CardDeck>
              </div>:""
            }

          </div>
        </div>
      </div>
         );
  }
};

export default Events;
