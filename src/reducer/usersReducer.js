const initState = [];

export default function usersReducer(state = initState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...action.payload };
    default:
      return { ...state };
  }
}
