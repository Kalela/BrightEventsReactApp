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
        </div>
         );

  }
};

export default Events;
