const initState = [];

export default function ticketsReducer(state = initState, action) {
  switch (action.type) {
    case "ADD_TICKET":
      return state.concat(action.payload);
    case "REMOVE_TICKET":
      return state.filter((ele) => ele._id === action.payload);
    case "EDIT_TICKET":
      return state.map((ele) => {
        return ele._id === action.payload.id
          ? Object.assign({}, ele, action.payload.data)
          : Object.assign({}, ele);
      });
    case "GET_TICKET":
      return action.payload;
    default:
      return [...state];
  }
}
