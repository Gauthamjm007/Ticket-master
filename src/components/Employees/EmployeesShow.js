import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import TicketInfo from "../TicketInfo";

function EmployeesShow(props) {
  return (
    <div align="center">
      <div>
        <h1>{props.employees !== undefined && props.employees.email}</h1>
        <Link
          to={`/users/employees/edit/${props.match.params.id}`}
          style={{ textDecoration: "none" }}
        >
          <Button color="primary" variant="contained">
            Edit
          </Button>
        </Link>
        <br />
        <br />
        <TicketInfo />
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    employees: state.employees.find((ele) => ele._id === id)
  };
};

export default connect(mapStateToProps)(EmployeesShow);
