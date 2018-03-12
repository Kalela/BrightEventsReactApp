import React, { Component } from 'react';
import './styles.css';

class Events extends Component {
  constructor(props){
    super(props);
      this.state = {
          events: []
      };
  }
    
//  componentWillMount() {
//      fetch('https://bright-events-api-.herokuapp.com/api/v2/events')
//      .then((resp) => resp.json())
//      .then(data){
//          let events = data.resp;
//          console.log(events);
////          return events.map(
////              <div key={events.results}>
////                  <label> Event.events </label>
////              </div>
////              )
//          }
//      this.setState({events: events});
//      console.log("state", this.state.events);
//      })
//  }
  render(){
    return (
        <div className="Events">
        <nav class="navbar navbar-default">
          <div class="container">
            <div class="navbar-header">
               <button type="button" class="navbar-toggle" data-target="#mynav" name="button" data-toggle="collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
               </button>
               <a href="/dashboard" class="navbar-brand">Dashboard</a>
            </div>
             <div class="collapse navbar-collapse" id="mynav">
                 <ul class="nav navbar-nav navbar-right">
                     <li>
                         <a href="/logout">Logout</a>
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

        <div className="container">
            <div className="row profile">
                <div class="col-md-3">
                    <div class="profil-sidebar">
                    <div class="profile-user-pic">
                        <img src="https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png"/>
                        </div>
                        <div class="profile-user-title">
                        <div class="profile-user-name">
                            <p>Welcome Kalela </p>
                            </div>
                        </div>
                        <div class="profile-user-buttons">
                        <button class="btn btn-success btn-sm">
                            Follow
                            </button>
                        <button class="btn btn-danger btn-sm">
                            Message
                            </button>

                        </div>
                       <div class="profile-user-menu">
                        <ul class="nav">
                            <li class="active"><a href=""><i class="glyphicon glyphicon-home"></i>  Overview</a></li>
                            <li><a href=""><i class="glyphicon glyphicon-user"></i>  Account Status</a></li>
                            <li><a href="/api/v1/events/view"><i class="glyphicon glyphicon-calendar"></i>  My Events</a></li>
                            <li><a href=""><i class="glyphicon glyphicon-flag"></i>  My RSVPs</a></li>

                            </ul>
                        </div>
                    </div>
                </div>
        </div>
        </div>
      </div>
         );
  }
};

export default Events;