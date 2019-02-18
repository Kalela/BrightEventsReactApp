import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
      dropdownOpen: false,
    };
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  /**
  Logout a user
  */
  logout() {
    fetch('https://brighteventsapinowlive.herokuapp.com/api/v2/auth/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': this.props.JWTtoken,
      },
    });
    localStorage.removeItem('Logged_in');
    localStorage.removeItem('BrightEventsJWTtoken');
    this.props.history.push('/');
    this.forceUpdate();
  }

  /**
  Toggle the navbar options dropdown
  */
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
    this.forceUpdate();
  }
  render() {
    return (
      <Dropdown id="navbarDropdown"isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.props.current_user}
        </DropdownToggle>
        <DropdownMenu id="navbarDropdownMenu">
          <DropdownItem header>Bright Events</DropdownItem>
          <DropdownItem divider />
          <Link to={`/${this.props.current_user}/createevent`} className="dropdown-item">Create an Event</Link>
          <DropdownItem divider />
          <Link to="/events" className="dropdown-item">All Events</Link>
          <Link to={`/${this.props.current_user}/events`} className="dropdown-item">My Events</Link>
          <DropdownItem divider />
          <DropdownItem onClick={() => this.logout()} >Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default withRouter(NavbarOptions);
