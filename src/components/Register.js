import React, { Component } from "react";
import { startRegisterUser } from "../actions/userActions";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      showpassword: false
    };
  }

  handlePasswordShow = (e) => {
    this.setState({ showpassword: e.target.checked });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      alert("sucessfully logged in ");
      const redirect = () => {
        return this.props.history.push("/users/login");
      };

      const formData = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      this.props.dispatch(startRegisterUser(formData, redirect));
    } else {
      alert("passwords do not match");
    }
  };
  render() {
    return (
      <div align="center">
        <Typography variant="h4">Register</Typography>
        <br />
        <br />
        <form>
          <TextField
            label="Name"
            type="text"
            name="username"
            variant="filled"
            onChange={this.handleChange}
          ></TextField>
          <br />
          <br />
          <TextField
            label="Email"
            type="text"
            variant="filled"
            name="email"
            onChange={this.handleChange}
          ></TextField>
          <br />
          <br />
          <TextField
            label="Password"
            type={this.state.showpassword ? "text" : "password"}
            variant="filled"
            name="password"
            onChange={this.handleChange}
          ></TextField>
          <br />
          <br />
          <TextField
            label="Confirm Password"
            type={this.state.showpassword ? "text" : "password"}
            variant="filled"
            name="confirmPassword"
            onChange={this.handleChange}
          ></TextField>
          <br />
          <br />
          Show Password
          <TextField
            type="checkbox"
            checked={this.state.showpassword}
            variant="filled"
            onChange={this.handlePasswordShow}
          ></TextField>
          <br />
          <br />
          <Button onClick={this.handleSubmit} variant="contained">
            REGISTER
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

export default connect(mapStatetoProps)(Register);
