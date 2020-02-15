import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

function TicketInfo(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers
  };
};

export default connect(mapStateToProps)(TicketInfo);
