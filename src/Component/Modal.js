import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import AceEditor from "react-ace";

export class Showingmodal extends Component {
  state = {
    textareadata: ""
  };

  onChange = e => {
    console.log("Its runnig ", e);
    this.setState({ textareadata: e });
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
            <AceEditor
              mode="javascript"
              theme="monokai"
              name="blah2"
              onLoad={this.onLoad}
              onChange={this.onChange}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={`${textareadata}`}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
            />
            {/* <textarea
              rows="36"
              cols="68"
              name="textareadata"
              defaultValue={this.props.data}
              onChange={this.handleChange}
            /> */}
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
