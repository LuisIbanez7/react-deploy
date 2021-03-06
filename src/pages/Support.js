import React, { Component } from 'react';
import '../index.css';
import { Form, Errors } from 'react-redux-form';
import { Button, Col, Row } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Support extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.postSupport(values.firstname, values.lastname, values.email, values.message);
    console.log("Current State is: " + JSON.stringify(values));
    alert("Your support message has been logged!\n" + JSON.stringify(values));
    this.props.resetSupportForm();
  }

  render() {


  return (
    <div className="container">
      <h2 id="title">This is a Very Supportive Title!!!</h2>
      <hr />
      <div className="row">
        <div className="col" id="smoothBorder">
          <p style={{textAlign: 'center'}}>We want to help you with your bank problems. Throw us a line, why don'cha?</p>
        </div>
      </div>
      <Form model="support" onSubmit={(values) => this.handleSubmit(values)}>
        <Row className="form-group">
          <Col xs={6}>
            <input type="text"
              model=".firstname"
              id="firstname"
              name="firstname"
              placeholder="First Name*"
              className="form-control"
              validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
            />
            <Errors
              className="text-danger"
              model=".firstname"
              show="touched"
              messages={{
                required: 'Required. ',
                minLength: 'Must be greater than 2 characters. ',
                maxLength: 'Must be shorter than 16 characters. '
              }}
            />
          </Col>
          <Col xs={6}>
            <input type="text"
              model=".lastname"
              id="lastname"
              name="lastname"
              placeholder="Last Name*"
              className="form-control"
              validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
            />
            <Errors
              className="text-danger"
              model=".lastname"
              show="touched"
              messages={{
                required: 'Required. ',
                minLength: 'Must be greater than 2 characters. ',
                maxLength: 'Must be shorter than 16 characters. '
              }}
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Col md={12}>
            <input type="text"
              model=".email"
              id="email"
              name="email"
              placeholder="Email Address*"
              className="form-control"
              validators={{required, minLength: minLength(3), maxLength: maxLength(15), validEmail}}
            />
            <Errors
              className="text-danger"
              model=".email"
              show="touched"
              messages={{
                required: 'Required. ',
                validEmail: 'Invalid Email Address. '
              }}
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Col md={12}>
            <input type="textarea"
              model=".message"
              id="message"
              className="form-control"
              name="message"
              placeholder="Enter message here*"
              rows="6"
              validators={{required, minLength: minLength(3), maxLength: maxLength(255)}}
            />
            <Errors
              className="text-danger"
              model=".message"
              show="touched"
              messages={{
                required: 'Required. ',
                minLength: 'Must be greater than 2 characters. ',
                maxLength: 'Must be shorter than 256 characters. '
              }}
            />
          </Col>
        </Row>

        <Row className="form-group">
          <Col xs={12}>
            <Button type="submit" block color="primary">Send Support</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}}

export default Support;
