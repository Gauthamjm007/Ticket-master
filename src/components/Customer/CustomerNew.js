import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { startAddCustomer } from "../../actions/customersActions";
import { connect } from "react-redux";

import React, { Component } from "react";

class CustomerNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: ""
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile
    };
    console.log(formData);
    const redirect = () => {
      return this.props.history.push("/users/customers");
    };
    this.props.dispatch(startAddCustomer(formData, redirect));
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div align="center">
        <br />
        <br />
        <Typography variant="h4">Add User</Typography>
        <br />
        <br />
        <form>
          <TextField
            type="text"
            label="Name"
            variant="filled"
            name="name"
            onChange={this.handleChange}
          />
          <br />
          <TextField
            type="text"
            label="Email"
            variant="filled"
            name="email"
            onChange={this.handleChange}
          />
          <br />
          <TextField
            type="text"
            label="Mobile"
            variant="filled"
            name="mobile"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Button variant="contained" onClick={this.handleClick}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers
  };
};
export default connect(mapStateToProps)(CustomerNew);
