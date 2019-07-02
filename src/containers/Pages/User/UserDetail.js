import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap'
import { connect } from "react-redux";
import { USER } from '../../../redux/actions'
import userApi from '../../../api/userApi'
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../constant';
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      id: "",
      name: "",
      email: "",
      password: "",
      fullName: "",
      avatar: "",
      phoneNumber: "",
      roles: ["44a042b7-e016-4496-b5ec-4afb3d4517cf"],
      status: false
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
      roles: [""]
    })
  }

  _onFieldChanged(e, field) {
    this.setState({ [field]: e.target.value })
  }

  avatarChange = (e) => {
    this.setState({ avatar: e.target.files });
  }
  changeStatus = () => {
    this.setState({ status: !this.state.status })
  }
  changeRole = (e) => {
    this.setState({ roles: e.target.value },()=>{
      console.log("role",this.state.roles)
    })
  }

  onSave = (index) => {
    let params = Object.assign({}, {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      fullName: this.state.fullName,
      avatar: this.state.avatar,
      phoneNumber: this.state.phoneNumber,
      status: this.state.status,
      roles: this.state.roles,
    })
    if (index === null) {
      userApi.CreateUser(params).then(response => {
        this.props.GetList(PAGINATION);
        this.resetUser();
        toast.success("Create user successfully!")
        console.log("roles", this.state.roles)
      }).catch(err => {
        toast.error("Can't create User ")
      })
    }
    // else {
    //   userApi.updateUser(id, params).then(response => {

    //   })
    // }
    this.props.toggle();
  }
  render() {
    const { toggle, isOpen, index, userDetail } = this.props;
    const { name, email, password, phoneNumber, fullName, status, roles, avatar } = this.state;
    return (
      <div>
        <Modal isOpen={isOpen || false} toggle={toggle} className={this.props.className}>
          <ModalHeader toggle={toggle}>{(index === null) ? "Add" : "Update"} User</ModalHeader>
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
                        <Input type="checkbox" checked={status ? status : false} value={status || false} onChange={this.changeStatus} />{' '}Active
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Role</Label>
                    <Col sm={{ size: 10 }}>
                      <FormGroup>
                        <Input type="select" value={roles[0]||false} name="select" onChange={this.changeRole}>
                          <option value="075c1072-92a2-4f99-ac11-bf985b13da6e">Admin</option>
                          <option value="44a042b7-e016-4496-b5ec-4afb3d4517cf">User</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.onSave(index)}>{(index === null) ? "Add" : "Update"}</Button>{' '}
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
    GetList: (params) => dispatch({ type: USER.USER_REQUEST, payload: params })
  };
};
export default connect(mapStateToProps, mapActionToProps)(UserDetail);
