import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { DEMO_SAGA } from "../../../redux/actions";
import Loading from "../../Common/Loading/Loading";
import './ReduxSaga.css';

class ReduxSaga extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { fetching, fetched, post } = this.props.demo;
    return (
      <div className = "animated fadeIn" >
        {
          !fetched && (
            <Row>
              <Col xs="12" sm="12" md="12">
                {
                  fetching && <Loading/>
                }
                {
                  !fetching && !fetched && (
                    <Button color="success" onClick={this.props.demoSaga.bind(this) }>Load products</Button>
                  )
                }
              </Col>
            </Row>
          )
        }
        <Row>
          {
            fetched && post && post.map((item) => {
              return (
                <Col xs="12" sm="6" md="3" key={item.id}>
                  <Card>
                    <CardHeader>
                      {item.name}
                    </CardHeader>
                    <CardBody>
                      {item.description}
                    </CardBody>
                    <CardFooter>
                      <div className="product-footer">
                        <span>Price: {item.price}</span>
                        <Button color="success">Add to cart</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              );
            })
          }
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  demo: state.demo
});
const mapDispatchToProps = dispatch => {
  return {
    demoSaga: () => {
      dispatch({ type: DEMO_SAGA.DEMO_REQUESTING })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSaga);
