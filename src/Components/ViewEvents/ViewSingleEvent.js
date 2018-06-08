import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardBody,
  Button,
  ButtonGroup,
  CardTitle,
  CardSubtitle,
  CardDeck,
  Table,
  Alert,
} from 'reactstrap';

import EditModal from '../EditEvent/EditEvent';
import DeleteModal from '../DashBoard/DeleteModal';
import Navbar from '../Navbar/Navbar';

import Tryouts from '../../img/event_stock_images/pexels-photo.jpg';

/**
Functional component to render a single event.
*/
class ViewSingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      JWTtoken: '',
      current_user: '',
      eventguests: [],
    };
    this.sendRSVP = this.sendRSVP.bind(this);
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
    fetch(`https://bright-events-api-.herokuapp.com/api/v2/events/${this.props.match.params.username}/${this.props.match.params.eventname}`, {
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
          event: findresp.Event,
        });
      });

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
  sendRSVP(dynamicData) {
    if (this.state.JWTtoken) {
      const owner = { owner: dynamicData.owner };
      fetch(`https://bright-events-api-.herokuapp.com/api/v2/events/${dynamicData.eventname}/rsvp`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          'x-access-token': this.state.JWTtoken,
        },
        body: JSON.stringify(owner),
      })
        .then(response => response.json())
        .then((findresp) => {
          toast.success(findresp.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
  }
  render() {
    return (
      <div className="container">
        <Navbar current_user={this.state.current_user} JWTtoken={this.state.JWTtoken} />
        <ToastContainer />
        <div>
          <CardDeck>
            {
            this.state.event.map((dynamicData, key) =>
            (
              <div key={key}>
                <Card>
                  <CardBody>
                    <CardTitle>{dynamicData.eventname}</CardTitle>
                    <CardSubtitle id="cardSubtitle">At {dynamicData.location}</CardSubtitle>
                    <CardSubtitle id="cardSubtitle">On {dynamicData.date.split('00')[0]}</CardSubtitle>
                    <CardSubtitle id="cardSubtitle">By {dynamicData.owner}</CardSubtitle>
                    <CardSubtitle id="cardSubtitle">Category: {dynamicData.category}</CardSubtitle>
                  </CardBody>
                  <img width="100%" src={Tryouts} alt="Card cap" />
                  <CardBody>
                    {
                   dynamicData.owner === this.state.current_user ?
                     <ButtonGroup id="eventButtons">
                       <Button size="sm" onClick={() => this.sendRSVP(dynamicData)}>Send RSVP</Button>
                       <EditModal dynamicData={dynamicData} />
                       <DeleteModal dynamicData={dynamicData} />
                     </ButtonGroup> :
                     <Button id="rsvpButton"size="sm" onClick={() => this.sendRSVP(dynamicData)}>Send RSVP</Button>
                }
                  </CardBody>
                </Card>
              </div>))
          }
          </CardDeck>
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
