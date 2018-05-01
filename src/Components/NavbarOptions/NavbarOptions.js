import React, { Component } from 'react';

class NavbarOptions extends Component {
  constructor(props){
      super(props);
      this.state = {
        current_user: ""
      };
      this.logout = this.logout.bind(this);
  }
  logout(){
    fetch(`http://localhost:5000/api/v2/logout`, {
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token': this.state.JWTtoken
        }
      })
    localStorage.removeItem("Logged_in") && this.setState({
      current_user: "Guest"
    })
    this.props.history.push("/")
  }
  render(){
    return(
        <div className="dropdown">
          <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.props.current_user}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" onClick={() => this.logout()}>Logout</a>
            <a className="dropdown-item" href="/dashboard">Dashboard</a>
            <a className="dropdown-item" href="#">Settings</a>
          </div>
        </div>
    );
  }

};

export default NavbarOptions;
