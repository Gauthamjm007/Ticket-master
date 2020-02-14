import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { startCustomerEdit } from "../../actions/customersActions";
import { connect } from "react-redux";

import React, { Component } from "react";

class CustomerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      num: 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: this.props.customers.name,
        email: this.props.customers.email,
        mobile: this.props.customers.mobile
      });
    }, 700);
  }

  handleClick = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile
    };

    const redirect = () => {
      return this.props.history.push("/users/customers");
    };
    this.props.dispatch(
      startCustomerEdit(formData, this.props.match.params.id, redirect)
    );
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props.customers, "this is customer");
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
            value={this.state.name}
            variant="filled"
            name="name"
            onChange={this.handleChange}
          />
          <br />
          <TextField
            type="text"
            label="Email"
            value={this.state.email}
            variant="filled"
            name="email"
            onChange={this.handleChange}
          />
          <br />
          <TextField
            type="text"
            label="Mobile"
            value={this.state.mobile}
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

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  console.log(id);
  return {
    customers: state.customers.find((ele) => String(ele._id) === String(id))
  };
};
export default connect(mapStateToProps)(CustomerEdit);
