export const addInvest = (data) => {
  return {
    type: "ADD_INVEST",
    payload: data,
  };
};

export const getEntireData = (data) => {
  return {
    type: "GET_ENTIRE_DATA",
    payload: data,
  };
};
