import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardImg, CardText, CardBody, Button, ButtonGroup,
  CardTitle, CardSubtitle, CardDeck, Alert } from 'reactstrap';

import NavbarOptions from '../NavbarOptions/NavbarOptions';
import EditModal from '../EditEvent/EditEvent.js';
import DeleteModal from '../DashBoard/DeleteModal.js';
import Navbar from '../Navbar/Navbar.js';

import Tryouts from '../../img/event_stock_images/pexels-photo.jpg';

/**
Functional component to render a single event.
*/
class ViewSingleEvent extends Component {
  constructor(props){
    super(props);
      this.state = {
          event: [],
          JWTtoken: "",
          current_user:""
      };
      this.sendRSVP = this.sendRSVP.bind(this);
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
    console.log(this.props.match.params.username)
    fetch(`http://localhost:5000/api/v2/events/${this.props.match.params.username}/${this.props.match.params.eventname}`, {
      method:'GET',
      headers:{
          'Accept':'application/json, text/plain, */*',
          'Content-type':'application/json',
          'x-access-token': this.state.JWTtoken
      }
    })
    .then(response => response.json())
    .then((findresp) => {
      this.setState({
        event: findresp.Event
      })
    })
  }
  sendRSVP(dynamicData) {
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
  render() {
    return(
      <div className="container">
        < Navbar current_user={this.state.current_user}/>
        <ToastContainer />
        <div>
          <CardDeck>
          {
            this.state.event.map((dynamicData,key) =>
            <div key={dynamicData.id}>
              <Card>
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
            </div>
            )
          }
          </CardDeck>
          <a href={`/${this.state.current_user}/createevent`} id="dashboardCreateEvent" className="btn btn-info navbar-btn">
            <i className="glyphicon glyphicon-align-left"></i>
            <span>Create an Event</span>
          </a>
        </div>
      </div>
    );
  }
};


export default ViewSingleEvent;
