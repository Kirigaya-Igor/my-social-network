import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

export const setAuthUserData = (userId, email, login) => {
    return {type: SET_USER_DATA, data: {userId, email, login}}
}

export const authCheck = () => {
    return (dispatch) => {
        authAPI.authMe().then(data => {
            if(data.resultCode === 0) {
                const {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        })
    }
}

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
    // isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        }
        default:
            return state;
    }
}

export default authReducer;