const initState = [];

export default function usersReducer(state = initState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...action.payload };
    case "REMOVE_USER":
      return initState;
    default:
      return { ...state };
  }
}
