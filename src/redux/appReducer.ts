import {authCheck} from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

type SetInitializedAC = {
    type: typeof SET_INITIALIZED
}

export const setInitialized = (): SetInitializedAC => {
    return {type: SET_INITIALIZED}
}

export const initializeApp = () => {
    return async (dispatch: any) => {

        await dispatch(authCheck());

        dispatch(setInitialized());
    }
}

type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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