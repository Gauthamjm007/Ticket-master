import React, { Component } from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { startTicketEdit } from "../../actions/ticketsAction";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class TicketEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      customer: "",
      department: "",
      employees: [],
      priority: "",
      message: "",
      selected: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        code: this.props.tickets.code,
        customer: this.props.tickets.customer,
        department: this.props.tickets.department,
        employees: this.props.tickets.employees.map((ele) => {
          return this.props.employees.find((ele1) => ele1._id === ele._id).name;
        }),
        priority: this.props.tickets.priority,
        message: this.props.tickets.message
      });
    }, 2000);
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
      employees: this.state.selected.map((ele) => {
        return { _id: ele };
      }),
      isResolved: false,
      priority: this.state.priority,
      message: this.state.message
    };

    console.log(formData);

    const redirect = () => {
      return this.props.history.push("/users/tickets");
    };
    this.props.dispatch(
      startTicketEdit(formData, this.props.match.params.id, redirect)
    );
  };

  handleChange = (e) => {
    console.log(this.state.selected, "selected");
    const employeeId = this.state.employees.map((ele) => {
      return this.props.employees.find((newEle) => ele === newEle.name)._id;
    });

    this.setState({ [e.target.name]: e.target.value, selected: employeeId });
  };

  handleChangeChip = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    //const { selected } = this.state;

    console.log(this.state.selected, "this is empl");
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
          <FormControl style={{ minWidth: 410, maxWidth: 1000 }}>
            <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              name="employees"
              onChange={this.handleChangeChip}
              input={
                <Input
                  id="select-multiple-chip"
                  value={
                    this.state.employees.length !== 0
                      ? this.state.employees
                      : []
                  }
                />
              }
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ margin: 2 }} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {this.props.employees
                .filter((ele) => ele.department._id === this.state.department)
                .map((ele) => (
                  <MenuItem key={ele._id} value={ele.name}>
                    {ele.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ margin: 1, minWidth: 410 }}>
            <InputLabel htmlFor="grouped-select">Priority</InputLabel>
            <Select
              defaultValue=""
              name="priority"
              value={this.state.priority}
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

const mapStatetoProps = (state, props) => {
  return {
    tickets: state.tickets.find((ele) => ele._id === props.match.params.id),
    employees: state.employees,
    departments: state.departments,
    customers: state.customers
  };
};

export default connect(mapStatetoProps)(TicketEdit);
