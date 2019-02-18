import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jsonwebtoken';
import {
  Card,
  CardBody,
  Button,
  ButtonGroup,
  CardTitle,
  CardSubtitle,
  CardDeck,
  Alert,
} from 'reactstrap';


import DeleteModal from '../DashBoard/DeleteModal';
import EditModal from '../EditEvent/EditEvent';
import Tryouts from '../../img/event_stock_images/pexels-photo.jpg';

class EventCard extends Component {
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
    if (this.props.type === 'allevents') {
      fetch(`https://brighteventsapinowlive.herokuapp.com/api/v2/events?limit=10&page=${this.state.page}`)
        .then(response => response.json())
        .then((findresp) => {
          this.setState({
            events: findresp.Events,
          });
        })
        .catch(error => console.log('parsing failed', error));
    } else if (this.props.type === 'myevents') {
      const user = jwt.decode(this.state.JWTtoken);
      fetch(`https://bright-events-api-.herokuapp.com/api/v2/events/${user.public_id}?limit=1&page=${this.state.page}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          'x-access-token': this.state.JWTtoken,
        },
      })
        .then(response => response.json())
        .then((findresp) => {
          if (user.public_id) {
            this.setState({
              events: findresp.MyEvents,
            });
          }
        })
        .catch(error => console.log('parsing failed', error));
    } else if (this.props.type === 'singleevent') {
      fetch(`https://brighteventsapinowlive.herokuapp.com/api/v2/events/${this.props.username}/${this.props.eventname}`, {
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
            events: findresp.Event,
          });
        });
    }
  }

  onDelete(name) {
    this.setState({ events: this.filterEvent(name) });
  }

  onEdit(event) {
    this.setState({ events: this.updateEvent(event) });
  }

  /**
  Send rsvp to rendered event.
  */
  sendDeleteRSVP(dynamicData) {
    if (this.state.JWTtoken) {
      const owner = { owner: dynamicData.owner };
      console.log(this.state.JWTtoken)
      fetch(`https://brighteventsapinowlive.herokuapp.com/api/v2/events/${dynamicData.eventname}/rsvp`, {
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
  render() {
    return (
      <div>
        {
        this.state.events ?
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
          </CardDeck> :
          <div>
            <Alert color="info">
              No events yet.
            </Alert>
          </div>
    }
      </div>
    );
  }
}

export default EventCard;
