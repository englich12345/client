import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap'
import { connect } from "react-redux";
import { USER } from '../../../redux/actions'
import userApi from '../../../api/userApi'
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      id:"",
      name: "",
      email: "",
      password: "",
      fullName: "",
      avatar: "",
      phoneNumber: "",
      roles: null,
      status: null
    }
  }
  isOpenToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }


  resetUser = () => {
    this.setState({
      name: "",
      email: "",
      password: "",
      fullName: "",
      avatar: "",
      phoneNumber: "",
      status: false,
      roles: false
    })
  }

  _onFieldChanged(e, field) {
    this.setState({ [field]: e.target.value })
  }

  avatarChange = (e) => {
    this.setState({ avatar: e.target.files });
  }

  onSave = () => {
    let { index } = this.props;
    let { sources} = this.props.listUser;
    let id = sources[index];
    let params = Object.assign({}, {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      fullName: this.state.fullName,
      avatar: this.state.avatar,
      phoneNumber: this.state.phoneNumber,
      status: this.state.status,
      roles: this.state.role,
    })
    if (index === undefined) {
      userApi.postUser(params).then(response => {
        this.props.getUser(response);
      })
    }
    else {
      userApi.updateUser(id, params).then(response => {

      })
    }
    this.props.toggle();
  }
  render() {
    const { toggle, isOpen, index } = this.props;
    const { name, email, password, phoneNumber, fullName, status, roles, avatar } = this.state;
    return (
      <div>
        <Modal isOpen={isOpen || false} toggle={toggle} className={this.props.className}>
          <ModalHeader toggle={toggle}>{(index === undefined) ? "Add" : "Update"} user</ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <div className="animated fadeIn">
                <Form>
                  <FormGroup row>
                    <Label sm={2}>Username</Label>
                    <Col sm={10}>
                      <Input name="name" value={name} placeholder="Username" onChange={(e) => this._onFieldChanged(e, 'name')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Email</Label>
                    <Col sm={10}>
                      <Input type="email" name="email" value={email} placeholder="Email" onChange={(e) => this._onFieldChanged(e, 'email')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Password</Label>
                    <Col sm={10}>
                      <Input type="password" name="password" value={password} placeholder="Password" onChange={(e) => this._onFieldChanged(e, 'password')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Full name</Label>
                    <Col sm={10}>
                      <Input name="fullname" value={fullName} placeholder="Fullname" onChange={(e) => this._onFieldChanged(e, 'fullName')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Avatar</Label>
                    <Col>
                      <Input type="file" name="avatar" value={avatar} onChange={this.avatarChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Phone number</Label>
                    <Col sm={10}>
                      <Input name="phone" placeholder="Phone number" value={phoneNumber} onChange={(e) => this._onFieldChanged(e, 'phoneNumber')} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Status</Label>
                    <Col sm={{ size: 10 }}>
                      <FormGroup check style={{ marginTop: "6px" }}>
                        <Input type="checkbox" checked={status} value={status} onChange={(e) => this._onFieldChanged(e, 'status')} />{' '}Admin
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Role</Label>
                    <Col sm={{ size: 10 }}>
                      <FormGroup check style={{ marginTop: "6px" }}>
                        <Input type="checkbox" checked={roles} value={roles} onChange={(e) => this._onFieldChanged(e, 'roles')} />{' '}Admin
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSave}>{(index === undefined) ? "Add" : "Update"}</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listUser: state.user.listUser
  };
};
const mapActionToProps = dispatch => {
  return {
    getUser: (params) =>dispatch({ type: USER.USER_GET_USER, payload: params })
  };
};
export default connect(mapStateToProps, mapActionToProps)(UserDetail);
