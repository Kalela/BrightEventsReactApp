import React, { Component } from 'react';

import NavbarOptions from '../NavbarOptions/NavbarOptions';

/**
Functional component to render a single event.
*/
class ViewSingleEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
      current_user: "",
      JWTtoken: ""
    };
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
      localStorage.getItem("Logged_in") && this.setState({
          current_user: localStorage.getItem("Logged_in")
      })
  }

  render(){
    return(
      <div className="ViewSingleEvent" >
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

export default ViewSingleEvent;
