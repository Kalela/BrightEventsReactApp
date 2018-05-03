import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      .then(response => response.json())
      .then((findresp) => {
         if (findresp.message === "Registration successful, log in to access your account"){
           toast.success(findresp.message,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
           })
           this.props.history.push("/login")
         }else{
           toast.error(findresp.message,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
           })
         }
      })
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
        <ToastContainer />
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
                            <input className="form-control" ref="email" id="email" required type="email"/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Password</label>
                            <input className="form-control" ref="password" id="password" required type="password"/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Confirm Password</label>
                            <input className="form-control" ref="confirmpassword" id="confirmpassword" required type="password"/>
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
