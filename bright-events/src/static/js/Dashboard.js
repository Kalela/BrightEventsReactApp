import React, { Component } from 'react';
import '../css/styles.css';

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
        <nav class="navbar navbar-default">
         <div class="container">
            <div class="navbar-header">
               <button type="button" class="navbar-toggle" data-target="#mynav" name="button" data-toggle="collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
               </button>
               <a href="/api/v1/auth/dashboard" class="navbar-brand">Dashboard</a>
            </div>
             <div class="collapse navbar-collapse" id="mynav">
             <ul class="nav navbar-nav navbar-right">
                 <li>
                     <a href="/api/v1/auth/logout">{{ logout }}</a>
                 </li>
                 <li>
                     <a href="/api/v1/about">About</a>
                 </li>
                 <li>
                     <a href="/api/v1/auth/login">Log In</a>
                 </li>
                 <li>
                     <a href="/api/v1/auth/register">Sign Up</a>
                 </li>
             </ul>
             </div>
         </div>
      </nav>


    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src = "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

    <div class="container">
        <div class="row profile">
            <div class="col-md-3">
                <div class="profil-sidebar">
                <div class="profile-user-pic">
                    <img src="https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png" class="img-responsive img-circle">
                    </div>
                    <div class="profile-user-title">
                    <div class="profile-user-name">
                        <p>Welcome, </p>{{ name }}
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
            <div class="row">
            <div class="col-sm-6">
                 <div class="panel-group">
                  <div class="panel panel-default">
                      <h2>Popular Events</h2>
                     <div class="panel-body">
                      Mt. Kenya Marathon<a href="/api/v1/send/Mt. Kenya Marathon/rsvp"><button class="btn btn-danger btn-xs">
                        Send RSVP
                        </button></a>
                      </div>
                      <div class="panel-body">
                      Naiconn<a href="/api/v1/send/Naiconn/rsvp"><button class="btn btn-danger btn-xs">
                        Send RSVP
                          </button></a>
                      </div>
                      <div class="panel-body">
                      Naiconn(Event 3)<button class="btn btn-danger btn-xs">
                        Send RSVP
                        </button>
                      </div>
                      <div class="panel-body">
                      Python Charmers(Event 4)<button class="btn btn-danger btn-xs">
                        Send RSVP
                        </button>
                      </div>
                      <div class="panel-body">
                      Jameson Rugby League(Event 5)<button class="btn btn-danger btn-xs">
                        Send RSVP
                        </button>
                      </div>
                     </div>
                </div>
            </div>
        </div>
        <div class="col-md-9">
        <div class="container">

      <div class="container">
            <div class="col-sm-6">
              <h2>My New Events</h2>
                <table>
                    <tr>
                    <h6>Event Name</h6>
                    {{ eventid }},{{ directions }},{{ date }}
                    </tr>
                </table>     
                      <a href="/api/v1/new_event"><button class="btn btn-primary btn-xs">
                        Add Event
                        </button></a>           
            </div> 

        </div>
        <div class="container">
        <div class="col-sm-6">
          <h2>My New RSVPs</h2>
                  {{ rsvps }}       
                  <a href=""><button class="btn btn-danger btn-xs">
                    Remove
                    </button></a>           
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