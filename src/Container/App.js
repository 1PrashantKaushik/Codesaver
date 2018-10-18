import React, { Component } from "react";
import { Grid, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  Input,
  Showingmodal,
  SimpleSnackbar,
  Maintextarea
} from "../Component/index";
import pimage from "../images/1536301658152.JPEG";
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
    indexinarray: null,
    inputdefinition: ""
  };

  componentWillMount = () => {
    let options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    console.log("options", options);
    new Promise((resolve, reject) => {
      return fetch("http://localhost:8081/retrievedata", options)
        .then(res => {
          console.log("response==>", res);
          return res.json();
        })
        .then(data => {
          console.log("data return in then react---->", data);
          store.dispatch({ type: "Gether_Data", payload: data });
          return data;
        })
        .catch(err => {
          console.log("error in fetch call===>", err);
        });
    }).catch(err => {
      console.log("Errors from promise in app.js", err);
    });
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

  handleChange = value => {
    this.setState({ Topic: value });
  };

  removeData = index => {
    import("material-ui/styles");
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ index: index })
    };

    new Promise((resolve, reject) => {
      return fetch("http://localhost:8081/deletelistitem", options)
        .then(res => {
          console.log("response==>", res);
          this.setState({ indexinarray: index + 1 });
          return res.json();
        })
        .then(data => {
          console.log("data return in then react---->", data);
          store.dispatch({ type: "Remove_Data", payload: index });
          return data;
        })
        .catch(err => {
          console.log("error in fetch call===>", err);
        });
    }).catch(err => {
      console.log("Errors from promise in app.js", err);
    });
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
