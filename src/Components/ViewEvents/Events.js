import React, { Component } from 'react';

class Events extends Component {
  constructor(props){
    super(props);
      this.state = {
          data: []
      };
  }
    
  componentDidMount(){
      fetch('http://localhost:5000/api/v2/events')
      .then(response => response.json())
      .then((findresp) => {
         console.log(findresp.Events)
         this.setState({
             data:findresp.Events
         })
      })
      .catch(error => console.log('parsing failed', error))
}
  render(){
    return (
        <div id="eventPage">
            <div className="Events" >
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
              <h2>Popular Events</h2>
              <div>
                <div className="card-group">
                  {
                  this.state.data.map((dynamicData,key) =>
                      <div className="card text-white bg-dark mb-3">
                          <div className="card-header">
                              {dynamicData.category}
                          </div>
                          <div className="card-body">
                              <p className="card-text">
                                  Eventname: {dynamicData.eventname}
                              </p>
                              <a href="#" className="btn btn-danger btn-xs">Send RSVP</a>
                          </div>
                      </div>
                  )
                }
                </div>
              </div>
            </div>     
            <div className="container">
              <div className="jumbotron" id="eventsJumbotron">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6" id="eventsSigninText">
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
        </div>
         );
  }
};

export default Events;