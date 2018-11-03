import ActionType from './ActionTypes';

const RootReducer = (state={}, action) => {
    switch(action.type) {
        case ActionType.LOGIN_SUCESS:
        return {
            ...state,
            authenticated: true,
            logged_in_user: action.payload
        };
        break;
        default:
        return state;
        break;
    }    
}

export default RootReducer;