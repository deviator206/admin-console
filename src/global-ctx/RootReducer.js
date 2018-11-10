import ActionType from './ActionTypes';

const RootReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.LOGIN_SUCESS:
            return {
                ...state,
                authenticated: true,
                logged_in_user: action.payload
            };
            break;
        case ActionType.LOGOUT_SUCCESS:
            return {
                ...state,
                authenticated: false,
                logged_in_user: undefined
            };
            break;
        default:
            return state;
            break;
    }
}

export default RootReducer;