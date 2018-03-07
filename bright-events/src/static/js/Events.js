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
    <div className="Events">
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
              <h2>Popular Events</h2>
                 <div class="panel-group">
                  <div class="panel panel-default">
                     <div class="panel-body">
                      Mt. Kenya Marathon(Event 1)<button class="btn btn-danger btn-xs">
                        Send RSVP
                        </button>
                      </div>
                      <div class="panel-body">
                      Safaricom Sevens(Event 2)<button class="btn btn-danger btn-xs">
                        Send RSVP
                        </button>
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
                      <div class="panel-body">
                      {this.state.events}
                      <button class="btn btn-danger btn-xs">
                        Send RSVP
                        </button>
                      </div>
                     </div>
                </div>
            </div> 
        </div>
      </div>
    </div>      

    </div>
    
            <div class="container">
                <div class="jumbotron">
                  <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                           Sign in to Create and Manage events
                            <a href="/login" title="Log In">
                           <button type="button" name="button" class="btn btn-primary">Sign in</button>
                            </a>
                            Or
                            <a href="/register"> Sign Up</a>
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