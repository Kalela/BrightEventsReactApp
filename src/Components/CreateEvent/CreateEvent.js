import React, { Component } from 'react';

class Events extends Component {
  constructor(props){
    super(props);
    this.state = {
        events: [],
        JWTtoken: ""
    };
    this.addEvent = this.addEvent.bind(this)
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
  }

  addEvent = (event) => {
      event.preventDefault();
      const new_event = {
      eventname: this.refs.eventname.value,
      location: this.refs.location.value,
      date: this.refs.date.value,
      category: this.refs.category.value,
      }

      console.log(new_event);
      fetch('http://localhost:5000/api/v2/events', {
          method:'POST',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json',
              'x-access-token': this.state.JWTtoken
          },
          body:JSON.stringify(new_event)
      })
  }
  render(){
    return (
          <div>
            <nav className="navbar navbar-default">
              <div className="navbar-header">
                <a href="/" className="navbar-brand">EventHub</a>
              </div>
            </nav>
            <div className="container">
              <div className="col-md-6 text-center">
                <div className="g">
                      <form id="CreateEventForm" className="formnow" onSubmit={ this.addEvent } >
                        <div className="form-group required">
                          <label className="control-label">Eventname</label>
                            <input type="text" ref="eventname" className="form-control" id="eventname" required/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Location</label>
                            <input className="form-control" ref="location" id="location" required type="text"/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Date</label>
                            <input className="form-control" ref="date" id="date" required type="text"/>
                        </div>
                        <div className="dropdown">
                          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Category
                            <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li><a ref="category">Bridal</a></li>
                            <li><a ref="category">Commemorative</a></li>
                            <li><a ref="category">Educational</a></li>
                            <li><a ref="category">Product Launch</a></li>
                            <li><a ref="category">Social</a></li>
                            <li><a ref="category">VIP</a></li>
                            <li role="separator" className="divider"></li>
                            <li><a href="category">Other</a></li>
                          </ul>
                        </div>
                        <button className="btn btn-info" id="createEvent" >
                          Create Event
                        </button>
                      </form>
                </div>
              </div>
            </div>
          </div>
    );
  }
};

export default Events;
