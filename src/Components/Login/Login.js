import React, { Component } from 'react';
//import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.runLogin = this.runLogin.bind(this)
  }
  runLogin = (event) => {
      event.preventDefault();
      const user = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      }

      console.log(user);
      fetch('http://localhost:5000/api/v2/auth/login', {
          method:'POST',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json'
          },
          body:JSON.stringify(user)
      })
      .then(response => response.json())
      .then((findresp) => {
         console.log(findresp.access_token)
         localStorage.setItem("BrightEventsJWTtoken", findresp.access_token)
      })
  }
  render(){
    return (
      <div className="Login">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">BrightEvents</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search Events" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </div>
         );
  }
};

export default Login;
