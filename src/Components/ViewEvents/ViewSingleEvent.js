import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Table,
  Alert,
} from 'reactstrap';

import Navbar from '../Navbar/Navbar';
import EventCard from '../EventCard/EventCard';


/**
Functional component to render a single event.
*/
class ViewSingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JWTtoken: '',
      current_user: '',
      eventguests: [],
    };
  }
  componentWillMount() {
    localStorage.getItem("BrightEventsJWTtoken") && this.setState({
      JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
    });
    localStorage.getItem("Logged_in") && this.setState({
      current_user: localStorage.getItem("Logged_in")
    });
  }
  componentDidMount() {
    fetch(`https://bright-events-api-.herokuapp.com/api/v2/events/${this.props.match.params.eventname}/rsvp?owner=${this.props.match.params.username}`, {
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
          eventguests: findresp.Guests,
        });
      });
  }
  render() {
    return (
      <div className="container">
        <Navbar current_user={this.state.current_user} JWTtoken={this.state.JWTtoken} />
        <div>
          <EventCard type="singleevent" username={this.props.match.params.username} eventname={this.props.match.params.eventname} />
          <ToastContainer />
        </div>
        {
          this.state.eventguests ?
            <div id="singleEventGuests">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Guest List</th>
                  </tr>
                </thead>
                <tbody>
                  {
             this.state.eventguests.map((dynamicData, key) =>
             (
               <tr key={key}>
                 <th scope="row">{key + 1}</th>
                 <td>{dynamicData}</td>
               </tr>))
           }
                </tbody>
              </Table>
            </div> :
            <Alert color="info" id="singleEventGuests">
          Event has no guests yet. Share it with friends.
            </Alert>
      }
      </div>
    );
  }
}


export default ViewSingleEvent;
