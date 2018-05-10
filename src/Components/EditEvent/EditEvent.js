import React, { Component } from 'react';
import { Button, Modal, ModalHeader, CardLink,
  ModalBody, ModalFooter } from 'reactstrap';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JWTtoken:"",
      edit_modal:false
    };
    this.editEvent = this.editEvent.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
  }

  componentWillMount(){
      localStorage.getItem("BrightEventsJWTtoken") && this.setState({
          JWTtoken: localStorage.getItem("BrightEventsJWTtoken")
      })
      localStorage.getItem("Logged_in") && this.setState({
          current_user: localStorage.getItem("Logged_in")
      })
  }

  editEvent (eventname) {
    fetch(`http://localhost:5000/api/v2/events/${eventname}`, {
        method:'PUT',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json',
            'x-access-token': this.state.JWTtoken
        }
      })
      this.setState({
        edit_modal:!this.state.edit_modal
      })
     }

   toggleEditModal(){
     this.setState({
       edit_modal:!this.state.edit_modal
     })
   }

  render(){
    return(
      <div>
        <CardLink color="danger" onClick={this.toggleEditModal}>Edit Event</CardLink>
        <Modal isOpen={this.state.edit_modal} toggle={this.toggleEditModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleEditModal}>{this.props.dynamicData.eventname}</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>Password</Label>
              <Col sm={10}>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={2}>Category</Label>
              <Col sm={10}>
                <Input type="select" name="select" id="exampleSelect" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleText" sm={2}>Description</Label>
              <Col sm={10}>
                <Input type="textarea" name="text" id="exampleText" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2}>Event Image</Label>
              <Col sm={10}>
                <Input type="file" name="file" id="eventImageFile" />
                <FormText color="muted">
                  This is some placeholder block-level help text for the above input.
                  Its a bit lighter and easily wraps to a new line.
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
};

export default EditModal;
