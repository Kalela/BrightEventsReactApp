import React, { Component } from 'react';
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
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditModal from '../EditEvent/EditEvent';
import DeleteModal from '../DashBoard/DeleteModal';
import Navbar from '../Navbar/Navbar';

import Tryouts from '../../img/event_stock_images/pexels-photo.jpg';

/**
Functional component to render all logged in users events from the database.
*/
class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      my_events: [],
      current_user: '',
      JWTtoken: '',
      page: 1,
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
    const user = jwt.decode(this.state.JWTtoken);
    fetch(`http://localhost:5000/api/v2/events/${user.public_id}?limit=1&page=${this.state.page}`, {
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
            my_events: findresp.MyEvents,
          });
        }
      })
      .catch(error => console.log('parsing failed', error));
  }
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
        <h3 id="eventsTitle"> My Events </h3>
        <ToastContainer />
        {
          this.state.my_events ?
            <div>
              <CardDeck>
                {
                this.state.my_events.map((dynamicData,key) =>
                (<div key={dynamicData.id}>
                  <Card id="eventCards">
                    <CardBody>
                      <CardTitle>{dynamicData.eventname}</CardTitle>
                      <CardSubtitle id="cardSubtitle">At {dynamicData.location}</CardSubtitle>
                      <CardSubtitle id="cardSubtitle">On {dynamicData.date.split('00')[0]}</CardSubtitle>
                      <CardSubtitle id="cardSubtitle">By {dynamicData.owner}</CardSubtitle>
                      <CardSubtitle id="cardSubtitle">Category: {dynamicData.category}</CardSubtitle>
                    </CardBody>
                    <img width="100%" src={Tryouts} alt="Card image cap" />
                    <CardBody>
                      <ButtonGroup>
                        <Button size="sm" onClick={() => this.sendRSVP(dynamicData)}>Send RSVP</Button>
                        <EditModal dynamicData={dynamicData}/>
                        <DeleteModal dynamicData={dynamicData}/>
                      </ButtonGroup>
                    </CardBody>
                  </Card>
                </div>)
                )
              }
              </CardDeck>
              <a href={`/${this.state.current_user}/createevent`} id="dashboardCreateEvent" className="btn btn-info navbar-btn">
                <i className="glyphicon glyphicon-align-left"></i>
                <span>Create an Event</span>
              </a>
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
            </div> :
            <div>
              <Alert color="info">
                No events yet.
              </Alert>
              <a href={`/${this.state.current_user}/createevent`} id="dashboardCreateEvent" className="btn btn-info navbar-btn">
                <i className="glyphicon glyphicon-align-left"></i>
                <span>Create an Event</span>
              </a>
            </div>
          }
      </div>
    );
  }
}

export default MyEvents;
