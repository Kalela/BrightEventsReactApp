import React, { Component } from 'react';

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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">BrightEvents</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search Events" aria-label="Search" />
              <a href="/search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </a>
            </form>
          </div>
        </nav>
      </div>
         );
  }
};

export default Events;
