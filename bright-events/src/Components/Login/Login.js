import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
    <div className="Login">
        <nav class="navbar navbar-default">
          <div class="navbar-header">
            <a href="/" class="navbar-brand">EventHub</a>
           </div>
        </nav>
        <div class="container">
            <div class="col-md-6 text-center">
                <div class="g">
                <h1 class="head">Log In</h1>
                <p></p>
                    <form action="#" class="login" method="POST">
                        <div class="form-group required"><label class="control-label" for="username">Username</label>
                          <input class="form-control" id="username" name="username" required type="text" value=""></input>
                        </div>
                        <div class="form-group required"><label class="control-label" for="password">Email</label>
                          <input class="form-control" id="password" name="password" required type="text" value=""></input>
                        </div>
                        <button class="btn btn-info">Log In</button>
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