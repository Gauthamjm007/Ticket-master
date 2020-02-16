import React from "react";
import TicketInfoCompleted from "./TicketInfoCompleted";
import TicketInfoIncomplete from "./TicketInfoIncomplete";
import TicketGraph from "./TicketGraph";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles({
  root: {
    height: 20,
    backgroundColor: lighten("#8510d8", 0.5),
    borderRadius: 20
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#550a8a"
  }
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(0)
  }
}));

function Ticket(props) {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };
  return (
    <div>
      <br />
      <br />
      <Link to="/users/ticket/new" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Add Ticket
        </Button>
      </Link>
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

      <h1 align="center">
        {(
          props.tickets.filter((ele) => !ele.isResolved).length /
          props.tickets.length
        ).toFixed(2) * 100}
        %
      </h1>
      <div
        style={{
          height: 20,
          backgroundColor: "#8510d8",
          borderRadius: 20
        }}
      >
        <div className={classes.root}>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={
              (props.tickets.filter((ele) => !ele.isResolved).length /
                props.tickets.length) *
              100
            }
          />
        </div>
      </div>
      <TicketGraph />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets
  };
};

export default connect(mapStateToProps)(Ticket);
