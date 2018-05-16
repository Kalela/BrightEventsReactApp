import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar';
import LandingPic from '../../img/landing.jpg';
import EducationalPic from '../../img/educational.jpg';
import BottlePic from '../../img/barbottle.jpg';

/**
Functional component for the landing page
*/
//Change to presentational
class LandingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
          events: [],
          search: "",
          current_user: ""
        };
    }

    componentWillMount(){
        localStorage.getItem("BrightEventsJWTtoken") && this.setState({
            JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
        })
        localStorage.getItem("Logged_in") && this.setState({
            current_user: localStorage.getItem("Logged_in")
        })
    }

    render(){
      console.log(this.state)
      return (
        <div className="LandingPage" id="aboutUs">
          <div id="landingPageDiv">
            <Navbar current_user={this.state.current_user}/>
            <div className="jumbotron jumbotron-fluid" id="landingPageJumbotron">
              <div className="container">
                <h1 className="display-4">Bright Events</h1>
                <p className="lead">We handle your event needs.</p>
                <a href="/register">
                  <button className="btn btn-outline-success my-2 my-sm-0" >Register</button>
                </a>
                <a href="/login" >
                  <button className="btn btn-outline-success my-2 my-sm-0" id="loginButton">Log In</button>
                </a>
              </div>
            </div>
          </div>
          <div id="brightEventsCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#brightEventsCarousel" data-slide-to="0" className="active"></li>
              <li data-target="#brightEventsCarousel" data-slide-to="1"></li>
              <li data-target="#brightEventsCarousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={LandingPic} alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={EducationalPic} alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={BottlePic} alt="Third slide" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#brightEventsCarousel" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#brightEventsCarousel" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
      </div>
           );
    }
};

export default LandingPage;
