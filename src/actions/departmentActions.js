import axios from "../config/axios";

export const startGetDepartment = () => {
  return (dispatch) => {
    axios
      .get("/departments", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        const departments = response.data;
        dispatch(getDepartments(departments));
      });
  };
};

export const getDepartments = (departments) => {
  return { type: "GET_DEPARTMENTS", payload: departments };
};

export const startRemoveDepartment = (id) => {
  return (dispatch) => {
    axios
      .delete(`/departments/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        const department = response.data;
        if (department.hasOwnProperty("name")) {
          dispatch(removeDepartment(id));
        } else {
          alert(
            "failed to delete the record please check your internet connection"
          );
        }
      });
  };
};

export const removeDepartment = (id) => {
  return { type: "REMOVE_DEPARTMENT", payload: id };
};

export const startDepartmentEdit = (formData, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/departments/${id}`, formData, {
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

export const startAddDepartment = (formData) => {
  return (dispatch) => {
    axios
      .post("/departments", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addDepartment(formData));
      });
  };
};

export const addDepartment = (department) => {
  return { type: "ADD_DEPARTMENT", payload: department };
};
