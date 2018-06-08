import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../Navbar/Navbar';

/**
Functional component that renders the register form and handles user
Registration.
*/
class Register extends Component {
  constructor(props) {
    super(props);
    this.runRegistration = this.runRegistration.bind(this);
  }

  /**
  Run the user registration
  */
  runRegistration(event) {
    event.preventDefault();
    const newUser = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      confirmpassword: this.refs.confirmpassword.value,
    };

    fetch('http://bright-events-api-.herokuapp.com/api/v2/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then((findresp) => {
        if (findresp.message === 'Registration successful, log in to access your account') {
          this.props.history.push('/login')
        } else {
          toast.error(findresp.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
  }

  render() {
    return (
      <div className="Register">
        <Navbar />
        <ToastContainer />
        <div className="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <div className="col-md-12">
                  <div className="g">
                    <h1 className="head">Sign Up</h1>
                    <form id="RegisterForm" className="formnow" onSubmit={this.runRegistration} >
                      <div className="form-group required">
                        <label className="control-label">Username</label>
                        <input type="text" ref="username" className="form-control" id="username" required />
                      </div>
                      <div className="form-group required">
                        <label className="control-label">Email</label>
                        <input className="form-control" ref="email" id="email" required type="email" />
                      </div>
                      <div className="form-group required">
                        <label className="control-label">Password</label>
                        <input className="form-control" ref="password" id="password" required type="password" />
                      </div>
                      <div className="form-group required">
                        <label className="control-label">Confirm Password</label>
                        <input className="form-control" ref="confirmpassword" id="confirmpassword" required type="password" />
                      </div>
                      <button className="btn btn-info" id="sendRegister" >
                              Sign Up
                      </button>
                      <p>Already have an Account? <Link to="/login" id="loginsignupLink">Log In</Link></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Register;
