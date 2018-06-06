import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.engagement !== nextProps.engagement ||
  //     nextState.input !== this.state.input;
  // }
  //
  // componentWillUpdate() {
  //   if (this.state.redirect === true) {
  //     <Redirect to="/" />
  //   }
  // }

  /**
  Logout a user
  */
  logout() {
    const history = createHistory();
    fetch('http://localhost:5000/api/v2/auth/logout', {
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
          <DropdownItem href={`/${this.props.current_user}/createevent`}>Create an Event</DropdownItem>
          <DropdownItem divider />
          <DropdownItem href="/events">All Events</DropdownItem>
          <DropdownItem href={`/${this.props.current_user}/events`}>My Events</DropdownItem>
          <DropdownItem href={`/${this.props.current_user}/guests`}>My Guests</DropdownItem>
          <DropdownItem href={`/${this.props.current_user}/rsvps`}>My Event Wishlist</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => this.logout()} >Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default withRouter(NavbarOptions);
