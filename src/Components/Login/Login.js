import React, { Component } from 'react';
//import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
    <div className="Login">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">EventHub</a>
           </div>
        </nav>
        <div className="container">
            <div className="col-md-6 text-center">
                <div className="g">
                <h1 className="head">Log In</h1>
                <p></p>
                    <form action="#" className="login" method="POST">
                        <div className="form-group required"><label className="control-label" for="username">Username</label>
                          <input className="form-control" id="username" name="username" required type="text" value=""></input>
                        </div>
                        <div className="form-group required"><label class="control-label" for="password">Email</label>
                          <input className="form-control" id="password" name="password" required type="text" value=""></input>
                        </div>
                        <button className="btn btn-info">Log In</button>
                        <p>Dont have an Account? <a href="/register">Sign Up</a></p>
                    </form>
                </div>
                </div> 
            </div>
        </div>
         );
  }
};

export default Login;