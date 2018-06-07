import React, { Component } from 'react';
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import jwt from 'jsonwebtoken';

import Navbar from '../Navbar/Navbar';

/**
Functional component that renders users event's guests
*/
class MyGuests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JWTtoken: '',
      myguests: [],
      myevents: [],
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    localStorage.getItem('BrightEventsJWTtoken') && this.setState({
      JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
    });
    localStorage.getItem("Logged_in") && this.setState({
      current_user: localStorage.getItem('Logged_in')
    });
  }

  componentDidMount() {
    const user = jwt.decode(this.state.JWTtoken);
    fetch(`http://localhost:5000/api/v2/events/${user.public_id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': this.state.JWTtoken,
      },
    })
      .then(response => response.json())
      .then((findresp) => {
        this.setState({
          myevents: findresp.MyEvents
        });
        const events = findresp.MyEvents;
        if (user.public_id) {
          let guestsList = [];
          events.map((dynamicEvents, key) =>
            fetch(`http://localhost:5000/api/v2/events/${dynamicEvents.eventname}/rsvp`, {
              method: 'GET',
              headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'x-access-token': this.state.JWTtoken,
              },
            })
              .then(response => response.json())
              .then((newfindresp) => {
                const name = dynamicEvents.eventname;
                guestsList = [...guestsList, ...newfindresp.Guests];
                this.setState({
                  myguests: guestsList,
                });
              })
              .catch(error => console.log('parsing failed', error)));
        }
      })
      .catch(error => console.log('parsing failed', error));
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    return (
      <div className="container">
        <Navbar current_user={this.state.current_user} JWTtoken={this.state.JWTtoken} />
        <Table>
         <thead>
           <tr>
             <th>#</th>
             <th>Guest Username</th>
             <th>Event</th>
             <th>Options</th>
           </tr>
         </thead>
          <tbody>
            {
           this.state.myguests.map((dynamicData, key) =>
             (
               <tr key={key}>
                 <th scope="row">1</th>
                 <td>{dynamicData}</td>
                 <td />
                 <td>
                   <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                     <DropdownToggle caret>
                    Guest Options
                     </DropdownToggle>
                     <DropdownMenu>
                       <DropdownItem>Remove Guest</DropdownItem>
                       <DropdownItem>View Profile</DropdownItem>
                     </DropdownMenu>
                   </Dropdown>
                 </td>
               </tr>))
         }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MyGuests;
