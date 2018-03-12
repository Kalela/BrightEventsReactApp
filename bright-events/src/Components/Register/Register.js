import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
    <div className="Register">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">EventHub</a>
           </div>
        </nav>
        <div className="container">
            <div className="col-md-6 text-center">
                <div className="g">
                <h1 className="head">Sign Up</h1>
                <p></p>
                    <form action="#" className="login" method="POST">
                        <div className="form-group required"><label className="control-label" for="username">Username</label>
                          <input className="form-control" id="username" name="username" required type="text" value=""></input>
                        </div>
                        <div className="form-group required"><label className="control-label" for="email">Email</label>
                          <input className="form-control" id="email" name="email" required type="text" value=""></input>
                        </div>
                        <div className="form-group required"><label className="control-label" for="password">Email</label>
                          <input className="form-control" id="password" name="password" required type="text" value=""></input>
                        </div>
                        <button className="btn btn-info">Sign Up</button>
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