const entireDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ENTIRE_DATA":
      return [...action.payload];
    default:
      return state;
  }
};

export default entireDataReducer;

const INITIAL_STATE = [];
