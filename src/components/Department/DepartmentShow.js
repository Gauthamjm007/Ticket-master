import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TicketInfro from "../TicketInfo";

function DepartmentShow(props) {
  console.log(props.name, "name");
  return (
    <div align="center">
      <h1>
        Department : {props.departments !== undefined && props.departments.name}
      </h1>
      <Link
        to={`/departments/edit/${props.match.params.id}`}
        style={{ textDecoration: "none" }}
      >
        <Button variant="contained" color="primary">
          Edit
        </Button>
      </Link>
      <br />
      <br />
      <TicketInfro />
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  console.log(state.departments, "departments");
  console.log(id);
  return {
    departments: state.departments.find((ele) => ele._id === id)
  };
};

export default connect(mapStateToProps)(DepartmentShow);
