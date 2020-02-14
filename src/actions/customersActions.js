import axios from "../config/axios";

export const startGetCustomer = () => {
  return (dispatch) => {
    axios
      .get("/customers", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        const user = response.data;
        console.log(user);
        dispatch(getCustomer(user));
      });
  };
};

export const getCustomer = (data) => {
  return { type: "GET_CUSTOMERS", payload: data };
};

export const startRemoveCustomer = (id) => {
  return (dispatch) => {
    axios
      .delete(`/customers/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        const user = response.data;
        console.log(user);
      });
  };
};
