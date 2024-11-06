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
        console.log(action.payload);
        return {
          ...state,
          selectedCard: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cardReducer;
  