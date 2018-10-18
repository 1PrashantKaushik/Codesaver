import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { SimpleSnackbar } from "../Component";
import store from "../Redux/Redux";
import { connect } from "react-redux";
import AceEditor from "react-ace";

export class Maintextarea1 extends Component {
  state = {
    modal: false,
    snackbar: false,
    textarea: "",
    write: false
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.index != nextProps.index &&
      this.props.info[nextProps.index]
    ) {
      this.setState({
        textarea: this.props.info[nextProps.index].information
      });
    }
    // console.log("chal gya");
  }

  componentDidMount = () => {
    // console.log("Chala");
    this.setState({ textarea: this.props.info[this.props.index].information });
  };

  handleModal = () => {
    this.setState({ modal: true });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  onChange = e => {
    this.setState({ textarea: e, write: true });
  };

  closeSnackbar = () => {
    this.setState({ snackbar: false });
  };

  saveAllData = () => {
    const data = {
      index: this.props.index,
      information: this.state.textarea
    };
    store.dispatch({ type: "Edit_Data", payload: data });
    this.setState({ snackbar: true });
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        index: this.props.index,
        data: this.state.textarea
      })
    };
    fetch("http://localhost:8081/editlistitem", options)
      .then(res => {
        console.log("response==>", res);
        return res.json();
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log("error in fetch call===>", err);
      });
  };

  render() {
    let { snackbar, textarea, write } = this.state;
    let { index, info } = this.props;

    return (
      <React.Fragment>
        {info[index] !== undefined ? (
          <React.Fragment>
            <Button
              className="edit-button"
              onClick={this.saveAllData}
              style={{ marginLeft: "20px" }}
            >
              Save
            </Button>
            {textarea || write ? (
              <AceEditor
                className="showdata"
                mode="javascript"
                theme="monokai"
                name="blah2"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={`${textarea}`}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            ) : (
              <AceEditor
                className="showdata"
                mode="javascript"
                theme="monokai"
                name="blah2"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={`${info[index].information}`}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            )}

            {/* <textarea className="showdata" value={info[index].information} /> */}
            {snackbar ? (
              <SimpleSnackbar
                snackbar={snackbar}
                closeSnackbar={this.closeSnackbar}
                snakbarmaterial="Data Updated"
              />
            ) : null}
          </React.Fragment>
        ) : (
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
