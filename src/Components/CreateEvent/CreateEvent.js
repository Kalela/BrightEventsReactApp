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
          <div className="CreateEvent">
          </div>
    );
  }
};

export default Events;
