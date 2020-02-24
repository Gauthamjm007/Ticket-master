import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Input from "@material-ui/core/Input";

import {
  startRemoveTicket,
  startticketCheckbox
} from "../../actions/ticketsAction";
import React, { Component } from "react";

class TicketInfoIncomplete extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      message: ""
    };
  }

  componentWillMount() {
    setTimeout(() => {
      console.log(this.props.tickets, "comp tick");
      this.setState({ tickets: this.props.tickets });
    }, 900);
  }

  handleSearch = (e) => {
    console.log(e.target.value);
    const code = String(e.target.value);
    console.log(code);
    console.log(this.state.tickets, "tickse");

    this.setState({ message: e.target.value });

    let addtickets = this.state.tickets.filter((ele) =>
      ele.code.includes(e.target.value)
    );

    if (addtickets) {
      this.setState({
        tickets: addtickets
      });
    }
    if (e.target.value.length === 0) {
      this.setState({ tickets: this.props.tickets });
    }

    //
  };
  handleRemove = (id) => {
    const tickets = this.state.tickets.filter((ele) => ele._id !== id);
    this.setState({ tickets });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.value) {
        this.props.dispatch(startRemoveTicket(id)) &&
          window.location.reload(false);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  handleCheckbox = (e, id) => {
    const tickets = this.state.tickets.filter((ele) => ele._id !== id);
    this.setState({ tickets });
    const formData = {
      isResolved: e.target.checked
    };
    this.props.dispatch(startticketCheckbox(formData, id));
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.props.tickets, "tickets");
    return (
      <div align="center">
        {this.props.tickets.length !== 0 ? (
          <>
            {" "}
            <h1>
              Tickets-
              {this.props.tickets.length}
            </h1>
            <Input
              placeholder="Search"
              variant="outlined"
              type="search"
              onChange={this.handleSearch}
              value={this.state.message}
            />
            <br />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Code No</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="left">Department</TableCell>
                    <TableCell align="left">Employees</TableCell>
                    <TableCell align="left">Message</TableCell>
                    <TableCell align="left">Priority</TableCell>
                    <TableCell align="left">Actions</TableCell>
                    <TableCell align="left">Remove</TableCell>
                    <TableCell align="left">Complete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.tickets.map((row, i) => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {row.code}
                      </TableCell>
                      <TableCell align="left">
                        {this.props.customers.length !== 0 &&
                          this.props.customers.find(
                            (ele) => ele._id === row.customer
                          ).name}
                      </TableCell>
                      <TableCell align="left">
                        {this.props.departments.length !== 0 &&
                          this.props.departments.find(
                            (ele) => ele._id === row.department
                          ).name}
                      </TableCell>
                      <TableCell align="left">
                        {this.props.employees.length !== 0 &&
                          row.employees.map((ele, i) => {
                            return (
                              <p key={i}>
                                {this.props.employees.length !== 0 &&
                                  this.props.employees.find(
                                    (ele) => ele._id === row.employees[i]._id
                                  ).name}
                              </p>
                            );
                          })}
                      </TableCell>
                      <TableCell align="left">{row.message}</TableCell>

                      <TableCell align="left">{row.priority}</TableCell>
                      <TableCell align="left">
                        <Link
                          to={`/users/ticket/show/${row._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="contained" color="primary">
                            Show
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => this.handleRemove(row._id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <input
                          type="checkbox"
                          checked={row.isResolved}
                          onChange={(e) => this.handleCheckbox(e, row._id)}
                        ></input>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
          </>
        ) : (
          <h2>No Tickets are complete to be displayed</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.filter((ele) => ele.isResolved),
    customers: state.customers,
    employees: state.employees,
    departments: state.departments
  };
};

export default connect(mapStateToProps)(TicketInfoIncomplete);
