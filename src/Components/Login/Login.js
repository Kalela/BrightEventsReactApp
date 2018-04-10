import React, { Component } from 'react';
//import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.runLogin = this.runLogin.bind(this)
  }
  runLogin = (event) => {
      event.preventDefault();
      const user = {
      username: this.refs.username.value,
      password: this.refs.password.value,  
      }
      
      console.log(user);
      fetch('http://localhost:5000/api/v2/auth/register', {
          method:'POST',
          headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-type':'application/json'
          },
          body:JSON.stringify(user)
      })
  }
  render(){
    return (
    <div className="Login">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">EventHub</a>
           </div>
        </nav>
        <div className="container">
            <div className="col-md-6 text-center">
                <div className="g">
                <h1 className="head">Log In</h1>
                <p></p>
                    <form action="#" className="login" onSubmit={this.runLogin}>
                        <div className="form-group required">
                          <label className="control-label" >Username</label>
                            <input className="form-control" ref="username" name="username" required type="text"/>
                        </div>
                        <div className="form-group required">
                          <label className="control-label" >Password</label>
                            <input className="form-control" ref="password" name="password" required type="text"/>
                        </div>
                        <button className="btn btn-info">Log In</button>
                        <p>Dont have an Account? <a href="/register">Sign Up</a></p>
                    </form>
                </div>
                </div> 
            </div>
        </div>
         );
  }
};

export default Login;