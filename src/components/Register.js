import React, { Component } from "react";
import { startRegisterUser } from "../actions/userActions";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FilledInput from "@material-ui/core/FilledInput";

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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickShowPassword = (e) => {
    this.setState({ showpassword: !this.state.showpassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        <br />
        <br />
        <Typography variant="h4">Register</Typography>
        <br />
        <br />
        <form>
          <FormControl variant="filled">
            <InputLabel htmlFor="component-name-outlined">Username</InputLabel>
            <FilledInput
              style={{ width: 250 }}
              id="component-name-outlined"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            ></FilledInput>
          </FormControl>
          <br />
          <br />
          <FormControl variant="filled">
            <InputLabel htmlFor="component-email-outlined">Email</InputLabel>
            <FilledInput
              style={{ width: 250 }}
              id="component-email-outlined"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></FilledInput>
          </FormControl>
          <br />
          <br />
          <FormControl variant="filled">
            <InputLabel htmlFor="component-email-outlined">Password</InputLabel>
            <FilledInput
              id="component-email-outlined"
              style={{ width: 250 }}
              type={this.state.showpassword ? "text" : "password"}
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showpassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <br />

          <FormControl variant="filled">
            <InputLabel htmlFor="component-email-outlined">
              Confirm Password
            </InputLabel>
            <FilledInput
              id="component-email-outlined"
              style={{ width: 250 }}
              type={this.state.showpassword ? "text" : "password"}
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showpassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
