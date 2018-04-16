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

      console.log(newUser);
      fetch('http://localhost:5000/api/v2/auth/register', {
          method:'POST',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json'
          },
          body:JSON.stringify(newUser)
      })
  }

  render(){
    return (
      <div className="Register">
      </div>
         );
  }
};

export default Register;
