import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Button, Alert } from 'reactstrap';
import Navbar from '../Navbar/Navbar';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
    };
    this.handleReset = this.handleReset.bind(this);
  }
  handleReset() {
    const emailreset = {
      email: this.refs.email.value,
      option: 'reset-password',
    };
    this.setState({
      alert: true,
    });
    fetch('http://bright-events-api-.herokuapp.com/api/v2/emails', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(emailreset),
    })
      .then(response => response.json())
      .then((findresp) => {
        this.props.history.push('/')
      });
  }
  /**
  Renders BrightEvents Reset Password page
  */
  render() {
    return (
      <div>
        <Navbar />
        <div id="resetEmailForm">
          <h4>Please insert email to recieve password reset link</h4>
          {
            this.state.alert === true ?
              <Alert color="info" id="searchAlert">
                Please wait while we send you a password reset link. Check your mail.
              </Alert>
            :
            ''
          }
          <InputGroup>
            <input className="form-control" ref="email" id="email" required type="text" />
            <InputGroupAddon addonType="prepend">
              <Button color="success" onClick={this.handleReset}>Send Email</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    );
  }
}


export default ResetPassword;
