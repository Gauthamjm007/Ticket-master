import React from "react";
import { connect } from "react-redux";

import TicketCard from "./TicketCard";
import { Link } from "react-router-dom";

function ShowTicket(props) {
  console.log(props.tickets);
  const formData =
    props.tickets.length !== 0 &&
    props.employees.length !== 0 &&
    props.customers.length !== 0 &&
    props.departments.length !== 0
      ? props.tickets.map((ele) => {
          return {
            _id: ele._id,
            code: ele.code,
            isResolved: ele.isResolved,
            message: ele.message,
            employees: ele.employees.map((ele1) => {
              return props.employees.find((ele2) => ele2._id === ele1._id).name;
            }),
            department: props.departments.find(
              (ele1) => ele1._id === ele.department
            ).name,
            customer: props.customers.find((ele1) => ele1._id === ele.customer)
              .name
          };
        })
      : "";
  return (
    <div align="center">
      {props.tickets.length !== 0 &&
        props.employees.length !== 0 &&
        props.customers.length !== 0 &&
        props.departments.length !== 0 && (
          <TicketCard
            tickets={formData.filter(
              (ele) => ele._id === props.match.params.id
            )}
          />
        )}
      <Link to={`/users/ticket/edit/${props.match.params.id}`}>Edit</Link>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    tickets: state.tickets,
    employees: state.employees,
    customers: state.customers,
    departments: state.departments
  };
};

export default connect(mapStateToProps)(ShowTicket);
