import React, { Component } from 'react';

class NavbarOptions extends Component {
  constructor(props){
      super(props);
      this.state = {
        current_user: ""
      };
  }

  render(){
    return(
        <div className="dropdown">
          <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.props.current_user}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="#">Logout</a>
            <a className="dropdown-item" href="#">Dashboard</a>
            <a className="dropdown-item" href="#">Settings</a>
          </div>
        </div>
    );
  }

};

export default NavbarOptions;
