import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import TicketCard from "./Ticket/TicketCard";

function TicketInfo(props) {
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

  console.log(formData, "new Form Data");
  return (
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
        props.departments.length !== 0 && <TicketCard tickets={formData} />}
      {Number(value) === 1 &&
        props.tickets.length !== 0 &&
        props.employees.length !== 0 &&
        props.customers.length !== 0 &&
        props.departments.length !== 0 && (
          <TicketCard
            tickets={formData.filter((ele) => ele.isResolved !== true)}
          />
        )}
      {Number(value) === 2 &&
        props.tickets.length !== 0 &&
        props.employees.length !== 0 &&
        props.customers.length !== 0 &&
        props.departments.length !== 0 && (
          <TicketCard
            tickets={formData.filter((ele) => ele.isResolved === true)}
          />
        )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    tickets: state.tickets,
    employees: state.employees,
    departments: state.departments
  };
};

export default connect(mapStateToProps)(TicketInfo);
