import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
} from 'reactstrap';

import DeleteModal from '../DashBoard/DeleteModal';
import EditModal from '../EditEvent/EditEvent';
import Navbar from '../Navbar/Navbar';

import Tryouts from '../../img/event_stock_images/pexels-photo.jpg';

/**
Functional component to render all public events in the database.
*/
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      JWTtoken: '',
      current_user: '',
      page: 1,
    };
    this.sendDeleteRSVP = this.sendDeleteRSVP.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.filterEvent = this.filterEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  componentWillMount() {
    localStorage.getItem('BrightEventsJWTtoken') && this.setState({
      JWTtoken: localStorage.getItem('BrightEventsJWTtoken'),
    });
    localStorage.getItem('Logged_in') && this.setState({
      current_user: localStorage.getItem('Logged_in'),
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  onDelete(name) {
    this.setState({ events: this.filterEvent(name) });
  }

  onEdit(event) {
    this.setState({ events: this.updateEvent(event) });
  }

  filterEvent(name) {
    return this.state.events.filter(event => event.eventname !== name);
  }

  updateEvent(updatedEvent) {
    return this.state.events.map((event) => {
      if (event.id === updatedEvent.id) {
        console.log("the event we've found", updatedEvent)
        return updatedEvent
      } else {
           return event
      }
    })
  }

  /**
  Fetch events data
  */
  fetchData() {
    fetch(`http://localhost:5000/api/v2/events?limit=10&page=${this.state.page}`)
      .then(response => response.json())
      .then((findresp) => {
        this.setState({
          events: findresp.Events,
        });
      })
      .catch(error => console.log('parsing failed', error));
  }

  /**
  Send rsvp to rendered event.
  */
  sendDeleteRSVP(dynamicData) {
    if (this.state.JWTtoken) {
      const owner = { owner: dynamicData.owner };
      fetch(`http://localhost:5000/api/v2/events/${dynamicData.eventname}/rsvp`, {
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
        <h3 id="eventsTitle"> All Events </h3>
        <ToastContainer />
        <CardDeck>
          {
            this.state.events.map((dynamicData, key) =>
            (
              <div key={key}>
                <Card id="eventCards">
                  <CardBody>
                    <CardTitle><Link to={`/${dynamicData.owner}/${dynamicData.eventname}`}>{dynamicData.eventname}</Link></CardTitle>
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
                         <Button size="sm" onClick={() => this.sendDeleteRSVP(dynamicData)}>Send RSVP</Button>
                         <EditModal onEdit={this.onEdit} dynamicData={dynamicData} />
                         <DeleteModal onDelete={this.onDelete} dynamicData={dynamicData} />
                       </ButtonGroup> :
                       <Button id="rsvpButton"size="sm" onClick={() => this.sendDeleteRSVP(dynamicData)}>Send RSVP</Button>
                  }
                  </CardBody>
                </Card>
              </div>))
          }
        </CardDeck>
      </div>
    );
  }
}

export default Events;
