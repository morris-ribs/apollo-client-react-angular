
export const discReducer = (state = {}, action) => {
  switch (action.type) {
    case "STARTING_REQUEST":
      return state.set("fetching", true);
    case "FINISHED_REQUEST":
      return state.set("fetching", false)
             .set("data", action.response.data);
    default:
      return state;
  }
};
