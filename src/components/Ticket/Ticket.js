import React from "react";
import TicketInfoCompleted from "./TicketInfoCompleted";
import TicketInfoIncomplete from "./TicketInfoIncomplete";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

export default function Ticket() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };
  return (
    <div>
      <br />
      <br />
      <Paper square>
        <Tabs
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          value={value}
          centered
        >
          <Tab label="Pending" />
          <Tab label="Completed" />
        </Tabs>
      </Paper>
      {value === 0 && <TicketInfoCompleted />}
      {value === 1 && <TicketInfoIncomplete />}
    </div>
  );
}
