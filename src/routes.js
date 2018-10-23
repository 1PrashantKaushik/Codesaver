import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Register } from "./Container";
import App from "./Container/App";

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/App" component={App} />
        </Switch>
      </BrowserRouter>
    );
  }
}
