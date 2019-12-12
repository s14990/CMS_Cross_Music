const UserSelectType = 'USER_SELECT';
const UserDeselectType = 'USER_DESELECT';
const initialState = { user: '', isSelected: false };

export const actionCreators = {
    selectUser: req => async (dispatch, getState) => {
        dispatch({ type: UserSelectType, req });
    },
    deselectUser: () => ({ type: UserDeselectType })
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === UserDeselectType) {
        return {
            ...state,
            user: '',
            isSelected: false
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