import React, { Component } from 'react';

import Navbar from '../Navbar/Navbar';

class ConfirmResetPassword extends Component {
  constructor(props) {
    super(props);
    this.runReset = this.runReset.bind(this);
  }

  runReset(event) {
    event.preventDefault();
    console.log(this.props.match.params.token)
    const password = {
      password: this.refs.password.value,
    };
    fetch(`http://bright-events-api-.herokuapp.com/api/v2/confirm_email/reset-password/${this.props.match.params.token}`,{
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(password)
    })
      .then(response => response.json())
      .then((findresp) => {
        this.props.history.push('/login');
      });
  }

  render() {
    return (
      <div className="Register">
        <Navbar />
        <div className="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <div className="col-md-12">
                  <div className="g">
                    <h1 className="head">Reset Password</h1>
                    <p>Insert your new password</p>
                    <form id="RegisterForm" className="formnow" onSubmit={this.runReset} >
                      <div className="form-group required">
                        <label className="control-label">Password</label>
                        <input type="password" ref="password" id="password" className="form-control" required />
                      </div>
                      <div className="form-group required">
                        <label className="control-label">Confirm Password</label>
                        <input className="form-control" ref="confirmpassword" id="confirmpassword" required type="password" />
                      </div>
                      <button className="btn btn-info" id="sendRegister" >
                              Reset Password
                      </button>
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

export default ConfirmResetPassword;
