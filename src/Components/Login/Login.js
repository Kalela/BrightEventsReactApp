import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../Navbar/Navbar';

/**
Functional component that renders the Login page and performs login
authorization functions
*/
class Login extends Component {
  constructor(props) {
    super(props);
    this.runLogin = this.runLogin.bind(this);
  }

  /**
  Run user authentication
  */
  runLogin(event) {
    event.preventDefault();
    const user = {
      username: this.refs.username.value,
      password: this.refs.password.value,
    };
    fetch('http://localhost:5000/api/v2/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then((findresp) => {
        localStorage.setItem('BrightEventsJWTtoken', findresp.access_token);
        localStorage.setItem('Logged_in', user.username);
        if (findresp.access_token) {
          this.props.history.push(`/${user.username}/dashboard`);
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
      <div className="Login">
        <Navbar />
        <ToastContainer />
        <div className="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <div className="col-md-12">
                  <div className="g">
                    <h1 className="head">Log In</h1>
                    <form action="#" className="login" onSubmit={this.runLogin}>
                      <div className="form-group required">
                        <label className="control-label" >Username</label>
                        <input className="form-control" ref="username" required type="text" />
                      </div>
                      <div className="form-group required">
                        <label className="control-label" >Password</label>
                        <input className="form-control" ref="password" required type="password" />
                      </div>
                      <button className="btn btn-info">Log In</button>
                      <p>Dont have an Account? <a href="/register" id="loginsignupLink" >Sign Up</a></p>
                      <a href="/reset_password" id="loginsignupLink" >Forgot Password?</a>
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

export default Login;
