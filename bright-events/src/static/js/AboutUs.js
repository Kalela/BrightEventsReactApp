import React, { Component } from 'react';
import '../css/AboutUs.css';

class AboutUs extends Component {
//    constructor(props){
//        super(props);
//    }
  render(){
    return (
    <div className="AboutUs">
                <nav class="navbar navbar-default">
         <div class="container">
            <div class="navbar-header">
               <button type="button" class="navbar-toggle" data-target="#mynav" name="button" data-toggle="collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
               </button>
               <a href="/" class="navbar-brand">Bright Events</a>
            </div>
             <div class="collapse navbar-collapse" id="mynav">
             <ul class="nav navbar-nav navbar-right">
                 <li class="active">
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


    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src = "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

    <div class="container">
    <div class="jumbotron">
      <div class="container">
        <div class="row">
            <div class="col-sm-6">
              <h1>Welcome to EventHub</h1>
               EventHub is a Bright Events offshoot<br /> that enables you to create,manage and attend<br /> events with ease. We provide a platform for event organisers to get creative with their<br /> marketing.
                <a href="/login" title="Registration">
               <button type="button" name="button" class="btn btn-primary">Sign up</button>
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