import React from 'react';
import { NavLink, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

/**
Logout a user
*/
const logout = () => {
  let token = localStorage.getItem("BrightEventsJWTtoken")
  fetch(`http://localhost:5000/api/v2/logout`, {
      method:'POST',
      headers:{
          'Accept':'application/json, text/plain, */*',
          'Content-type':'application/json',
          'x-access-token': token
      }
    })
  localStorage.removeItem("Logged_in")
  localStorage.removeItem("BrightEventsJWTtoken")
  {<Redirect to='/' message={"Logged out"}/>}
}

/**
Render the sidebar component
*/
const Sidebar = ({current_user}) => (
  <nav id="sidebar">
    <div className="sidebar-header">
      <a href="/">
        <h3 id="sidebarTitle">BrightEvents</h3>
      </a>
    </div>
    <ul className="list-unstyled components">
      <p>Hi, { current_user }</p>
      <li>
        <NavLink exact activeClassName="current" to={`/${current_user}/dashboard`}>Account</NavLink>
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
        <a href={`/${current_user}/rsvps`}>MyRSVPs/ Event Wishlist</a>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/settings">Settings</NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/contacts">Contacts</NavLink>
      </li>
      <li>
        <a href="#Signout" onClick={() => logout()}>Sign Out</a>
      </li>
    </ul>
  </nav>
)

export default Sidebar;
