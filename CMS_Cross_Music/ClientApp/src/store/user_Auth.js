import axios from 'axios';
const UserLoginType = 'USER_LOGIN';
const UserLogoutType = 'USER_LOGOUT';
const initialState = {sesn: '', user: '', isAuthenticated: false };

export const actionCreators = {
    loginUser: req => async (dispatch, getState) => {
        dispatch({ type: UserLoginType, req });
    },
    logoutUser: () => ({ type: UserLogoutType })
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === UserLogoutType) {
        return {
            ...state,
            sesn: '',
            user: '',
            isAuthenticated: false
        };
    }

    if (action.type === UserLoginType) {
        return {
            ...state,
            sesn: action.req,
            user: action.req.userIdUserNavigation,
            isAuthenticated: true
        };
    }

    return state;
};