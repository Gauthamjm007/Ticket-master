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
        dispatch(removeCustomer(id));
        console.log(user);
      });
  };
};

export const removeCustomer = (id) => {
  return { type: "REMOVE_CUSTOMER", payload: id };
};

export const startAddCustomer = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/customers", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        const customer = response.data;

        if (customer.hasOwnProperty("errors")) {
          alert(customer._message);
        } else {
          dispatch(addCustomer(customer));
          redirect();
        }
      });
  };
};

export const addCustomer = (customer) => {
  return { type: "ADD_CUSTOMER", payload: customer };
};

export const startCustomerEdit = (formData, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/customers/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        redirect();
      });
  };
};



