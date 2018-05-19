import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../Navbar/Navbar.js';

/**
Functional component that renders user's event's RSVPs/ Their event wishlist.
*/
class MyRSVPs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JWTtoken:"",
      myrsvps: [],
      current_user: ""
    };
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
  Fetch data for the component
  */
  fetchData = () => {
    fetch('http://localhost:5000/api/v2/events')
    .then(response => response.json())
    .then((findresp) => {
        console.log(findresp.Events)
        this.setState({
            myrsvps:findresp.Events
        })
    })
      .catch(error => console.log('parsing failed', error))
  }
  render() {
    return (
      <div className="container">
        <Navbar current_user={this.state.current_user} />
        <Table>
         <thead>
           <tr>
             <th>#</th>
             <th>Eventname</th>
             <th>Location</th>
             <th>Date</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <th scope="row">1</th>
             <td>Mark</td>
             <td>Otto</td>
             <td>@mdo</td>
           </tr>
         </tbody>
       </Table>
      </div>
    );
  }
};

export default MyRSVPs;
