import React, { Component } from 'react';
import './styles.css';

class Events extends Component {
  constructor(props){
    super(props);
      this.state = {
          events: []
      };
  }
    
  componentDidMount(){
      fetch('https://bright-events-api-.herokuapp.com/api/v2/events')
      .then(response => response.json())
      .then((parsedJSON) => {
         console.log(parsedJSON) 
      })
      .catch(error => console.log('parsing failed', error))
}
  render(){
    return (
        <div className="Events">
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

        <script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src = "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>


        <div className="container">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
                <div className="col-sm-6">
                  <h2>Popular Events</h2>
                     <div className="panel-group">
                      <div className="panel panel-default">
                         <div className="panel-body">
                          Mt. Kenya Marathon(Event 1)<button className="btn btn-danger btn-xs">
                            Send RSVP
                            </button>
                          </div>
                          <div className="panel-body">
                          Safaricom Sevens(Event 2)<button className="btn btn-danger btn-xs">
                            Send RSVP
                            </button>
                          </div>
                          <div className="panel-body">
                          Naiconn(Event 3)<button className="btn btn-danger btn-xs">
                            Send RSVP
                            </button>
                          </div>
                          <div className="panel-body">
                          Python Charmers(Event 4)<button className="btn btn-danger btn-xs">
                            Send RSVP
                            </button>
                          </div>
                          <div className="panel-body">
                          Jameson Rugby League(Event 5)<button className="btn btn-danger btn-xs">
                            Send RSVP
                            </button>
                          </div>
                          <div className="panel-body">
                          <button className="btn btn-danger btn-xs">
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

                <div className="container">
                    <div className="jumbotron">
                      <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                               Sign in to Create and Manage events
                                <a href="/login" title="Log In">
                               <button type="button" name="button" className="btn btn-primary">Sign in</button>
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