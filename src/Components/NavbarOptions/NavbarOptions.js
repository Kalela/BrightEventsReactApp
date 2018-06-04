import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/**
Presentational component that renders the webapps navbar options if a user is
logged in.
It allows users to logout, access the dashboard and settings from anywhere on
the site that has the navbar.
*/
class NavbarOptions extends Component {
  constructor(props) {
      super(props);
      this.state = {
        current_user: "",
        dropdownOpen: false,
        redirect: false
      };
      this.logout = this.logout.bind(this);
      this.toggle = this.toggle.bind(this);
  }

  /**
  Logout a user
  */
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
    localStorage.removeItem("BrightEventsJWTtoken") && this.setState({
      JWTtoken: ""
    });
    this.setState ({
      redirect: true
    })
  }

  /**
  Toggle the navbar options dropdown
  */
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render(){
    if(this.state.redirect === true) {
      <Redirect to="/" />
    }
    return(
        <Dropdown id="navbarDropdown"isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.props.current_user}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Bright Events</DropdownItem>
            <DropdownItem href={`/${this.props.current_user}/dashboard`}>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => this.logout()} >Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
    );
  }

};

export default NavbarOptions;
