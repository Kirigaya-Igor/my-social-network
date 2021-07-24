import {authCheck} from "./authReducer"
import {BaseThunkType, InferActionsType} from "./store";

type ActionTypes = InferActionsType<typeof actions>

export const actions = {
    setInitialized: () => {return {type: 'SET_INITIALIZED'} as const}
}

type ThunkType = BaseThunkType<ActionTypes>

export const initializeApp = (): ThunkType => {
    return async (dispatch) => {

        await dispatch(authCheck())

        dispatch(actions.setInitialized())
    }
}

const initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_INITIALIZED': {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}

export default appReducer