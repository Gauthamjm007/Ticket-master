import React from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  startRemoveCustomer,
  startGetCustomer
} from "../../actions/customersActions";
import { Link } from "react-router-dom";

function Customers(props) {
  const handleRemoveCustomer = (id) => {
    props.dispatch(startRemoveCustomer(id)) && window.location.reload(false);
  };

  props.dispatch(startGetCustomer());

  return (
    <div>
      <h1>Customers - {props.customers.length}</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Mobile</TableCell>
            <TableCell align="left">Actions</TableCell>
            <TableCell align="left">Remove</TableCell>
          </TableRow>
        </TableHead>
        {
          <TableBody>
            {props.customers.map((row, i) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {i}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.mobile}</TableCell>
                <TableCell align="left">
                  <Link to={`/users/customers/show/${row._id}`}>
                    <Button variant="contained" color="primary">
                      Show
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveCustomer(row._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        }
      </Table>
      <br />
      <Link to="/users/customers/new">
        <Button variant="contained" color="primary">
          Add Customer
        </Button>
      </Link>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    customers: state.customers
  };
};

export default connect(mapStatetoProps)(Customers);
