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
            selected_user: '',
            isSelected: false
        };
    }

    if (action.type === UserSelectType) {
        return {
            ...state,
            selected_user: action.req,
            isSelected: true
        };
    }

    return state;
};