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
        </div>
    );
  }
};

export default Events;
