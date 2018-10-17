import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";

export class Input extends Component {
  state = {
    value: ""
  };

  insertvalue = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.handleChange(this.state.value);
    });
  };

  show = () => {
    this.props.modalShow();

    this.setState({ value: "" });
  };

  render() {
    return (
      <Col xs={12} sm={12} md={12} lg={12} style={{ padding: "0px" }}>
        <div className="form-group">
          <span style={{ display: "inline-block" }}>
            <input
              type="text"
              className="form-control"
              id="usr"
              placeholder="Add Your Work"
              value={this.state.value}
              name="value"
              onChange={this.insertvalue}
            />
          </span>
          <Button
            bsStyle="primary"
            style={{
              backgroundColor: "rgb(99, 99, 247)",
              width: "26%"
            }}
            onClick={this.show}
          >
            Add
          </Button>
        </div>
      </Col>
    );
  }
}
