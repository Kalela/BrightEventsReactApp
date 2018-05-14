import React, { Component } from 'react';

import NavbarOptions from '../NavbarOptions/NavbarOptions';

class Events extends Component {
  constructor(props){
    super(props);
    this.state = {
        events: [],
        JWTtoken: "",
        category: "Other"
    };
    this.addEvent = this.addEvent.bind(this)
    this.handleDropdown = this.handleDropdown.bind(this)
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
  }
  handleDropdown(event) {
    this.setState({category: event.target.value});
  }
  addEvent = (event) => {
      event.preventDefault();
      const new_event = {
      eventname: this.refs.eventname.value,
      location: this.refs.location.value,
      date: this.refs.date.value,
      category: this.state.category,
      }
      console.log(this.refs.date.value)
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
        <div className="CreateEvent">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">BrightEvents</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              </ul>
              {
                this.state.current_user ?
                < NavbarOptions current_user={this.state.current_user}/>
                :
                ""
              }
            </div>
          </nav>
          <div className="container">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <div className="col-md-6">
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
                                <input className="form-control" ref="date" id="date" required type="date"/>
                            </div>
                            <div className="form-group">
                              <label className="control-label">Category</label>
                              <select value={this.state.category} onChange={this.handleDropdown} id="categorySelect" className="form-control">
                                <option value="Other">Other</option>
                                <option value="Bridal">Bridal</option>
                                <option value="Educational">Educational</option>
                                <option value="Commemorative">Commemorative</option>
                                <option value="Product Launch">Product Launch</option>
                                <option value="Social">Social</option>
                                <option value="VIP">VIP</option>
                              </select>
                            </div>
                            <button className="btn btn-info" id="createEvent" >
                              Create Event
                            </button>
                          </form>
                        </div>
                    </div>
                  </div>
              </div>
            </nav>
          </div>
        </div>
    );
  }
};

export default Events;
