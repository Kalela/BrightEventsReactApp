import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar';

/**
Functional component for the landing page
*/
//  Change to presentational
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: '',
      JWTtoken: '',
    };
  }

  componentWillMount() {
    localStorage.getItem("BrightEventsJWTtoken") && this.setState({
      JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
    });
    localStorage.getItem("Logged_in") && this.setState({
      current_user: localStorage.getItem("Logged_in")
    });
  }

  render() {
    return (
      <div className="LandingPage" id="aboutUs">
        <div id="landingPageDiv">
          <Navbar current_user={this.state.current_user} JWTtoken={this.state.JWTtoken} />
          <div className="jumbotron jumbotron-fluid" id="landingPageJumbotron">
            <div className="container">
              <h1 className="display-4">Bright Events</h1>
              {
                !this.state.current_user ?
                  <div>
                    <p className="lead">We handle your event needs. More<a href="/aboutus"> about us</a></p>
                    <a href="/register">
                      <button className="btn btn-outline-success my-2 my-sm-0" >Register</button>
                    </a>
                    <a href="/login" id="loginButton">
                      <button className="btn btn-outline-success my-2 my-sm-0">Log In</button>
                    </a>
                  </div>
              :
              ''
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
