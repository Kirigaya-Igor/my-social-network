import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
}

export const authCheck = () => {
    return async (dispatch) => {
        const data = await authAPI.authMe();

        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe);

        if (data.resultCode === 0) {
            dispatch(authCheck())
        } else {
            const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        const data = authAPI.logout();

        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }

        }
        default:
            return state;
    }
}

export default authReducer;