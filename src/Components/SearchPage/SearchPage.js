import React, { Component } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Alert,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  CardTitle,
  CardSubtitle,
  CardDeck,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DeleteModal from '../DashBoard/DeleteModal';
import EditModal from '../EditEvent/EditEvent';
import NavbarOptions from '../NavbarOptions/NavbarOptions';

import Tryouts from '../../img/event_stock_images/pexels-photo.jpg';

/**
Functional component that runs the search functionality of the app. It allows
a user to search for events.
*/
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      current_user: '',
      JWTtoken: '',
      none: false,
    };
    this.runSearch = this.runSearch.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.sendRSVP = this.sendRSVP.bind(this);
  }

  componentWillMount() {
    localStorage.getItem('BrightEventsJWTtoken') && this.setState({
      JWTtoken: localStorage.getItem('BrightEventsJWTtoken')
    });
    localStorage.getItem('Logged_in') && this.setState({
      current_user: localStorage.getItem('Logged_in')
    });
  }


  /**
  perform an event search with user given input
  */
  runSearch(e) {
    e.preventDefault();
    const searchParams = {
      q: this.refs.q.value,
    };
    fetch(`http://localhost:5000/api/v2/search?q=${searchParams.q}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((findresp) => {
        this.setState({
          events: findresp.Events,
          none: false,
        });
        if (findresp.Events.length === 0) {
          this.setState({
            none: true,
          });
        }
      })
      .catch(error => console.log('parsing failed', error));
  }

  /**
  Send rsvp to searched events
  */
  sendRSVP(dynamicData) {
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

  /**
  Handle the category dropdown for filtering events
  */
  handleDropdown(event) {
    this.setState({ category: event.target.value });
  }

  render() {
    return (
      <div className="SearchPage" >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">BrightEvents</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            {
              this.state.current_user ?
                < NavbarOptions current_user={this.state.current_user} JWTtoken={this.state.JWTtoken} />
              :
              ''
            }
          </div>
        </nav>
        <ToastContainer />
        <div id="searchForm">
          <InputGroup>
            <input type="text" ref="q" className="form-control" id="eventname" required />
            <InputGroupAddon addonType="prepend">
              <Button color="success" onClick={this.runSearch} >Search Events</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div id="searchEventsContainer" className="container">
          {
          this.state.none === false ?
            <CardDeck>
              {
            this.state.events.map((dynamicData, key) =>
            (
              <div key={dynamicData.id}>
                <Card id="eventCards">
                  <CardBody>
                    <CardTitle><a href={`/${dynamicData.owner}/${dynamicData.eventname}`}>{dynamicData.eventname}</a></CardTitle>
                    <CardSubtitle id="cardSubtitle">At {dynamicData.location}</CardSubtitle>
                    <CardSubtitle id="cardSubtitle">On {dynamicData.date.split('00')[0]}</CardSubtitle>
                    <CardSubtitle id="cardSubtitle">By <a href={`/${dynamicData.owner}/dashboard`}>{dynamicData.owner}</a></CardSubtitle>
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
                       <Button id="rsvpButton" size="sm" onClick={() => this.sendRSVP(dynamicData)}>Send RSVP</Button>
                    }
                  </CardBody>
                </Card>
              </div>))
          }
            </CardDeck>
             :
            <Alert color="info" id="searchAlert">
            No events match your current search parameters.
            </Alert>
         }
        </div>
      </div>
    );
  }
}

export default SearchPage;
