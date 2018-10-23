import React, { Component } from "react";
import code from "../../images/code.png";
import { Link } from "react-router-dom";
import auth from "../../Validation";
import { userInfo } from "os";

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

  sendData = () => {
    let { errors, isValid } = { ...auth.validateLogin(this.state) };
    let { email, password } = this.state;
    this.setState({ errors, isValid }, () => {
      if (!isValid) {
        console.log("Errors in Fetch Call", errors);
      } else {
        const logindata = {
          email: email,
          password: password
        };

        let options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(logindata)
        };

        return fetch("http://localhost:8081/login", options)
          .then(res => {
            console.log("response==>", res);
            return res.json();
          })
          .then(data => {
            console.log("Login react---->", data);
            let { errors, isExist } = { ...data };
            this.setState({ errors });
            if (isExist) {
              localStorage.setItem("Userlogged", email);
              this.props.history.push("/App");
            }
            return data;
          })
          .catch(err => {
            console.log("error in fetch call===>", err);
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
