import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Input, Button, Col, Row, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { USER } from '../../../redux/actions'
import './User.css'
import UserDetail from "./UserDetail";
import userApi from "../../../api/userApi";
import '../../../App.css'
import Pagination from "../../components/Pagination/Pagination";
import { toast } from "react-toastify";
import {PAGINATION} from '../../../constant';
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      index: null,
      modal: false,
      idDelete: null,
      currentIndex: null
    }
  }

  componentDidMount() {
    this.props.GetList(PAGINATION);
  }

  selectPage = ({ selected }) => {
    PAGINATION.selected = selected || 0;
    PAGINATION.offset = Math.ceil(selected + 1);
    this.props.GetList(PAGINATION);
  }

  changeSearch = (e) => {
    this.setState({ keyword: e.target.value })
  }

  handleSearch = () => {
    this.props.getList(this.state.paginateParams)
  }

  handleSort = () => {

  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  AddUser = () => {
    this.setState({ index: undefined })
    this.toggle();
  }

  EditUser(e, index) {
    this.setState({ currentIndex: index });
    this.toggle();
  }

  DeleteToggle(e, id) {
    this.setState({ modal: !this.state.modal, idDelete: id })

  }

  DeleteUser = () => {
    let { idDelete } = this.state;
    userApi.RemoveUser(idDelete).then(response => {
      this.props.GetList(PAGINATION);
      toast.success("Remove user success!");
      this.DeleteToggle();
    })
  }

  render() {
    const { isOpen, currentIndex, modal, index } = this.state;
    let { listUser, totalPage } = this.props;
    const paginationSetting = {
      totalPage,
      selected: PAGINATION.selected
    }

    return (
      <div className="container-fluid mt-5">
        <div className="d-flex justify-content-center">
          <div className="col-lg-12 col-md-12">
            <Row className="d-flex justify-content-md-between justify-content-sm-start mb-3">
              <Col className="d-flex align-items-baseline mb-md-0 mb-2" xs="auto">
                <Button onClick={this.AddUser} className="btn btn-success" name="createProject" >Add new</Button>
              </Col>
              <form className="col-lg-5 col-md-6" onSubmit={this.search}>
                <div className="input-group">
                  <input type="text" className="form-control mr-2" name="search" onChange={this.handleChange} placeholder="Search" />
                  <button type="submit" className="btn btn-primary">Search</button>
                </div>
              </form>
            </Row>
            <UserDetail toggle={this.toggle} index={currentIndex} userDetail={listUser[currentIndex]} isOpen={isOpen} />
            <Table responsive striped className="table-hover table-bordered table-sort">
              <thead>
                <tr className="text text-center">
                  <th>#</th>
                  <th>Account</th>
                  <th>Email</th>
                  <th onClick={this.handleSort}>Fullname</th>
                  <th>Avatar</th>
                  <th>Roles</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  listUser && listUser.map((user, index) => {
                    return (
                      <tr key={index} className="text text-center">
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.fullName}</td>
                        <td>Pending</td>
                        <td>{
                          user.roles && user.roles.map((role) => {
                            return (
                              role.name
                            )
                          })
                        }</td>
                        <td><h5><span className={`badge ${user.status ? "badge-success" : "badge-danger"}`}>{user.status ? "Active" : "Inactive"}</span></h5></td>
                        <td width="25%">
                          <Button className="btn btn-success" onClick={(e) => this.EditUser(e, index)} style={{ marginRight: "7px" }}>
                            <span className="fa fa-pencil-square-o"></span>
                            <span><strong>Edit</strong></span>
                          </Button>
                          <Button className="btn btn-danger" onClick={(e) => this.DeleteToggle(e, user.id)} style={{ marginRight: "10px" }}>
                            <span className="fa fa-trash-o"></span>
                            <span><strong>Delete</strong></span>
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            {
              listUser &&
              <Row className="d-flex justify-content-md-between justify-content-sm-start mb-3">
                <Col className="d-flex align-items-baseline mb-md-0 mb-2" xs="auto">
                  <Label className="mr-2 text-nowrap">Size</Label>
                  <Input onChange={this.selectPageSize} bsSize="md" type="select" name="selectPageSize" id="selectPageSize">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </Input>
                </Col>
                <Col className="flex-grow-0">
                  {
                    (totalPage > 1) && <Pagination setting={paginationSetting} handleClick={this.selectPage} />
                  }
                </Col>
              </Row>
            }
          </div>
          <Modal isOpen={modal} toggle={(e) => this.DeleteToggle(e)} className={this.props.className}>
            <ModalHeader toggle={(e) => this.DeleteToggle(e)}>Delete User</ModalHeader>
            <ModalBody>
              Do you want to delete this user?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.DeleteUser}>Delete</Button>{' '}
              <Button color="secondary" onClick={(e) => this.DeleteToggle(e)}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listUser: state.user.listUser,
    totalPage: state.user.totalPage
  };
};

const mapActionToProps = dispatch => {
  return {
    GetList: (params) => dispatch({ type: USER.USER_REQUEST, payload: params })
  };
};

export default connect(mapStateToProps, mapActionToProps)(User);
