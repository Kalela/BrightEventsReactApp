import React, { Component } from 'react';
import { Redirect, browserHistory } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      logged_in_users: []
    }
    this.runLogin = this.runLogin.bind(this)
  }
  runLogin = (event) => {
      event.preventDefault();
      const user = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      }
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
         localStorage.setItem("BrightEventsJWTtoken", findresp.access_token)
         localStorage.setItem("Logged_in", user.username)
         if (findresp.access_token) {
           this.setState({
             logged_in_users:user.username,
           })
           this.props.history.push("/dashboard")
         }
      })
  }
  render(){
    return (
      <div className="Login">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">BrightEvents</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
          </div>
        </nav>
        <div className="container">
            <div className="col-md-6 text-center">
              <div className="g">
                <h1 className="head">Log In</h1>
                <p></p>
                <form action="#" className="login" onSubmit={this.runLogin}>
                    <div className="form-group required">
                      <label className="control-label" >Username</label>
                        <input className="form-control" ref="username" name="username" required type="text"/>
                    </div>
                    <div className="form-group required">
                      <label className="control-label" >Password</label>
                        <input className="form-control" ref="password" name="password" required type="text"/>
                    </div>
                    <button className="btn btn-info">Log In</button>
                    <p>Dont have an Account? <a href="/register" styles="{{color:blue}}" >Sign Up</a></p>
                </form>
              </div>
            </div>
        </div>
      </div>
         );
  }
};

export default Login;
