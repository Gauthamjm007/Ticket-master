import React, { Component } from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/userActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FilledInput from "@material-ui/core/FilledInput";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

  handleClickShowPassword = (e) => {
    this.setState({ showpassword: !this.state.showpassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          <FormControl variant="filled">
            <InputLabel htmlFor="component-email-outlined">Email</InputLabel>
            <FilledInput
              style={{ width: 250 }}
              id="component-email-outlined"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></FilledInput>{" "}
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
