import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { Link } from "react-router-dom";

function CustomerShow(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

  return (
    <div align="center">
      <div>
        <h1>{props.customers !== undefined && props.customers.email}</h1>
        <Link to={`/users/customers/edit/${props.match.params.id}`}>Edit</Link>
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
