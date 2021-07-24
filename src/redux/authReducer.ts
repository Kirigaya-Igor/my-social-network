import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsType} from "./store";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";

type ActionTypes = InferActionsType<typeof actions>

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return {type: 'SET_USER_DATA', payload: {userId, email, login, isAuth}} as const
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return {type: 'GET_CAPTCHA_URL', payload: {captchaUrl}} as const
    }
}

type ThunkType = BaseThunkType<ActionTypes>

export const authCheck = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.authMe();

        if (data.resultCode === ResultCodeEnum.Success) {
            const {id, email, login} = data.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe, captcha);

        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(authCheck())
        } else {
            if(data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
                dispatch(getCaptchaUrl());
            }
            const message = data.messages.length > 0 ? data.messages[0] : 'Some error';

            // @ts-ignore
            dispatch(stopSubmit('login', {_error: message}));
        }
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        const data: any = authAPI.logout();

        if (data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
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

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'GET_CAPTCHA_URL': {
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