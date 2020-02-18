import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import TicketCard from "../Ticket/TicketCard";

function EmployeesShow(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

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

  console.log(formData, "formData");
  return (
    <div align="center">
      <div>
        <h1>{props.emp !== undefined && props.emp.email}</h1>
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
      </div>
      <div>
        <Paper square>
          <Tabs
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            value={value}
            centered
          >
            <Tab label="All" />
            <Tab label="Pending" />
            <Tab label="Completed" />
          </Tabs>
        </Paper>
        {Number(value) === 0 &&
          props.tickets.length !== 0 &&
          props.employees.length !== 0 &&
          props.customers.length !== 0 &&
          props.departments.length !== 0 && (
            <TicketCard
              tickets={formData.filter((ele) => {
                return ele.employees.includes(props.emp.name);
              })}
            />
          )}
        {Number(value) === 1 &&
          props.tickets.length !== 0 &&
          props.employees.length !== 0 &&
          props.customers.length !== 0 &&
          props.departments.length !== 0 && (
            <TicketCard
              tickets={formData
                .filter((ele) => {
                  return ele.employees.includes(props.emp.name);
                })
                .filter((ele) => ele.isResolved !== true)}
            />
          )}
        {Number(value) === 2 &&
          props.tickets.length !== 0 &&
          props.employees.length !== 0 &&
          props.customers.length !== 0 &&
          props.departments.length !== 0 &&
          formData.filter((ele) => ele.isResolved == true).length > 1 && (
            <TicketCard
              tickets={formData
                .filter((ele) => {
                  return ele.employees.includes(props.emp.name);
                })
                .filter((ele) => ele.isResolved === true)}
            />
          )}
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    emp: state.employees.find((ele) => ele._id === id),
    customers: state.customers,
    tickets: state.tickets,
    employees: state.employees,
    departments: state.departments
  };
};

export default connect(mapStateToProps)(EmployeesShow);
