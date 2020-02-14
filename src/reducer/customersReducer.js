const initState = [];

export default function customersReducer(state = initState, action) {
  switch (action.type) {
    case "GET_CUSTOMERS":
      return [...action.payload];
    case "ADD_CUSTOMER":
      return state.concat(action.payload);
    case "REMOVE_CUSTOMER":
      return state.filter((ele) => ele._id !== action.payload);
    default:
      return [...state];
  }
}
