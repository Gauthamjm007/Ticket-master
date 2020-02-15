const initState = [];

export default function departmentsReducer(state = initState, action) {
  switch (action.type) {
    case "ADD_DEPARTMENT":
      return state.concat(action.payload);
    case "GET_DEPARTMENTS":
      return action.payload;
    case "REMOVE_DEPARTMENT":
      return state.filter((ele) => ele._id !== action.payload);
    default:
      return [...state];
  }
}
