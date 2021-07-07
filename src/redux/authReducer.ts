import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

type setAuthUserDataAcPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type setAuthUserDataAcType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataAcPayloadType
}

type getCaptchaUrlSuccessAcType = {
    type: typeof GET_CAPTCHA_URL,
    payload: {captchaUrl: string}
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataAcType => {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessAcType => {
    return {type: GET_CAPTCHA_URL, payload: {captchaUrl}}
}

export const authCheck = () => {
    return async (dispatch: any) => {
        const data = await authAPI.authMe();

        if (data.resultCode === 0) {
            const {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        const data = await authAPI.login(email, password, rememberMe, captcha);

        if (data.resultCode === 0) {
            dispatch(authCheck())
        } else {
            if(data.resultCode === 10){
                dispatch(getCaptchaUrl());
            }
            const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        const data: any = authAPI.logout();

        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        const data = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    }
}

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }

        }
        case GET_CAPTCHA_URL: {
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