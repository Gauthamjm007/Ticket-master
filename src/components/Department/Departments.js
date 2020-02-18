import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
  startRemoveDepartment,
  startAddDepartment,
  startGetDepartment
} from "../../actions/departmentActions";
import React, { Component } from "react";
import Swal from "sweetalert2";

class Departments extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  componentWillMount() {
    this.props.dispatch(startGetDepartment());
  }

  handleClick = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name
    };
    this.props.dispatch(startAddDepartment(formData));
  };

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
        this.props.dispatch(startRemoveDepartment(id)) &&
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
          Departments-
          {this.props.departments.length}
        </h1>
        <TableContainer component={Paper}>
          <Table style={{ width: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>Departments</TableCell>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.departments.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    <Link
                      to={`/users/departments/${row._id}`}
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
        <form onSubmit={this.handleClick}>
          <TextField
            type="text"
            label="Add Department"
            value={this.state.name}
            variant="filled"
            name="name"
            onChange={this.handleChange}
            style={{ height: 30 }}
          />
          <br />
          <br />
          <br />
          <TextField type="submit" value="ADD" color="primary"></TextField>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    departments: state.departments
  };
};

export default connect(mapStateToProps)(Departments);
