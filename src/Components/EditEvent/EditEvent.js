import React, { Component } from 'react';

class Events extends Component {
  constructor(props){
    super(props);
    this.editEvent = this.editEvent.bind(this)
  }
  editEvent = (event) => {
      event.preventDefault();
      const new_event = {
      eventname: this.refs.eventname.value,
      location: this.refs.location.value,
      date: this.refs.date.value,
      category: this.refs.category.value,
      }

      console.log(new_event);
      fetch('http://localhost:5000/api/v2/events/ { eventname }', {
          method:'PUT',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json',
          },
          body:JSON.stringify(new_event)
      })
  }

  render(){
    return (
          <div className="EditEvent">
          </div>
    );
  }
};

export default Events;
