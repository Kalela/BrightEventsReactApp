import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
    <div className="Register">
        <nav class="navbar navbar-default">
          <div class="navbar-header">
            <a href="/" class="navbar-brand">EventHub</a>
           </div>
        </nav>
        <div class="container">
            <div class="col-md-6 text-center">
                <div class="g">
                <h1 class="head">Sign Up</h1>
                <p></p>
                    <form action="#" class="login" method="POST">
                        <div class="form-group required"><label class="control-label" for="username">Username</label>
                          <input class="form-control" id="username" name="username" required type="text" value=""></input>
                        </div>
                        <div class="form-group required"><label class="control-label" for="email">Email</label>
                          <input class="form-control" id="email" name="email" required type="text" value=""></input>
                        </div>
                        <div class="form-group required"><label class="control-label" for="password">Email</label>
                          <input class="form-control" id="password" name="password" required type="text" value=""></input>
                        </div>
                        <button class="btn btn-info">Sign Up</button>
                        <p>Already have an Account? <a href="/login">Log In</a></p>
                    </form>
                </div>
                </div> 
            </div>
        </div>
         );
  }
};

export default Register;