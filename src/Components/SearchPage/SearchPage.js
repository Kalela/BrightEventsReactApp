import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavbarOptions from '../NavbarOptions/NavbarOptions';

class SearchPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      events:[],
      current_user: "",
      category:""
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

  runSearch(event) {
    event.preventDefault();
    const search_params = {
    q: this.refs.q.value,
    location: this.refs.location.value,
    category: this.state.category,
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

  handleDropdown(event) {
    this.setState({category: event.target.value});
  }

  render(){
    return(
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
              < NavbarOptions current_user={this.state.current_user}/>
              :
              ""
            }
          </div>
        </nav>
        <div id="searchForm">
          <form>
            <div className="col">
              <input type="text" className="form-control" ref="q" placeholder="Search..." />
            </div>
            <div className="form-row">
              <div className="col">
              <div className="form-group">
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
              <div className="col">
                <div className="form-group">
                  <label className="control-label">Location</label>
                  <input type="text" ref="location" className="form-control" placeholder="Location..." />
                </div>
                <button className="btn btn-info" id="sendRegister" onClick={this.runSearch}>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        <div id="searchEventsContainer">
        {  this.state.events ?
          <div className="card text-center">
          {
              this.state.events.map((dynamicData,key) =>
              <div>
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" href="#">{dynamicData.eventname}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">RSVPs</a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{dynamicData.eventname}</h5>
                  <p className="card-text">{dynamicData.location}</p>
                  <p className="card-text">{dynamicData.date}</p>
                  <p className="card-text">{dynamicData.category}</p>
                  <a href="#" className="btn btn-primary">View Event</a>
                  <a onClick={this.sendRSVP(dynamicData)} className="btn btn-danger">Send Rsvp</a>
                </div>
              </div>
              )
            }
            </div>:<h1>No search results</h1>
         }
        </div>
      </div>
    );
  }

};

export default SearchPage;
