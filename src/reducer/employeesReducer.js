const initState = [];

export default function employeesReducer(state = initState, action) {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return state.concat(action.payload);
    case "REMOVE_EMPLOYEE":
      return state.filter((ele) => ele._id !== action.payload);
    case "EDIT_EMPLOYEE":
      return state.map((ele) => {
        return ele._id === action.payload.id
          ? Object.assign({}, ele, action.payload.data)
          : Object.assign({}, ele);
      });
    case "GET_EMPLOYEES":
      return action.payload;
    default:
      return [...state];
  }
}
