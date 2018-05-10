import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MyGuests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JWTtoken:"",
      myguests: []
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

  // componentDidMount(){
  //     this.fetchData();
  // }

  // fetchData = () => {
  //   fetch(`http://localhost:5000/api/v2/events/${eventname}/rsvp`, {
  //       method:'GET',
  //       headers:{
  //           'Accept':'application/json, text/plain, */*',
  //           'Content-type':'application/json',
  //           'x-access-token': this.state.JWTtoken
  //       }
  //     })
  //   .then(response => response.json())
  //   .then((findresp) => {
  //       this.setState({
  //         myguests:findresp.Guests
  //     })
  //   })
  //   .catch(error => console.log('parsing failed', error))
  // }
  render() {
    return (
      <Table>
       <thead>
         <tr>
           <th>#</th>
           <th>First Name</th>
           <th>Last Name</th>
           <th>Username</th>
         </tr>
       </thead>
       <tbody>
         {
           this.state.myguests.map((dynamicData,key) =>
         <tr>
           <th scope="row">1</th>
           <td>dynamicData</td>
           <td>Otto</td>
           <td>@mdo</td>
         </tr>
       )
         }
       </tbody>
     </Table>
    );
  }
};

export default MyGuests;
