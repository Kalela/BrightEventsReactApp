import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';


/**
Component for event edit modal
*/
class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JWTtoken: '',
      edit_modal: false,
    };
    this.editEvent = this.editEvent.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  componentWillMount() {
    localStorage.getItem("BrightEventsJWTtoken") && this.setState({
      JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
    });
      localStorage.getItem("Logged_in") && this.setState({
      current_user: localStorage.getItem("Logged_in")
    });
  }

  /**
  Collect data from the user and edit a selected event
  */
  editEvent(eventName) {
    const editEvent = {
      eventname: this.refs.eventname.value,
      location: this.refs.location.value,
      date: this.refs.date.value,
      category: this.state.category,
    };
    fetch(`http://localhost:5000/api/v2/events/${eventName}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': this.state.JWTtoken,
      },
      body: JSON.stringify(editEvent),
    });
    this.setState({
      edit_modal: !this.state.edit_modal,
    });
  }

  /**
   Change state to pop up and down the edit modal
   */
  toggleEditModal() {
    this.setState({
      edit_modal: !this.state.edit_modal,
    });
  }

  render() {
    return (
      <div>
        <Button size="sm" color="light" onClick={this.toggleEditModal}>Edit Event</Button>
        <Modal isOpen={this.state.edit_modal} toggle={this.toggleEditModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleEditModal}>{this.props.dynamicData.eventname}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label sm={2}>Eventname</Label>
                <Col sm={10}>
                  <Input type="text" ref="eventname" placeholder="Edit event name" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Location</Label>
                <Col sm={10}>
                  <Input type="text" ref="location" placeholder="Edit event location" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Date</Label>
                <Col sm={10}>
                  <Input type="date" ref="date" placeholder="Edit event date" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Category</Label>
                <select value={this.state.category} onChange={this.handleDropdown} id="categorySelect" className="form-control">
                  <option value="Other">Other</option>
                  <option value="Bridal">Bridal</option>
                  <option value="Educational">Educational</option>
                  <option value="Commemorative">Commemorative</option>
                  <option value="Product Launch">Product Launch</option>
                  <option value="Social">Social</option>
                  <option value="VIP">VIP</option>
                </select>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={2}>Description</Label>
                <Col sm={10}>
                  <Input type="textarea" ref="description" placeholder="Edit event description" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleFile" sm={2}>Event Image</Label>
                <Col sm={10}>
                  <Input type="file" ref="file" id="eventImageFile" />
                  <FormText color="muted">
                  Add an image for the event.
                  </FormText>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.editEvent(this.props.dynamicData.eventname)}>Edit</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
