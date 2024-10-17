const initialState = {
    selectedCard: null,
  };

  interface CardAction {
    type: string;
    payload?: any;
  }
  
  const cardReducer = (state = initialState, action : CardAction) => {
    switch (action.type) {
      case "UPDATE_SELECTED_CARD":
        return {
          ...state,
          selectedCard: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cardReducer;
  