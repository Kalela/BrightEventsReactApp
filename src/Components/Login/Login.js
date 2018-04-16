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
      </div>
         );
  }
};

export default Login;
