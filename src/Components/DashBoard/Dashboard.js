import React, { Component } from 'react';
//import './styles.css';

class Events extends Component {
  constructor(props){
    super(props);
      this.state = {
          events: []
      };
  }
  componentDidMount(){
      fetch('https://bright-events-api-.herokuapp.com/api/v2/myevents')
      .then(response => response.json())
      .then((parsedJSON) => {
         console.log(parsedJSON)
      })
      .catch(error => console.log('parsing failed', error))
   }
  render(){
    return (
        <div className="Events">  
        </div>
         );
  }
};

export default Events;
