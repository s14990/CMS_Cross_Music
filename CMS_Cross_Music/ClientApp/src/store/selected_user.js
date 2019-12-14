const UserSelectType = 'USER_SELECT';
const UserDeselectType = 'USER_DESELECT';
const initialState = { selected_user: '', isSelected: false };

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
            selected_user: action.req,
            isAuthenticated: true
        };
    }

    return state;
};