import React, { Component } from 'react';
import jwt from 'jsonwebtoken'

class Events extends Component {
  constructor(props){
    super(props);
    this.state = {
        events: [],
        current_user: "Guest",
        JWTtoken:"",
        toggled:true,
        myevents:false,
    };
    this.toggleWrapper = this.toggleWrapper.bind(this)
    this.toggleTabs = this.toggleTabs.bind(this)
    this.logout = this.logout.bind(this)
  }
  toggleWrapper(){
    this.setState({
      toggled:!this.state.toggled
    })
  }
  toggleTabs(){
    this.setState({
      myevents:!this.state.myevents
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
  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
      localStorage.getItem("Logged_in") && this.setState({
          current_user: localStorage.getItem("Logged_in")
      })
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
                <a href="#Dashboard" >Account</a>
              </li>
              <li>
                <a href="#MyEvents" onClick={this.toggleTabs} >MyEvents</a>
              </li>
              <li>
                <a href="#Settings" onClick={this.toggleTabs}>Settings</a>
              </li>
              <li>
                <a href="#Contacts" onClick={this.toggleTabs}>Contacts</a>
              </li>
              <li>
                <a href="#Signout" onClick={this.logout} >Sign Out</a>
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
                {  this.state.myevents ?
                <div id="MyEvents">
                  <div className="card text-center">
                  {
                    this.state.events.map((dynamicData,key) =>
                    <div>
                      <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                          <li className="nav-item">
                            <a className="nav-link active" href="#">{dynamicData.eventname}</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">RSVPs</a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{dynamicData.eventname}</h5>
                        <p className="card-text">{dynamicData.location}</p>
                        <p className="card-text">{dynamicData.date}</p>
                        <p className="card-text">{dynamicData.category}</p>
                        <a href="#" className="btn btn-primary">View Event</a>
                        <a href="#" className="btn btn-danger">Send Rsvp</a>
                      </div>
                    </div>
                    )
                  }
                  </div>
                </div>:""
              }
              </div>
            </nav>
          </div>
        </div>
      </div>
         );
  }
};

export default Events;
