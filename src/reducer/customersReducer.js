const initState = [];

export default function customersReducer(state = initState, action) {
  switch (action.type) {
    case "GET_CUSTOMERS":
      return [...action.payload];
    default:
      return [...state];
  }
}
