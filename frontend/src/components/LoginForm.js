import React, { Component } from "react";
import config from "../config";

class LoginForm extends Component {
  componentDidMount() {
    window.addEventListener("message", event => {
      const backendEndpoint = new URL(config.backend.endpoint);

      if (event.origin === backendEndpoint.origin) {
        const { type, payload } = event.data;

        switch (type) {
          case "AUTH_SUCCESS":
            return this.props.receiveAuthSuccess(payload);

          case "AUTH_FAILURE":
            return this.props.receiveAuthFailure(payload);

          default:
            console.error("Received unexpected event");
            return false;
        }
      }
    });
  }

  render() {
    const {user, loginGithub} = this.props;

    if (user) {
      return (<div>Congrats {user.name}, you are logged in!</div>);
    } else {
      return (
        <div className="login-form">
          <a href="#login" onClick={loginGithub}>Login with Github</a>
        </div>
      );
    }
  }
}

export default LoginForm;
