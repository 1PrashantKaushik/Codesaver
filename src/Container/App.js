import React, { Component } from "react";
import { Grid, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  Input,
  Showingmodal,
  SimpleSnackbar,
  Maintextarea
} from "../Component/index";
import store from "../Redux/Redux";
import { connect } from "react-redux";

class App extends Component {
  state = {
    loading: true,
    snackbar: false,
    modal: false,
    Topic: "",
    snackbardata: "",
    showingdata: "",
    indexinarray: null
  };

  infoShowing = index => {
    let array = this.props.listanddata;
    let data = array[index].information;
    this.setState({ showingdata: data, loading: false, indexinarray: index });
  };

  modalShow = () => {
    if (this.state.Topic.trim().length) return this.setState({ modal: true });
    this.setState({ snackbardata: "Please Enter Detail", snackbar: true });
  };

  closeSnackbar = () => {
    this.setState({ snackbar: false });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  removeData = index => {
    store.dispatch({ type: "Remove_Data", payload: index });
  };

  loadingFunction = () => {
    this.setState({ loading: true });
  };

  saveAllData = data => {
    let userdata = {
      Topic: this.state.Topic,
      information: data
    };
    this.setState({ modal: false });
    if (this.state.Topic.trim().length) {
      store.dispatch({ type: "Add_Data", payload: userdata });
      this.setState({
        snackbar: true,
        snackbardata: "Your Data is saved Succesfully"
      });
    }
  };

  render() {
    let { snackbardata, loading, indexinarray } = this.state;
    let { listanddata } = this.props;
    return (
      <Grid fluid>
        <Row>
          {this.state.snackbar ? (
            <SimpleSnackbar
              snackbar={this.state.snackbar}
              closeSnackbar={this.closeSnackbar}
              snakbarmaterial={snackbardata}
            />
          ) : null}
          <Col className="middle" xs={3} sm={3} md={3} lg={3}>
            <Col
              className="top-header "
              xs={12}
              sm={12}
              md={12}
              lg={12}
              align="center"
            >
              <p>Your Work</p>
            </Col>
            <Input
              modalShow={this.modalShow}
              handleChange={this.handleChange}
            />{" "}
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              align="center"
              style={{ padding: "0px" }}
            >
              <ListGroup>
                {listanddata.map((item, index) => {
                  return (
                    <ListGroupItem
                      key={index}
                      onClick={e => this.infoShowing(index)}
                    >
                      {item.Topic}
                      <button
                        type="button"
                        class="btn btn-default btn-circle btn-lg"
                        style={{
                          border: "none",
                          float: "right",
                          padding: "0px"
                        }}
                        onClick={e => this.removeData(index)}
                      >
                        <img
                          src="https://png.icons8.com/small/20/black/delete-sign.png"
                          alt=""
                        />
                      </button>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Col>
          </Col>
          <Col className="right" xs={9} sm={9} md={9} lg={9}>
            <Col className="top-header" xs={12} sm={12} md={12} lg={12} />
            <div
              className="d-flex justify-content-center h-100"
              style={{ float: "right" }}
            >
              <div className="image_outer_container">
                <div className="green_icon" />
                <div className="image_inner_container">
                  <img
                    src="https://i0.wp.com/tricksmaze.com/wp-content/uploads/2017/04/Stylish-Girls-Profile-Pictures-36.jpg?resize=300%2C300&ssl=1"
                    alt=""
                    style={{ marginTop: "-33px" }}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <div className="loader">
                <span className="dot dot_1" />
                <span className="dot dot_2" />
                <span className="dot dot_3" />
                <span className="dot dot_4" />
              </div>
            ) : (
              <Maintextarea
                data={this.state.showingdata}
                index={indexinarray}
                loadingFunction={this.loadingFunction}
              />
            )}
          </Col>
          {this.state.modal ? (
            <Showingmodal
              handleClose={this.handleClose}
              saveAllData={this.saveAllData}
              data="Write Your Code Here"
            />
          ) : null}
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    listanddata: state.Maininfo
  };
};

export default connect(mapStateToProps)(App);