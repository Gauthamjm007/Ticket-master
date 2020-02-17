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
import { startRemoveEmployee } from "../../actions/employeesAction";
import React, { Component } from "react";
import Swal from "sweetalert2";

class Employees extends Component {
  handleRemove = (id) => {
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
        this.props.dispatch(startRemoveEmployee(id)) &&
          window.location.reload(false);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div align="center">
        <h1>
          Employees-
          {this.props.employees.length}
        </h1>
        <TableContainer component={Paper}>
          <Table style={{ width: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Mobile</TableCell>
                <TableCell align="left">Department</TableCell>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.employees.map((row, i) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.mobile}</TableCell>
                  <TableCell align="left">{row.department.name}</TableCell>
                  <TableCell align="left">
                    <Link
                      to={`/users/employees/show/${row._id}`}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Link to="/users/employees/new" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Add Employee
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees
  };
};

export default connect(mapStateToProps)(Employees);
