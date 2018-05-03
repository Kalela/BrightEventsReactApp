import React, { Component } from 'react';
import { Button, Modal, ModalHeader, CardLink,
  ModalBody, ModalFooter } from 'reactstrap';

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JWTtoken:"",
      delete_modal:false
    };
    this.deleteEvent = this.deleteEvent.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
      localStorage.getItem("Logged_in") && this.setState({
          current_user: localStorage.getItem("Logged_in")
      })
  }

  deleteEvent (eventname) {
    fetch(`http://localhost:5000/api/v2/events/${eventname}`, {
        method:'DELETE',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token': this.state.JWTtoken
        }
      })
      this.setState({
        delete_modal:!this.state.delete_modal
      })
     }

   toggleDeleteModal(){
     this.setState({
       delete_modal:!this.state.delete_modal
     })
   }

  render(){
    return(
      <div>
        <CardLink color="danger" onClick={this.toggleDeleteModal}>Delete Event</CardLink>
        <Modal isOpen={this.state.delete_modal} toggle={this.toggleDeleteModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleDeleteModal}>Delete {this.props.dynamicData.eventname}?</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {this.props.dynamicData.eventname} from your events?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.deleteEvent(this.props.dynamicData.eventname)}>Delete</Button>{' '}
            <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default DeleteModal;