import React, { Component } from "react";
import code from "../../images/code.png";
import { Link } from "react-router-dom";
import auth from "../../Validation";
import { authentication } from "../../firebase";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: "",
    isValid: false
  };

  componentDidMount = () => {
    if (localStorage.getItem("Userlogged")) {
      this.props.history.push("/App");
    }
  };

  onHandleChange = e => {
    let { errors } = this.state;

    errors = {
      ...errors,
      [e.target.name]: ""
    };

    this.setState({ [e.target.name]: e.target.value, errors });
  };

  sendData = e => {
    let { errors, isValid } = { ...auth.validateLogin(this.state) };
    let { email, password } = this.state;
    const { history } = this.props;
    this.setState({ errors, isValid }, () => {
      if (!isValid) {
        console.log("Errors in Login Call", errors);
      } else {
        authentication
          .doSignInWithEmailAndPassword(email, password)
          .then(() => {
            localStorage.setItem("Userlogged", email);
          })
          .then(() => {
            history.push("/App");
          })
          .catch(error => {
            let errors = error;
            this.setState({ errors });
            console.log("Error Comes from Login Api ", errors);
          });
      }
    });
    e.preventDefault();
  };

  render() {
    let { errors } = this.state;
    return (
      <div id="login-overlay" className="modal-dialog login-div">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel">
              Login to Code Saver
            </h4>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-xs-6">
                <div className="well">
                  <div className="form-group">
                    <label htmlFor="username" className="control-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="email"
                      defaultValue="@gmail.com"
                      onChange={this.onHandleChange}
                    />
                    <span className="help-block" />
                    {errors && <p style={{ color: "red" }}>{errors.email}</p>}
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
                      placeholder="**********"
                      onChange={this.onHandleChange}
                      required
                    />
                    <span className="help-block" />
                    {errors && (
                      <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                  </div>
                  {errors && <p style={{ color: "red" }}>{errors.message}</p>}

                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="remember" id="remember" />
                      Remember login
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-block"
                    onClick={this.sendData}
                  >
                    Login
                  </button>
                  <Link to="/register" className="btn btn-default btn-block">
                    Register
                  </Link>
                </div>
              </div>
              <div className="col-xs-6">
                <img src={`${code}`} alt="code" className="loginimage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
