const initialState = {
    selectedOpponent: null,
};

interface OpponentAction {
    type: string;
    payload?: any;
}

const opponentReducer = (state = initialState, action : OpponentAction) => {
    switch (action.type) {
        case "UPDATE_SELECTED_OPPONENT":
            return {
                ...state,
                selectedOpponent: action.payload,
            };
        default:
            return state;
    }
};

export default opponentReducer;
