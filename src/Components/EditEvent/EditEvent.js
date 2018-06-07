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
      category: 'Other',
      event: [],
    };
    this.editEvent = this.editEvent.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  componentWillMount() {
    localStorage.getItem('BrightEventsJWTtoken') && this.setState({
      JWTtoken: localStorage.getItem('BrightEventsJWTtoken')
    });
      localStorage.getItem('Logged_in') && this.setState({
      current_user: localStorage.getItem('Logged_in')
    });
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/v2/events/${this.state.current_user}/${this.props.dynamicData.eventname}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': this.state.JWTtoken,
      },
    })
      .then(response => response.json())
      .then((findresp) => {
        this.setState({ event: findresp.Event });
      });
  }

  /**
  Collect data from the user and edit a selected event
  */
  editEvent(eventName) {
    const editEvent = {
      event_name: this.refs.eventname.value,
      location: this.refs.location.value,
      date: this.refs.date.value,
      category: this.state.category,
    };
    console.log(editEvent)
    console.log(this.state.category)
    fetch(`http://localhost:5000/api/v2/events/${eventName}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': this.state.JWTtoken,
      },
      body: JSON.stringify(editEvent),
    })
      .then()
      .then(() => {
        const { onEdit } = this.props;
        this.setState({
          edit_modal: !this.state.edit_modal,
        }, () => onEdit(editEvent));
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

  handleDropdown(event) {
    this.setState({ category: event.target.value });
  }

  render() {
    console.log(this.state.category)
    return (
      <div>
        <Button size="sm" color="light" onClick={this.toggleEditModal}>Edit Event</Button>
        <Modal isOpen={this.state.edit_modal} toggle={this.toggleEditModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleEditModal}>{this.props.dynamicData.eventname}</ModalHeader>
          <ModalBody>
            {
            this.state.event.map((dynamicData, key) =>
            (
              <Form key={dynamicData.id}>
                <FormGroup row>
                  <Label sm={2}>Eventname</Label>
                  {
                    <Col sm={10}>
                      <input defaultValue={dynamicData.eventname} className="form-control" type="text" ref="eventname" placeholder="Edit event name" />
                    </Col>
                }
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Location</Label>
                  <Col sm={10}>
                    <input defaultValue={dynamicData.location} className="form-control" type="text" ref="location" placeholder="Edit event location" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Date</Label>
                  <Col sm={10}>
                    <input type="date" defaultValue={dynamicData.date} className="form-control" ref="date" placeholder="Edit event date" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Category</Label>
                  <select defaultValue={dynamicData.category} onChange={this.handleDropdown} id="categorySelectEdit" className="form-control">
                    <option value="Other">Other</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Educational">Educational</option>
                    <option value="Commemorative">Commemorative</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Social">Social</option>
                    <option value="VIP">VIP</option>
                  </select>
                </FormGroup>
              </Form>))
          }
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
