import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, CardDeck } from 'reactstrap';

import NavbarOptions from '../NavbarOptions/NavbarOptions';
import DeleteModal from '../DashBoard/DeleteModal';

class Events extends Component {
  constructor(props){
    super(props);
      this.state = {
          events: [],
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
      this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:5000/api/v2/events')
    .then(response => response.json())
    .then((findresp) => {
        console.log(findresp.Events)
        this.setState({
            events:findresp.Events
        })
    })
      .catch(error => console.log('parsing failed', error))
  }
  sendRSVP(dynamicData) {
    if(this.state.JWTtoken){
      fetch(`http://localhost:5000/api/v2/events/${dynamicData.eventname}/rsvp`), {
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token': this.state.JWTtoken
        },
        body:JSON.stringify(dynamicData.owner)
      }
    }
  }

  render(){
    return (
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">BrightEvents</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search Events" aria-label="Search" />
                <a href= "/search">
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </a>
              </form>
              {
                this.state.current_user ?
                < NavbarOptions current_user={this.state.current_user}/>
                :
                ""
              }
            </div>
          </nav>
          <CardDeck>
          {
            this.state.events.map((dynamicData,key) =>
            <div key={dynamicData.eventname}>
              <Card>
                <CardBody>
                  <CardTitle>{dynamicData.eventname}</CardTitle>
                  <CardSubtitle>At {dynamicData.location}</CardSubtitle>
                  <CardSubtitle>On {dynamicData.date}</CardSubtitle>
                  <CardSubtitle>Category: {dynamicData.category}</CardSubtitle>
                </CardBody>
                <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                  <CardLink onClick={() => this.sendRSVP(dynamicData)}>Send RSVP</CardLink>
                  <CardLink onClick={() => this.editEvent(dynamicData)}>Edit Event</CardLink>
                  <DeleteModal dynamicData={dynamicData}/>
                </CardBody>
              </Card>
            </div>
            )
          }
          </CardDeck>
        </div>
    );
  }
};

export default Events;
