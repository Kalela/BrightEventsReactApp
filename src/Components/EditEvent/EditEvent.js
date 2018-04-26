import React, { Component } from 'react';

import NavbarOptions from '../NavbarOptions/NavbarOptions';

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
        </div>
    );
  }
};

export default Events;
