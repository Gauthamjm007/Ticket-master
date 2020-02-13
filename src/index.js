import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import App from "./App";
import { Provider } from "react-redux";
import { startSetUser } from "./actions/userActions";

const store = configureStore();

store.subscribe(() => {
  console.log(store.getState());
});

if (localStorage.getItem("authToken")) {
  store.dispatch(startSetUser());
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
