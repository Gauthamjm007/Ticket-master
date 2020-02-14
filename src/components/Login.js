import React, { Component } from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/userActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showpassword: false
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePasswordShow = (e) => {
    this.setState({ showpassword: e.target.checked });
  };

  hanldeSubmit = (e) => {
    e.preventDefault();
    if (this.state.email !== 0) {
      const formData = {
        email: this.state.email,
        password: this.state.password
      };

      const redirect = () => {
        return this.props.history.push("/");
      };

      this.props.dispatch(startLogin(formData, redirect));
    }
  };
  render() {
    return (
      <div align="center">
        <br />
        <br />
        <Typography variant="h4">Login</Typography>
        <br />
        <br />
        <form>
          <TextField
            type="text"
            label="Email"
            name="email"
            variant="filled"
            onChange={this.handleChange}
          ></TextField>
          <br />
          <br />
          <TextField
            type={this.state.showpassword ? "text" : "password"}
            label="Password"
            name="password"
            variant="filled"
            onChange={this.handleChange}
          ></TextField>
          <br />
          <br />
          Show Password :
          <TextField
            type="checkbox"
            checked={this.state.showpassword}
            variant="filled"
            onChange={this.handlePasswordShow}
          ></TextField>
          <br />
          <br />
          <Button
            variant="contained"
            color="default"
            onClick={this.hanldeSubmit}
          >
            LOGIN
          </Button>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    users: state.users
  };
};

export default connect(mapStatetoProps)(Login);
