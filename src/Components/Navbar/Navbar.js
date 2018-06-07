import React from 'react';

import NavbarOptions from '../NavbarOptions/NavbarOptions';

/**
Presentational component that renders the webapps navbar if a user is
logged in.
*/
const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">BrightEvents</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto" />
      {

        props.current_user ?
          <NavbarOptions current_user={props.current_user} JWTtoken={props.JWTtoken} />
        :
        ''
      }
      <form className="form-inline my-2 my-lg-0">
        <button className="btn btn-outline-success my-2 my-sm-0"><a href="/search">Search Events</a></button>
      </form>
    </div>
  </nav>
);

export default Navbar;