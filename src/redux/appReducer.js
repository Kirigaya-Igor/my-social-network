import {authCheck} from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

export const setInitialized = () => {
    return {type: SET_INITIALIZED}
}

export const initializeApp = () => {
    return async (dispatch) => {

        await dispatch(authCheck());

        dispatch(setInitialized());
    }
}

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

export default appReducer;