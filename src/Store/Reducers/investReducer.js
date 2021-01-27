const investReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_INVEST":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default investReducer;

const INITIAL_STATE = [];
