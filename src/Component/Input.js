import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";

class Input extends Component {
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
              name="Topic"
              onChange={e => this.props.handleChange(e)}
            />
          </span>
          <Button
            bsStyle="primary"
            style={{
              backgroundColor: "rgb(99, 99, 247)",
              width: "28%"
            }}
            onClick={this.props.modalShow}
          >
            Add
          </Button>
        </div>
      </Col>
    );
  }
}

export default Input;
