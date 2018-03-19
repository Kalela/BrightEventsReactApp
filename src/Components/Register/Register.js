import React, { Component } from 'react';

class Register extends Component {
  constructor(props){
    super(props);
    this.runRegistration = this.runRegistration.bind(this)
  }     
  runRegistration(e){
      e.preventDefault();
    
      let username = document.getElementById('username').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let confirmpassword = document.getElementById('confirmpassword').value;

      fetch('https://localhost:5000/api/v2/auth/register', {
          method:'POST',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json'
          },
          body:JSON.stringify({username:username, email:email, password:password, confirmpassword:confirmpassword})
          .then((res) => res.json())
          .then((findres) => console.log(findres))
      })
  }
//    getUserData(){
//     .getElementById('sendRegister').addEventListener('click', runRegistration);
//    }
  render(){                    
    return (
    <div className="Register">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <a href="/" className="navbar-brand"> EventHub </a>
            </div>
        </nav>
        <div className="container">
            <div className="col-md-6 text-center">
                <div className="g">
                <h1 className="head">Sign Up</h1>
                    <form id="RegisterForm" className="formnow" method="POST">
                        <div className="form-group required">
                          <label className="control-label">Username</label>
                            <input type="text" className="form-control" id="username" required/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Email</label>
                            <input className="form-control" id="email" required type="text"/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Password</label>
                            <input className="form-control" id="password" required type="text"/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Confirm Password</label>
                            <input className="form-control" id="confirmpassword" required type="text"/>
                        </div>
                        <button className="btn btn-info" id="sendRegister" onClick={ this.runRegistration() }>
                          Sign Up
                        </button>
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