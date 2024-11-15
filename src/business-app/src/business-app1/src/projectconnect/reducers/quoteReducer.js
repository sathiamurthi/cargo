const initialState = {
  quoteData: {
   
  },
  

};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUOTE_DATA':
      return {
        ...state,
        quoteData: action.payload
      };
    default:
      return state;
  }
};

export default quoteReducer;
