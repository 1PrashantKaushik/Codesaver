import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export class Showingmodal extends Component {
  state = {
    textareadata: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let { textareadata } = this.state;
    return (
      <React.Fragment>
        <Modal show onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your Code </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              rows="36"
              cols="68"
              name="textareadata"
              defaultValue={this.props.data}
              onChange={this.handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-primary"
              onClick={e => this.props.saveAllData(textareadata)}
            >
              Save
            </Button>
            <Button onClick={this.props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
