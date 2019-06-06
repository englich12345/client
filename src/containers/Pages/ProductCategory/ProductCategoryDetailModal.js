import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap'
class ProductCategoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  isOpenToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onSave = () =>{
    this.props.toggle();
  }
  render() {
    const { toggle, isOpen } = this.props
    return (
      <div>
        <Modal isOpen={isOpen || false} toggle={toggle} className={this.props.className}>
          <ModalHeader toggle={toggle}>Add new user</ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <div className="animated fadeIn">
                <Form>
                  <Row>
                    <Col md="6" lg="6" xl="6">
                      <FormGroup>
                        <Label for="email">Name</Label>
                        <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md="6" lg="6" xl="6">
                      <FormGroup>
                        <Label>Email</Label>
                        <Input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" lg="6" xl="6">
                      <FormGroup>
                        <Label for="mobile">Mobile</Label>
                        <Input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md="6" lg="6" xl="6">
                      <FormGroup>
                        <Label for="gender">Gender</Label>
                        <Input type="text" name="gender" value={this.state.gender} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" lg="12" xl="12">
                      <FormGroup>
                        <Label for="avatar">Avatar</Label>
                        <Input type="file" name="avatar" value={this.state.avatar} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12" lg="12" xl="12">
                      <FormGroup>
                        <Label for="address">Birthday</Label>
                        <Input type="text" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" lg="12" xl="12">
                      <FormGroup>
                        <Label for="about">JoinDate</Label>
                        <Input type="text" name="joinDate" value={this.state.joinDate} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSave}>Add</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ProductCategoryDetail;
