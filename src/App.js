import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Customers from "./components/Customers";
import CustomerNew from "./components/CustomerNew";
import Departments from "./components/Departments";
import Employees from "./components/Employees";
import Tickets from "./components/Tickets";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function App(props) {
  const classes = useStyles();

  const handleDelete = (e) => {
    localStorage.removeItem("authToken");
    window.location.reload(false);
  };
  return (
    <>
      <div align="sticky">
        <BrowserRouter>
          <AppBar position="static" color="inherit">
            <Toolbar>
              <Typography variant="h4" className={classes.title} align="left">
                Ticket Master
              </Typography>
              {Object.keys(props.users).length === 0 ? (
                <>
                  <Link to="/">
                    <Button color="default">
                      <span>Home</span>
                    </Button>
                  </Link>
                  <Link to="/users/login">
                    <Button color="default">
                      <span>Login</span>
                    </Button>
                  </Link>
                  <Link to="/users/register">
                    <Button color="default">
                      <span>Register</span>
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">
                    <Button color="default">
                      <span>Home</span>
                    </Button>
                  </Link>
                  <Link to="/users/customers">
                    <Button color="default">
                      <span>Customers</span>
                    </Button>
                  </Link>
                  <Link to="/users/departments">
                    <Button color="default">
                      <span>Departments</span>
                    </Button>
                  </Link>
                  <Link to="/users/employees">
                    <Button color="default">
                      <span>Employees</span>
                    </Button>
                  </Link>
                  <Link to="/users/tickets">
                    <Button color="default">
                      <span>Tickets</span>
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button color="default" onClick={handleDelete}>
                      <span>Logout</span>
                    </Button>
                  </Link>
                </>
              )}
            </Toolbar>
          </AppBar>
          <Route path="/" component={Home} exact={true} />
          <Route path="/users/login" component={Login} exact={true} />
          <Route path="/users/register" component={Register} exact={true} />
          <Route path="/users/customers" component={Customers} exact={true} />
          <Route path="/users/customers/new" component={CustomerNew} exact={true} />
          <Route
            path="/users/departments"
            component={Departments}
            exact={true}
          />
          <Route path="/users/employees" component={Employees} exact={true} />
          <Route path="/users/tickets" component={Tickets} exact={true} />
        </BrowserRouter>
      </div>
      <br />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(App);
