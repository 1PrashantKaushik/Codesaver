import React, { Component } from "react";
import store from "../Redux/Redux";
import { connect } from "react-redux";
import { Grid, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  Input,
  Showingmodal,
  SimpleSnackbar,
  Maintextarea
} from "../Component/index";
import pimage from "../images/1536301658152.JPEG";
import { authentication } from "../firebase";
import firebase, { auth } from "firebase";

class App extends Component {
  state = {
    loading: true,
    snackbar: false,
    modal: false,
    Topic: "",
    snackbardata: "",
    showingdata: "",
    indexinarray: null,
    inputdefinition: "",
    logout: false
  };

  componentWillMount = () => {
    if (localStorage.getItem("Userlogged") === null) {
      this.props.history.push("/");
    } else {
      let id = localStorage.getItem("Userlogged").split("@")[0];
      let firebasedata = {};
      authentication.retriveDataFromFirebase(id).then(res => {
        firebasedata = res;
        console.log(res, "response");
        store.dispatch({ type: "Gether_Data", payload: res });
      });
    }
  };

  infoShowing = index => {
    let array = this.props.listanddata;
    console.log("-----", index, array);
    let data = array[index].Information;
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

  handleChange = value => {
    this.setState({ Topic: value });
  };

  logout = () => {
    new Promise((resolve, reject) => {
      authentication.doSignOut();
      resolve(localStorage.removeItem("Userlogged"));
    }).then(res => {
      store.dispatch({ type: "CLEAR", payload: {} });
      this.props.history.push("/");
    });
  };

  removeData = index => {
    let id = localStorage.getItem("Userlogged").split("@")[0];
    authentication.deleteDataFromFirebase(id, index);
    store.dispatch({ type: "Remove_Data", payload: index });
    this.setState({ indexinarray: index + 1 });
  };

  loadingFunction = () => {
    this.setState({ loading: true });
  };

  saveAllData = data => {
    let userdata = {
      Topic: this.state.Topic,
      Information: data,
      id: localStorage.getItem("Userlogged").split("@")[0]
    };
    this.setState({ modal: false });
    if (this.state.Topic.trim().length) {
      store.dispatch({ type: "Add_Data", payload: userdata });
      this.setState({
        snackbar: true,
        snackbardata: "Your Data is saved Succesfully",
        Topic: ""
      });
    }
  };

  render() {
    let { snackbardata, loading, indexinarray } = this.state;
    let { listanddata } = this.props;
    console.log("List and data are", listanddata);
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
                        className="btn btn-default btn-circle btn-lg"
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
            <Col className="top-header" xs={12} sm={12} md={12} lg={12}>
              <h4 style={{ color: "white", display: "inline-block" }}>
                {localStorage.getItem("Userlogged")}
              </h4>
              <img
                src="https://png.icons8.com/metro/30/ffffff/exit.png"
                alt="Logout"
                onClick={this.logout}
                className="logout-button"
              />
            </Col>
            <div
              className="d-flex justify-content-center h-100"
              style={{ marginLeft: "81%" }}
            >
              <div className="image_outer_container">
                <div className="green_icon"> </div>
                <div className="image_inner_container">
                  <img
                    src={`${pimage}`}
                    alt=""
                    style={{ marginTop: "-33px" }}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <React.Fragment>
                <div className="loader">
                  <span className="dot dot_1" />
                  <span className="dot dot_2" />
                  <span className="dot dot_3" />
                  <span className="dot dot_4" />
                </div>
                <div className="para">
                  <p> Please Click On Any List Item</p>
                </div>
              </React.Fragment>
            ) : (
              <Maintextarea
                data={this.state.showingdata}
                index={indexinarray}
                loadingFunction={this.loadingFunction}
              />
            )}
            {/* <Button className="logout-button">Primary</Button> */}
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
