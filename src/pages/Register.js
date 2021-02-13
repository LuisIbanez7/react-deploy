import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { Button, Label, Col, Row } from 'reactstrap';
import { addUser } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { Redirect, withRouter }from 'react-router-dom';
import { baseLocal } from '../shared/baseUrl';
import { postUser } from '../redux/ActionCreators';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const mapDispatchToProps = (dispatch) => ({
  addUser: () => dispatch(addUser())
});


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      accountOpened: new Date(),
      dob: '',
      ssn: null
    }
//    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
//        event.preventDefault()

        const data = this.state;
        alert(JSON.stringify(data));
        const exists = await axios.get(baseLocal + 'Users' + '/' + data.userName + '/valid');
        if(exists.data === true){
            alert("Username taken!");
        } else {
            data.dob = new Date(data.dob);
            axios.post(baseLocal + 'Users', data);
            alert(JSON.stringify(data));
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }


  render() {


  return(
    <div className="container col-6">
      <h2 id="title">One Step Closer to a Merit America</h2>
      <hr />
      <div id="inputBox">
      <Form model="register" onSubmit={this.handleSubmit}>
        <Row className="form-group" xs={6}>
          <Col xs={12}>
            <Control.text
              model=".firstName"
              id="firstName"
              name="firstName"
              placeholder="First Name*"
              className="form-control"
              validators={{required}}
              onChange={this.handleInputChange}
            />
            <Errors
              className="text-danger"
              model=".firstName"
              show="touched"
              messages={{
                required: 'Required. ',
                minLength: 'Must be greater than 2 characters. ',
              }}
            />
          </Col>
        </Row>
        <Row className="form-group" xs={6}>
          <Col xs={12}>
            <Control.text
              model=".middleName"
              id="middleName"
              name="middleName"
              placeholder="Middle Name"
              className="form-control"
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row className="form-group" xs={6}>
          <Col xs={12}>
            <Control.text
              model=".lastName"
              id="lastName"
              name="lastName"
              placeholder="Last Name*"
              className="form-control"
              validators={{required}}
              onChange={this.handleInputChange}
            />
            <Errors
              className="text-danger"
              model=".lastName"
              show="touched"
              messages={{
                required: 'Required. ',
                minLength: 'Must be greater than 2 characters. ',
              }}
            />
          </Col>
        </Row>
        <Row className="form-group" xs={6}>
          <Col xs={12}>
            <Control.text
              type='date'
              model=".dob"
              id="dob"
              name="dob"
              placeholder="Date of Birth*"
              className="form-control"
              validators={{required}}
              onChange={this.handleInputChange}
            />
            <Errors
              className="text-danger"
              model=".dob"
              show="touched"
              messages={{
                required: 'Required. ',
              }}
            />
          </Col>
        </Row>
        <Row className="form-group" xs={6}>
          <Col xs={12}>
            <Control.text
              type='number'
              model=".ssn"
              id="ssn"
              name="ssn"
              placeholder="SSN*"
              className="form-control"
              validators={{required}}
              onChange={this.handleInputChange}
            />
            <Errors
              className="text-danger"
              model=".ssn"
              show="touched"
              messages={{
                required: 'Required. ',
              }}
            />
          </Col>
        </Row>
        <Row className="form-group" xs={6}>
          <Col xs={12}>
            <Control.text
              model=".userName"
              id="userName"
              name="userName"
              placeholder="Username*"
              className="form-control"
              validators={{required}}
              onChange={this.handleInputChange}
            />
            <Errors
              className="text-danger"
              model=".userName"
              show="touched"
              messages={{
                required: 'Required. ',
                minLength: 'Must be greater than 2 characters. ',
              }}
            />
          </Col>
        </Row>
        <Row className="form-group" xs={6}>
          <Col xs={12}>
            <Control.text
              model=".email"
              id="email"
              name="email"
              placeholder="Email*"
              className="form-control"
              validators={{required}}
              onChange={this.handleInputChange}
            />
            <Errors
              className="text-danger"
              model=".email"
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
          <Col xs={12}>
            <Control.password
              model=".password"
              id="password"
              className="form-control"
              name="password"
              placeholder="Password*"
              validators={{required}}
              onChange={this.handleInputChange}
            />
            <Errors
              className="text-danger"
              model=".password"
              show="touched"
              messages={{
                required: 'Required. ',
                minLength: 'Must be greater than 2 characters. ',
                maxLength: 'Must be shorter than 17 characters. '
              }}
            />
          </Col>
        </Row>

        <Row className="form-group">
          <Col xs={12}>
            <Button type="submit" block color="primary">Register</Button>
          </Col>
        </Row>
      </Form>
      </div>
    </div>
    )
  }
}

export default withRouter(connect(mapDispatchToProps)(Register));
