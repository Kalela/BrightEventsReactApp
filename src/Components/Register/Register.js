import React, { Component } from 'react';

class Register extends Component {
  constructor(props){
    super(props);
    this.runRegistration = this.runRegistration.bind(this)
  }
  runRegistration = (event) => {
      event.preventDefault();
      const newUser = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      confirmpassword: this.refs.confirmpassword.value,
      }

      fetch('http://localhost:5000/api/v2/auth/register', {
          method:'POST',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json'
          },
          body:JSON.stringify(newUser)
      })
      this.props.history.push("/login")
  }

  render(){
    return (
      <div className="Register">
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
                <h1 className="head">Sign Up</h1>
                    <form id="RegisterForm" className="formnow" onSubmit={this.runRegistration} >
                        <div className="form-group required">
                          <label className="control-label">Username</label>
                            <input type="text" ref="username" className="form-control" id="username" required/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Email</label>
                            <input className="form-control" ref="email" id="email" required type="text"/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Password</label>
                            <input className="form-control" ref="password" id="password" required type="text"/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Confirm Password</label>
                            <input className="form-control" ref="confirmpassword" id="confirmpassword" required type="text"/>
                        </div>
                        <button className="btn btn-info" id="sendRegister" >
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
