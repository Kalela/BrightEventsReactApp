//  Dependencies
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
        current_user: "Guest",
        JWTtoken:"",
        toggled:true
    };
    this.toggleWrapper = this.toggleWrapper.bind(this)
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
