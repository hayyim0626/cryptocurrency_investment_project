const entireDataReudcer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ENTIRE_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default entireDataReudcer;

const INITIAL_STATE = [];
