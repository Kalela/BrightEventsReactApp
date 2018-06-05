import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom'

import NavbarOptions from '../NavbarOptions/NavbarOptions';

/**
The view all events component
*/
class CreateEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
        events: [],
        JWTtoken: "",
        category: "Other",
        current_user: "",
        created: false
    };
    this.addEvent = this.addEvent.bind(this)
    this.handleDropdown = this.handleDropdown.bind(this)
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
      localStorage.getItem("Logged_in") && this.setState({
          current_user: localStorage.getItem("Logged_in")
      })
  }

  /**
  Handle toggling the category dropdown
  */
  handleDropdown(event) {
    this.setState({category: event.target.value});
  }

  /**
  Collect data from user and post to api
  */
  addEvent = (event) => {
      event.preventDefault();
      const new_event = {
      eventname: this.refs.eventname.value,
      location: this.refs.location.value,
      date: this.refs.date.value,
      category: this.state.category,
      }
      fetch('http://localhost:5000/api/v2/events', {
          method:'POST',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json',
              'x-access-token': this.state.JWTtoken
          },
          body:JSON.stringify(new_event)
      })
      this.setState({
        created: true
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
                  <div className="col-md-12">
                    <div className="g" id="CreateEventForm">
                    <h1 className="head">Create Event</h1>
                        {
                          this.state.created ?
                          <Alert color="success">
                            Event created! <a href={`/${this.state.current_user}/${this.refs.eventname.value}`}> Check it out </a>
                          </Alert>:
                          ""
                        }
                          <form className="formnow" onSubmit={ this.addEvent } >
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

export default CreateEvent;
