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
import Customers from "./components/Customer/Customers";
import CustomerNew from "./components/Customer/CustomerNew";
import CustomersEdit from "./components/Customer/CustomersEdit";
import Departments from "./components/Department/Departments";
import Employees from "./components/Employees/Employees";
import CustomerShow from "./components/Customer/CustomerShow";
import { startLogout } from "./actions/userActions";
import DepartmentsEdit from "./components/Department/DepartmentsEdit";
import DepartmentShow from "./components/Department/DepartmentShow";
import EmployeesNew from "./components/Employees/EmployeesNew";
import EmployeesShow from "./components/Employees/EmployeesShow";
import EmployeesEdit from "./components/Employees/EmployeesEdit";
import Ticket from "./components/Ticket/Ticket";
import TicketAdd from "./components/Ticket/TicketAdd";
import TicketEdit from "./components/Ticket/TicketEdit";
import ShowTicket from "./components/Ticket/ShowTicket";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Are you sure you want to Logout ?",
      text: "You will have to log in again",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!"
    }).then((result) => {
      if (result.value) {
        props.dispatch(startLogout()) && window.location.reload(false);
        Swal.fire(
          "Logged Out!",
          "Your have successfully logged out",
          "success"
        );
      }
    });
  };
  return (
    <>
      <div align="sticky">
        <BrowserRouter>
          <AppBar position="absolute" color="inherit">
            <Toolbar>
              <Typography variant="h4" className={classes.title} align="left">
                Ticket Master
              </Typography>
              {Object.keys(props.users).length === 0 ? (
                <>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button color="default">
                      <span>Home</span>
                    </Button>
                  </Link>
                  <Link to="/users/login" style={{ textDecoration: "none" }}>
                    <Button color="default">
                      <span>Login</span>
                    </Button>
                  </Link>
                  <Link to="/users/register" style={{ textDecoration: "none" }}>
                    <Button color="default">
                      <span>Register</span>
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button color="default">
                      <span>Home</span>
                    </Button>
                  </Link>
                  <Link
                    to="/users/customers"
                    style={{ textDecoration: "none" }}
                  >
                    <Button color="default">
                      <span>Customers</span>
                    </Button>
                  </Link>
                  <Link
                    to="/users/departments"
                    style={{ textDecoration: "none" }}
                  >
                    <Button color="default">
                      <span>Departments</span>
                    </Button>
                  </Link>
                  <Link
                    to="/users/employees"
                    style={{ textDecoration: "none" }}
                  >
                    <Button color="default">
                      <span>Employees</span>
                    </Button>
                  </Link>
                  <Link to="/users/tickets" style={{ textDecoration: "none" }}>
                    <Button color="default">
                      <span>Tickets</span>
                    </Button>
                  </Link>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button color="default" onClick={handleDelete}>
                      <span>Logout</span>
                    </Button>
                  </Link>
                </>
              )}
            </Toolbar>
          </AppBar>

          {/* Before login */}
          <Route path="/" component={Home} exact={true} />
          <Route path="/users/login" component={Login} exact={true} />
          <Route path="/users/register" component={Register} exact={true} />

          {/* after login */}
          <Route path="/users/customers" component={Customers} exact={true} />
          <Route
            path="/users/customers/new"
            component={CustomerNew}
            exact={true}
          />

          {/* customer components */}
          <Route path="/users/customers/show/:id" component={CustomerShow} />
          <Route path="/users/customers/edit/:id" component={CustomersEdit} />

          {/* departments components */}
          <Route path="/users/departments/:id" component={DepartmentShow} />
          <Route
            path="/users/departments"
            component={Departments}
            exact={true}
          />
          <Route
            path="/departments/edit/:id"
            component={DepartmentsEdit}
            exact={true}
          />

          {/* employees components */}
          <Route path="/users/employees" component={Employees} exact={true} />
          <Route
            path="/users/employees/new"
            component={EmployeesNew}
            exact={true}
          />
          <Route
            path="/users/employees/show/:id"
            component={EmployeesShow}
            exact={true}
          />
          <Route
            path="/users/employees/edit/:id"
            component={EmployeesEdit}
            exact={true}
          />

          {/* Ticket components */}
          <Route path="/users/tickets" component={Ticket} exact={true} />
          <Route path="/users/ticket/new" component={TicketAdd} exact={true} />
          <Route
            path="/users/ticket/edit/:id"
            component={TicketEdit}
            exact={true}
          />
          <Route
            path="/users/ticket/show/:id"
            component={ShowTicket}
            exact={true}
          />
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
