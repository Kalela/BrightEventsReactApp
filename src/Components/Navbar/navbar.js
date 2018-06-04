import React from 'react';

import NavbarOptions from '../NavbarOptions/NavbarOptions';

/**
Presentational component that renders the webapps navbar if a user is
logged in.
*/
const Navbar = ({current_user},{search_bar}) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">BrightEvents</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
      </ul>
      {

        current_user ?
        < NavbarOptions current_user={current_user}/>
        :
        ""
      }
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search Events" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><a href="/search">Search</a></button>
      </form>
    </div>
  </nav>
)

export default Navbar;
