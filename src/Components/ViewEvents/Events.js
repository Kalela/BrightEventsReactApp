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
  Pagination,
  PaginationItem,
  PaginationLink,
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
  }

  componentWillMount() {
    localStorage.getItem('BrightEventsJWTtoken') && this.setState({
      JWTtoken: localStorage.getItem('BrightEventsJWTtoken')
    });
    localStorage.getItem('Logged_in') && this.setState({
      current_user: localStorage.getItem('Logged_in')
    });
  }

  componentDidMount() {
    this.fetchData();
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

  selectPage(page) {
    switch (page) {
      case 1:
        this.setState({
          page: 1,
        });
        break;
      case 2:
        this.setState({
          page: 2,
        });
        break;
      case 3:
        this.setState({
          page: 3,
        });
        break;
      case 4:
        this.setState({
          page: 4,
        });
        break;
      case 5:
        this.setState({
          page: 5,
        });
        break;
      case 'next':
        this.setState({
          page: this.state.page + 1,
        });
        break;
      case 'prev':
        this.setState({
          page: this.state.page - 1,
        });
        break;
      default:
        break;
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
            (<div key={dynamicData.id}>
              <Card id="eventCards">
                <CardBody>
                  <CardTitle><a href={`/${dynamicData.owner}/${dynamicData.eventname}`}>{dynamicData.eventname}</a></CardTitle>
                  <CardSubtitle id="cardSubtitle">At {dynamicData.location}</CardSubtitle>
                  <CardSubtitle id="cardSubtitle">On {dynamicData.date.split('00')[0]}</CardSubtitle>
                  <CardSubtitle id="cardSubtitle">By <a href={`/${dynamicData.owner}/dashboard`}>{dynamicData.owner}</a></CardSubtitle>
                  <CardSubtitle id="cardSubtitle">Category: {dynamicData.category}</CardSubtitle>
                </CardBody>
                <img width="100%" src={Tryouts} alt="Card image cap" />
                <CardBody>
                  {
                     dynamicData.owner === this.state.current_user ?
                    <ButtonGroup id="eventButtons">
                      <Button size="sm" onClick={() => this.sendDeleteRSVP(dynamicData)}>Send RSVP</Button>
                      <EditModal dynamicData={dynamicData}/>
                      <DeleteModal dynamicData={dynamicData}/>
                    </ButtonGroup>:
                    <Button id="rsvpButton"size="sm" onClick={() => this.sendDeleteRSVP(dynamicData)}>Send RSVP</Button>
                  }
                </CardBody>
              </Card>
            </div>)
            )
          }
        </CardDeck>
        <div>
          <Pagination id="pagination" aria-label="Page navigation">
            <PaginationItem>
              <PaginationLink previous onClick={() => this.selectPage('prev')} />
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink onClick={() => this.selectPage(1)}>
                      1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => this.selectPage(2)}>
                      2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => this.selectPage(3)}>
                      3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => this.selectPage(4)}>
                      4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => this.selectPage(5)}>
                      5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next onClick={() => this.selectPage('next')} />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    );
  }
}

export default Events;
