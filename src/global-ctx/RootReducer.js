import ActionType from './ActionTypes';

const RootReducer = (state={}, action) => {
    switch(action.type) {
        case ActionType.LOGIN_SUCESS:
        return {
            ...state,
            authenticated: true
        };
        break;
        default:
        return state;
        break;
    }    
}

export default RootReducer;