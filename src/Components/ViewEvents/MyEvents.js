import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, CardDeck } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditModal from '../EditEvent/EditEvent.js';
import DeleteModal from '../DashBoard/DeleteModal.js';
import Navbar from '../Navbar/Navbar.js';

class MyEvents extends Component{
    constructor(props){
      super(props);
      this.state = {
          my_events: [],
          current_user: ""
      };
    }
    render(){
      return (
        <div className="container">
        < Navbar current_user={this.state.current_user}/>
        <ToastContainer />
          <CardDeck>
            {
              this.state.my_events.map((dynamicData,key) =>
              <div key={dynamicData.id}>
                <Card>
                  <CardBody>
                    <CardTitle>{dynamicData.eventname}</CardTitle>
                    <CardSubtitle id="cardSubtitle">At {dynamicData.location}</CardSubtitle>
                    <CardSubtitle id="cardSubtitle">On {dynamicData.date}</CardSubtitle>
                    <CardSubtitle id="cardSubtitle">Category: {dynamicData.category}</CardSubtitle>
                  </CardBody>
                  <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                  <CardBody>
                    <CardLink onClick={() => this.sendRSVP(dynamicData)}>Send RSVP</CardLink>
                    <EditModal dynamicData={dynamicData}/>
                    <DeleteModal dynamicData={dynamicData}/>
                  </CardBody>
                </Card>
              </div>
              )
            }
            </CardDeck>
        </div>
      )
    }
  }

export default MyEvents;
