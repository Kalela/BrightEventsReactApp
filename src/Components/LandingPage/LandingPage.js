import React, { Component } from 'react';

import NavbarOptions from '../NavbarOptions/NavbarOptions';

class LandingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
          events: [],
          search: "",
          current_user: ""

        };

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({  [e.target.name]:e.target.value })
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = () => {
      fetch('http://localhost:5000/api/v2/events')
      .then(response => response.json())
      .then((findresp) => {
          this.setState({
              events:findresp.Events
          })
      })
        .catch(error => console.log('parsing failed', error))
    }

    render(){
      return (
      <div className="AboutUs" id="aboutUs">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">BrightEvents</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" name="search" value={this.state.search} onChange={this.onChange} placeholder="Search Events" aria-label="Search" />
              <a href="/search">
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </a>
            </form>
            {
              this.state.current_user ?
              < NavbarOptions current_user={this.state.current_user}/>
              :
              ""
            }
          </div>
        </nav>
        <div className="jumbotron jumbotron-fluid" id="landingPageJumbotron">
          <div className="container">
            <h1 className="display-4">Bright Events</h1>
            <p className="lead">We handle your event needs.</p>
            <a href="/register">
              <button className="btn btn-outline-success my-2 my-sm-0" >Register</button>
            </a>
            <a href="/login" >
              <button className="btn btn-outline-success my-2 my-sm-0" id="loginButton">Log In</button>
            </a>
          </div>
        </div>
        <footer className="mastfoot mt-auto" id="landingFooter">
          <div className="inner">
            <p>BrightEvents by Philip Kalela</p>
          </div>
        </footer>
      </div>
           );
    }
};

export default LandingPage;
