import React, { Component } from 'react';

class LandingPage extends Component {
    constructor(){
        super();
    }
  render(){
    return (
    <div className="AboutUs" id="aboutUs">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">BrightEvents</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search Events" aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div class="jumbotron jumbotron-fluid" id="landingPageJumbotron">
        <div class="container">
          <h1 class="display-4">Bright Events</h1>
          <p class="lead">We handle your event needs.</p>
          <a href="/register">
            <button class="btn btn-outline-success my-2 my-sm-0" >Register</button>
          </a>
          <a href="/login" >
            <button class="btn btn-outline-success my-2 my-sm-0" id="loginButton">Log In</button>
          </a>
        </div>
      </div>
      <footer class="mastfoot mt-auto" id="landingFooter">
        <div class="inner">
          <p>BrightEvents by Philip Kalela</p>
        </div>
      </footer>
    </div>
         );
  }
};

export default LandingPage;
