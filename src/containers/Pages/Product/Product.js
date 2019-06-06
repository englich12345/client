import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Input, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom'
import { USER } from '../../../redux/actions'
import Pagination from 'react-js-pagination'
import './Product.css'
import ProductDetail from "./ProductDetailModal";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginateParams: {
        limit: 10,
        pageRange: 5,
        offset: 1,
        keyword: '',
        sortName: 'created_On',
        isDesc: true
      },
      isOpen: false
    }
  }

  componentDidMount() {
    this.props.getList(this.state.paginateParams);
  }

  handlePageChange(pageNumber) {
    this.setState({ offset: pageNumber }, () => {
      this.props.getList(this.state.paginateParams)
    })
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

  render() {
    const { isOpen } = this.state;
    const { limit, pageRange, offset, keyword, sortName, isDesc } = this.state.paginateParams;
    let { sources, totalPages } = this.props.listUser;
    return (
      <div className="container-fluid mt-5">
        <div className="d-flex justify-content-center">
          <div className="col-lg-12 col-md-12">
            <Row className="d-flex justify-content-between mb-3">
              <Col className="d-flex align-items-baseline" xs="auto"></Col>
              <form className="col-lg-5 col-md-5" onSubmit={this.search}>
                <div className="input-group">
                  <input type="text" className="form-control mr-2" value={keyword} onChange={this.changeSearch} />
                  <button type="submit" className="btn btn-primary" onClick={this.handleSearch}>Search</button>
                </div>
              </form>
            </Row>
            <Row className="d-flex justify-content-between mb-3">
              <Col className="d-flex align-items-baseline" xs="auto">
                <button className="btn btn-primary" onClick={this.toggle}>Add User</button></Col>
              <Col className="col-lg-4 col-md-4" xs="auto"></Col>
            </Row>
            <ProductDetail toggle={this.toggle} isOpen={isOpen} />
            <Table striped className="table-hover table-bordered table-sort">
              <thead>
                <tr className="text text-center">
                  <th>#</th>
                  <th>Account</th>
                  <th onClick={this.handleSort}>Name</th>
                  <th>Avatar</th>
                  <th>Roles</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  sources && sources.map((user, i) => {
                    return (
                      <tr key={i} className="text text-center">
                        <th scope="row">{i}</th>
                        <td>{user.userName}</td>
                        <td>{user.fullName}</td>
                        <td>Pending</td>
                        <td>{
                          user.roles.map((role) => {
                            return (
                              role.name
                            )
                          })
                        }</td>
                        <td><h5><span className={`badge ${user.status ? "badge-success" : "badge-danger"}`}>{user.status ? "Active" : "Inactive"}</span></h5></td>
                        <td width="20%">
                          <Link to="/" className="btn btn-primary a-btn-slide-text">
                            <span className="fa fa-pencil-square-o"></span>
                            <span><strong>Edit</strong></span>
                          </Link>
                          <Link to="/" className="btn btn-danger a-btn-slide-text">
                            <span className="fa fa-trash-o"></span>
                            <span><strong>Delete</strong></span>
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <Row>
              <Col>
                <Input bsSize="md" type="select" name="selectPageSize" id="selectPageSize">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </Input>
              </Col>
              <Col className="col-lg-11 col-md-11"></Col>
            </Row>
            <div className="d-flex mt-2">
              {
                sources && (totalPages > 1) && <Pagination
                  activePage={offset}
                  itemsCountPerPage={limit}
                  pageRangeDisplayed={pageRange}
                  onChange={(pageNumber) => this.handlePageChange(pageNumber)}
                />
              }
            </div>
          </div>
        </div>
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
    getList: (params) => dispatch({ type: USER.USER_REQUEST }, params)
  };
};

export default connect(mapStateToProps, mapActionToProps)(Product);
