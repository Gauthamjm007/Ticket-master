import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import TicketInfo from "../TicketInfo";

function CustomerShow(props) {
  return (
    <div align="center">
      <div>
        <h1>{props.customers !== undefined && props.customers.email}</h1>
        <Link
          to={`/users/customers/edit/${props.match.params.id}`}
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
    customers: state.customers.find((ele) => ele._id === id)
  };
};

export default connect(mapStateToProps)(CustomerShow);
