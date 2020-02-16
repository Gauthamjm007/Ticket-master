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
import { startRemoveTicket } from "../../actions/ticketsAction";
import React, { Component } from "react";

class TicketInfoIncomplete extends Component {
  handleRemove = (id) => {
    console.log(id, "idaseads");
    this.props.dispatch(startRemoveTicket(id));
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
            <TableContainer component={Paper}>
              <Table style={{ width: 1200 }}>
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
                  {this.props.tickets.map((row, i) => (
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
                        <input type="checkbox" checked={row.isResolved}></input>
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
