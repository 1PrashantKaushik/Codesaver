import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Showingmodal, SimpleSnackbar } from "../Component";
import store from "../Redux/Redux";
import { connect } from "react-redux";

export class Maintextarea1 extends Component {
  state = {
    modal: false,
    snackbar: false
  };

  handleModal = () => {
    this.setState({ modal: true });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  closeSnackbar = () => {
    this.setState({ snackbar: false });
  };

  saveAllData = editeddata => {
    const data = {
      index: this.props.index,
      information: editeddata
    };
    store.dispatch({ type: "Edit_Data", payload: data });
    this.setState({ modal: false, snackbar: true });
  };

  render() {
    let { modal, snackbar } = this.state;
    let { index, info } = this.props;
    return (
      <React.Fragment>
        {info[index] !== undefined ? (
          <React.Fragment>
            <Button className="edit-button" onClick={this.handleModal}>
              Edit
            </Button>
            <textarea className="showdata" value={info[index].information} />
            {modal ? (
              <Showingmodal
                handleClose={this.handleClose}
                saveAllData={this.saveAllData}
                data={this.props.data}
              />
            ) : null}

            {snackbar ? (
              <SimpleSnackbar
                snackbar={snackbar}
                closeSnackbar={this.closeSnackbar}
                snakbarmaterial="Data Updated"
              />
            ) : null}
          </React.Fragment>
        ) : (
          <div className="loader">
            <span className="dot dot_1" />
            <span className="dot dot_2" />
            <span className="dot dot_3" />
            <span className="dot dot_4" />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    info: state.Maininfo
  };
};

export const Maintextarea = connect(mapStateToProps)(Maintextarea1);
