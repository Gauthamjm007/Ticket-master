import axios from "../config/axios";

export const startGetEmployees = () => {
  return (dispatch) => {
    axios
      .get("/employees", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        const employees = response.data;
        dispatch(getEmployees(employees));
      });
  };
};

export const getEmployees = (employees) => {
  return { type: "GET_EMPLOYEES", payload: employees };
};

export const startRemoveEmployee = (id) => {
  return (dispatch) => {
    axios
      .delete(`/employees/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        const employee = response.data;
        if (employee.hasOwnProperty("name")) {
          dispatch(removeEmployee(id));
        } else {
          alert(
            "failed to delete the record please check your internet connection"
          );
        }
      });
  };
};

export const removeEmployee = (id) => {
  return { type: "REMOVE_EMPLOYEE", payload: id };
};

export const startEmployeeEdit = (formData, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/employees/${id}`, formData, {
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

export const startAddEmployee = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/employees", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addEmployee(formData));
        redirect();
      });
  };
};

export const addEmployee = (employees) => {
  return { type: "ADD_EMPLOYEE", payload: employees };
};
