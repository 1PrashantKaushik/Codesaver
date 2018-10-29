import React, { Component } from "react";
import code from "../../images/code.png";
import { Link } from "react-router-dom";
// import { registerapi } from "../../utils";
import auth from "../../Validation";
import { authentication } from "../../firebase";

export class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmpassword: "",
    errors: {},
    isValid: false
  };

  handleChange = e => {
    let { errors } = this.state;

    errors = {
      ...errors,
      [e.target.name]: ""
    };

    this.setState({ [e.target.name]: e.target.value, errors });
  };

  sendData = () => {
    let { errors, isValid } = { ...auth.validateSignup(this.state) };
    let { email, password } = this.state;
    let { history } = this.props;
    this.setState({ errors, isValid }, () => {
      if (!isValid) {
        console.log("Errors in Fetch Call", errors);
      } else {
        authentication
          .doCreateUserWithEmailAndPassword(email, password)
          .then(authUser => {
            history.push("/");
          })
          .catch(errors => {
            console.log("Error Comes", errors);
          });
      }
    });
  };

  render() {
    let { errors } = this.state;
    return (
      <div id="login-overlay" className="modal-dialog login-div">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel">
              Register on Code Saver
            </h4>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-xs-6">
                <div className="well">
                  <div className="form-group">
                    <label htmlFor="username" className="control-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="name"
                      placeholder="Enter Username"
                      onChange={this.handleChange}
                    />
                    {errors && <p style={{ color: "red" }}>{errors.name}</p>}
                    <span className="help-block" />
                    {}
                  </div>
                  <div>
                    <label htmlFor="username" className="control-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="@gmail.com"
                      onChange={this.handleChange}
                    />
                    {errors && <p style={{ color: "red" }}>{errors.email}</p>}
                    <span className="help-block" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="control-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      required
                      onChange={this.handleChange}
                    />
                    {errors && (
                      <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                    <span className="help-block" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="control-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="confirmpassword"
                      placeholder="Enter Password Again"
                      required
                      onChange={this.handleChange}
                    />
                    {errors && (
                      <p style={{ color: "red" }}>{errors.confirmpassword}</p>
                    )}
                    <span className="help-block" />
                  </div>

                  <div>
                    <label className="control-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      defaultValue="+91"
                      onChange={this.handleChange}
                    />
                    {errors && <p style={{ color: "red" }}>{errors.phone}</p>}
                    <span className="help-block" />
                  </div>

                  <button
                    className="btn btn-success btn-block"
                    onClick={this.sendData}
                  >
                    Register
                  </button>
                  <Link to="/" className="btn btn-default btn-block">
                    Login
                  </Link>
                </div>
              </div>
              <div className="col-xs-6">
                <img src={`${code}`} alt="code" className="loginimage" />
                {/* <img src={`${code1}`} alt="code" className="" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
