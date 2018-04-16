import React, { Component } from 'react';
//import './AboutUs.css';

class AboutUs extends Component {
    constructor(){
        super();
    }
  render(){
    return (
    <div className="AboutUs">
                <nav className="navbar navbar-default">
         <div className="container">
            <div className="navbar-header">
               <button type="button" className="navbar-toggle" data-target="#mynav" name="button" data-toggle="collapse">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
               </button>
               <a href="/" className="navbar-brand">Bright Events</a>
            </div>
             <div className="collapse navbar-collapse" id="mynav">
             <ul className="nav navbar-nav navbar-right">
                 <li className="active">
                     <a href="/">Home</a>
                 </li>
                 <li>
                     <a href="/aboutus">About</a>
                 </li>
                 <li>
                     <a href="/login">Log In</a>
                 </li>
                 <li>
                     <a href="/register">Sign Up</a>
                 </li>
             </ul>
             </div>
         </div>
      </nav>

    <div className="container">
    <div className="jumbotron">
      <div className="container">
        <div className="row">
            <div className="col-sm-6">
              <h1>Welcome to EventHub</h1>
               EventHub is a Bright Events offshoot<br /> that enables you to create,manage and attend<br /> events with ease. We provide a platform for event organisers to get creative with their<br /> marketing.
                <a href="/register" title="Registration">
               <button type="button" className="btn btn-primary">Sign up</button>
                </a>
                <a href="/createevent" title="Registration">
               <button type="button" className="btn btn-primary">Create Event </button>
                </a>
                <a href="/events" title="Registration">
               <button type="button" className="btn btn-primary">See Events </button>
                </a>
            </div>
        </div>
      </div>
    </div>
    </div>
    </div>
         );
  }
};

export default AboutUs;
