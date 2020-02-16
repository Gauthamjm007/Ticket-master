import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { startAddEmployee } from "../../actions/employeesAction";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class EmployeesNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      department: ""
    };
  }

  handleChangeDropDown = (e) => {
    this.setState({ department: e.target.value });
  };
  handleClick = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      department: this.state.department
    };

    console.log(formData);

    const redirect = () => {
      return this.props.history.push("/users/employees");
    };
    this.props.dispatch(startAddEmployee(formData, redirect));
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
        <Typography variant="h4">Add Employee data</Typography>
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
          <FormControl style={{ margin: 1, minWidth: 210 }}>
            <InputLabel htmlFor="grouped-select">Department</InputLabel>
            <Select
              defaultValue=""
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
    employees: state.employees.find((ele) => String(ele._id) === String(id)),
    departments: state.departments
  };
};
export default connect(mapStateToProps)(EmployeesNew);
