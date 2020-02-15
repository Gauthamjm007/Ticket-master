import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import App from "./App";
import { Provider } from "react-redux";
import { startSetUser } from "./actions/userActions";
import { startGetCustomer } from "./actions/customersActions";
import { startGetDepartment } from "./actions/departmentActions";
import { startGetEmployees } from "./actions/employeesAction";

const store = configureStore();

store.subscribe(() => {
  console.log(store.getState());
});

console.log(localStorage.getItem("authToken"), "Token");

if (localStorage.getItem("authToken")) {
  store.dispatch(startSetUser());
  store.dispatch(startGetCustomer());
  store.dispatch(startGetDepartment());
  store.dispatch(startGetEmployees());
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
