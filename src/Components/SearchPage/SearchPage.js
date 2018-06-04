import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input,
  Alert, Card, CardImg, CardText, CardBody, Button, ButtonGroup,
    CardTitle, CardSubtitle, CardDeck } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../Navbar/Navbar.js';
import DeleteModal from '../DashBoard/DeleteModal';
import EditModal from '../EditEvent/EditEvent.js';

import Tryouts from '../../img/event_stock_images/pexels-photo.jpg';

/**
Functional component that runs the search functionality of the app. It allows
a user to search for events.
*/
class SearchPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      events:[],
      current_user: "",
      category:"",
      JWTtoken:""
    };
    this.runSearch = this.runSearch.bind(this)
    this.handleDropdown = this.handleDropdown.bind(this)
    this.sendRSVP = this.sendRSVP.bind(this)
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
      localStorage.getItem("Logged_in") && this.setState({
          current_user: localStorage.getItem("Logged_in")
      })
  }


  /**
  perform an event search with user given input
  */
  runSearch(e) {
    e.preventDefault();
    const search_params = {
    q: this.refs.q.value,
    }
    fetch(`http://localhost:5000/api/v2/events?q=${search_params.q}`, {
        method:'GET',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token': this.state.JWTtoken
        }
    })
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
  Send rsvp to searched events
  */
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

  /**
  Handle the category dropdown for filtering events
  */
  handleDropdown(event) {
    this.setState({category: event.target.value});
  }

  render(){
    return(
      <div className="SearchPage" >
        < Navbar current_user={this.state.current_user} search_bar={false} />
        <div id="searchForm">
          <InputGroup>
            <input type="text" ref="q" className="form-control" id="eventname" required/>
            <InputGroupAddon addonType="prepend">
              <Button color="success" onClick={ this.runSearch } >Search Events</Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="form-group" id="searchCategory">
            <label className="control-label">Category</label>
            <select value={this.state.category} onChange={this.handleDropdown} id="categorySelect" className="form-control">
              <option value="Other">Other</option>
              <option value="Bridal">Bridal</option>
              <option value="Educational">Educational</option>
              <option value="Commemorative">Commemorative</option>
              <option value="Product Launch">Product Launch</option>
              <option value="Social">Social</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
        </div>
        <div id="searchEventsContainer" className="container">
        {  this.state.events ?
          <CardDeck>
          {
            this.state.events.map((dynamicData,key) =>
            <div key={dynamicData.id}>
              <Card>
                <CardBody>
                  <CardTitle>{dynamicData.eventname}</CardTitle>
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
          </CardDeck>:
          <Alert color="info">
            No events match your current search parameters.
          </Alert>
         }
        </div>
      </div>
    );
  }

};

export default SearchPage;
