import axios from "../config/axios";

export const startGetTicket = () => {
  return (dispatch) => {
    axios
      .get("/tickets", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        const ticket = response.data;
        dispatch(getTicket(ticket));
      });
  };
};

export const getTicket = (ticket) => {
  return { type: "GET_TICKET", payload: ticket };
};

export const startRemoveTicket = (id) => {
  return (dispatch) => {
    axios
      .delete(`/tickets/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        const ticket = response.data;
        if (ticket.hasOwnProperty("message")) {
          dispatch(removeTicket(id));
        } else {
          alert(
            "failed to delete the record please check your internet connection"
          );
        }
      });
  };
};

export const removeTicket = (id) => {
  return { type: "REMOVE_TICKET", payload: id };
};

export const startTicketEdit = (formData, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/tickets/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        dispatch(ticketEdit(id, formData));
        redirect();
      });
  };
};

export const ticketEdit = (id, data) => {
  return {
    type: "EDIT_TICKET",
    payload: { id, data }
  };
};

export const startAddTicket = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/tickets", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addTicket(formData));
        redirect();
      });
  };
};

export const addTicket = (ticket) => {
  return { type: "ADD_TICKET", payload: ticket };
};

export const startticketCheckbox = (formData, id) => {
  return (dispatch) => {
    axios
      .put(`/tickets/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then((response) => {
        console.log(response.data);
        dispatch(ticketCheckbox(id));
      });
  };
};

export const ticketCheckbox = (id) => {
  return { type: "EDIT_TICKET_CHECKBOX", payload: id };
};
