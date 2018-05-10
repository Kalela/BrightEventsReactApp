import React from 'react';
import { NavLink, Route } from 'react-router-dom'

const logout = () => {
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
  })
  this.props.history.push("/")
}

const Sidebar = ({current_user}) => (
  <nav id="sidebar">
    <div className="sidebar-header">
      <a href="/">
        <h3>BrightEvents</h3>
      </a>
    </div>
    <ul className="list-unstyled components">
      <p>Hi, { current_user }</p>
      <li>
        <NavLink exact activeClassName="current" to="/dashboard">Account</NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/events">All Events</NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to={`/${current_user}/events`}>MyEvents</NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to={`/${current_user}/guests`}>MyGuests</NavLink>
      </li>
      <li>
        <a href={`/${current_user}/guests`}>MyRSVPs/ Event Wishlist</a>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/settings">Settings</NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/contacts">Contacts</NavLink>
      </li>
      <li>
        <a href="#Signout" onClick={() => this.logout()}>Sign Out</a>
      </li>
    </ul>
  </nav>
)

export default Sidebar;
