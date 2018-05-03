import React, { Component } from 'react';

import NavbarOptions from '../NavbarOptions/NavbarOptions';
import LandingPic from '../../img/landing.jpg';
import EducationalPic from '../../img/educational.jpg';
import BottlePic from '../../img/barbottle.jpg';

class LandingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
          events: [],
          search: "",
          current_user: ""

        };

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({  [e.target.name]:e.target.value })
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
        this.fetchData();
    }

    fetchData = () => {
      fetch('http://localhost:5000/api/v2/events')
      .then(response => response.json())
      .then((findresp) => {
          this.setState({
              events:findresp.Events
          })
      })
        .catch(error => console.log('parsing failed', error))
    }

    render(){
      return (
        <div className="LandingPage" id="aboutUs">
          <div id="landingPageDiv">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="/">BrightEvents</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" name="search" value={this.state.search} onChange={this.onChange} placeholder="Search Events" aria-label="Search" />
                  <a href="/search">
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </a>
                </form>
                {
                  this.state.current_user ?
                  < NavbarOptions current_user={this.state.current_user}/>
                  :
                  ""
                }
              </div>
            </nav>
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