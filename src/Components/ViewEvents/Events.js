import React, { Component } from 'react';

class Events extends Component {
  constructor(props){
    super(props);
      this.state = {
          events: [],
          JWTtoken: ""
      };
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
  }

  componentDidMount(){
      this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:5000/api/v2/events')
    .then(response => response.json())
    .then((findresp) => {
        console.log(findresp.Events)
        this.setState({
            events:findresp.Events
        })
    })
      .catch(error => console.log('parsing failed', error))
  }

  render(){
    return (
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">BrightEvents</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search Events" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
          <div className="card text-center">
          {
            this.state.events.map((dynamicData,key) =>
            <div>
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">{dynamicData.eventname}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">RSVPs</a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">{dynamicData.eventname}</h5>
                <p className="card-text">{dynamicData.location}</p>
                <p className="card-text">{dynamicData.date}</p>
                <p className="card-text">{dynamicData.category}</p>
                <a href="#" className="btn btn-primary">View Event</a>
                <a href="#" className="btn btn-danger">Send Rsvp</a>
              </div>
            </div>
            )
          }
          </div>
        </div>
    );
  }
};

export default Events;
