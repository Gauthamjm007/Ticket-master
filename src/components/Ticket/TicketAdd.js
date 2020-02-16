import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { startAddTicket } from "../../actions/ticketsAction";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class TicketAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      customer: "",
      department: "",
      employees: "",
      priority: "",
      message: ""
    };
  }

  handleChangeDropDown = (e) => {
    console.log(e.target.value, "prop");
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = (e) => {
    e.preventDefault();
    const formData = {
      code: this.state.code,
      customer: this.state.customer,
      department: this.state.department,
      employees: [{ ["_id"]: this.state.employees }],
      isResolved: false,
      priority: this.state.priority,
      message: this.state.message
    };

    console.log(formData);

    const redirect = () => {
      return this.props.history.push("/users/tickets");
    };
    this.props.dispatch(startAddTicket(formData, redirect));
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props.employees, "this is empl");
    return (
      <div align="center">
        <br />
        <br />
        <Typography variant="h4">Add Ticket</Typography>
        <br />
        <br />
        <form>
          <TextField
            type="text"
            label="Code"
            value={this.state.code}
            name="code"
            onChange={this.handleChange}
            style={{ width: 410 }}
          />
          <br />
          <FormControl style={{ margin: 1, minWidth: 410 }}>
            <InputLabel htmlFor="grouped-select">Customer</InputLabel>
            <Select
              defaultValue=""
              name="customer"
              input={<Input id="grouped-select" value={this.state.customer} />}
              onClick={this.handleChangeDropDown}
            >
              {this.props.customers.map((ele) => {
                return (
                  <MenuItem value={ele._id} key={ele._id}>
                    {ele.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ margin: 1, minWidth: 410 }}>
            <InputLabel htmlFor="grouped-select">Department</InputLabel>
            <Select
              defaultValue=""
              name="department"
              input={
                <Input id="grouped-select" value={this.state.department} />
              }
              onClick={this.handleChangeDropDown}
            >
              {this.props.departments.map((ele) => {
                return (
                  <MenuItem value={ele._id} key={ele._id}>
                    {ele.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ margin: 1, minWidth: 410 }}>
            <InputLabel htmlFor="grouped-select">Employees</InputLabel>
            <Select
              defaultValue=""
              name="employees"
              input={<Input id="grouped-select" value={this.state.employees} />}
              onClick={this.handleChangeDropDown}
            >
              {this.props.employees.map((ele) => {
                return ele.department._id == this.state.department ? (
                  <MenuItem value={ele._id} key={ele._id}>
                    {ele.name}
                  </MenuItem>
                ) : (
                  "None"
                );
              })}
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ margin: 1, minWidth: 410 }}>
            <InputLabel htmlFor="grouped-select">Priority</InputLabel>
            <Select
              defaultValue=""
              name="priority"
              input={<Input id="grouped-select" />}
              onClick={this.handleChangeDropDown}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            type="text"
            label="Message"
            value={this.state.message}
            name="message"
            onChange={this.handleChange}
            style={{ width: 410 }}
          />
          <br />
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
    employees: state.employees,
    departments: state.departments,
    customers: state.customers
  };
};
export default connect(mapStateToProps)(TicketAdd);
