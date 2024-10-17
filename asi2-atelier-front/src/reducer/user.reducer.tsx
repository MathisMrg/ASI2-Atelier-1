const initialState = {
    selectedUser: null,
  };

  interface UserAction {
    type: string;
    payload?: any;
  }
  
  const userReducer = (state = initialState, action : UserAction) => {
    switch (action.type) {
      case "UPDATE_SELECTED_USER":
        return {
          ...state,
          selectedUser: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  