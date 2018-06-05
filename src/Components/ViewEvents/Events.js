import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardImg, CardText, CardBody, Button, ButtonGroup,
  CardTitle, CardSubtitle, CardDeck } from 'reactstrap';

import DeleteModal from '../DashBoard/DeleteModal';
import EditModal from '../EditEvent/EditEvent.js';
import Navbar from '../Navbar/Navbar.js';
import Paginate from '../Pagination/paginate.js';

import Tryouts from '../../img/event_stock_images/pexels-photo.jpg';

/**
Functional component to render all public events in the database.
*/
class Events extends Component {
  constructor(props){
    super(props);
      this.state = {
          events: [],
          JWTtoken: "",
          current_user:""
      };
      this.sendDeleteRSVP = this.sendDeleteRSVP.bind(this);
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
      localStorage.getItem("Logged_in") && this.setState({
          current_user: localStorage.getItem("Logged_in")
      })
  }

  componentDidMount(){
      this.fetchData();
  }

  /**
  Fetch events data
  */
  fetchData = () => {
    fetch('http://localhost:5000/api/v2/events?limit=2&page=1')
    .then(response => response.json())
    .then((findresp) => {
        console.log(findresp.Events)
        this.setState({
            events:findresp.Events
        })
    })
      .catch(error => console.log('parsing failed', error))
  }

  /**
  Send rsvp to rendered event.
  */
  sendDeleteRSVP(dynamicData) {
    if(this.state.JWTtoken){
      const owner = {owner:dynamicData.owner}
      fetch(`http://localhost:5000/api/v2/events/${dynamicData.eventname}/rsvp`, {
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token': this.state.JWTtoken
        },
        body:JSON.stringify(owner)
      })
      .then(response => response.json())
      .then((findresp) => {
           toast.success(findresp.message,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
           })
      })
    }
  }

  render(){
    return (
        <div className="container">
          < Navbar current_user={this.state.current_user}/>
          <h3 id="eventsTitle"> All Events </h3>
          <ToastContainer />
          <CardDeck>
          {
            this.state.events.map((dynamicData,key) =>
            <div key={dynamicData.id}>
              <Card>
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
            </div>
            )
          }
          </CardDeck>
          <Paginate />
        </div>
    );
  }
};

export default Events;
