import axios from "../config/axios";

export const startRegisterUser = (formData, redirect) => {
  return (dispatch) => {
    axios.post("/users/register", formData).then((response) => {
      console.log(response.data);
      if (response.data.hasOwnProperty("errors")) {
        alert(response.data.message);
      } else {
        redirect();
      }
    });
  };
};

export const startLogin = (formData, redirect) => {
  return (dispatch) => {
    axios.post("/users/login", formData).then((response) => {
      if (response.data.hasOwnProperty("error")) {
        alert(response.data.error);
      } else {
        localStorage.setItem("authToken", response.data.token);
        axios
          .get("/users/account", {
            headers: {
              "x-auth": localStorage.getItem("authToken")
            }
          })
          .then((response) => {
            const user = response.data;
            dispatch(setUser(user));
            redirect();
          });
      }
    });
  };
};

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

export const startSetUser = () => {
  return (dispatch) => {
    axios
      .get("/users/account", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        const user = response.data;
        dispatch(setUser(user));
      });
  };
};
