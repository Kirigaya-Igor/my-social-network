import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';

export const deletePost = (postId) => {
    return {type: DELETE_POST, postId}
}

export const addPostActionCreator = (newPostText) => {
    return {type: ADD_POST, newPostText}
}

export const setProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile}
}

export const setStatus = (status) => {
    return {type: SET_USER_STATUS, status}
}

export const setPhoto = (photos) => {
    return {type: SAVE_PHOTO, photos}
}

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        const data = await profileAPI.getProfile(userId);

        dispatch(setProfile(data));

    }
}

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        const data = await profileAPI.getStatus(userId);

        dispatch(setStatus(data));
    }
}

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        const data = await profileAPI.updateStatus(status);

        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhoto = (photo) => {
    return async (dispatch) => {
        const data = await profileAPI.savePhoto(photo);

        if (data.resultCode === 0) {
            dispatch(setPhoto(data.data.photos));
        }
    }
}

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const data = await profileAPI.saveProfile(profile);

        if (data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        } else {
            dispatch(stopSubmit('editProfileData', {_error: data.messages[0]}));
            return Promise.reject(data.messages[0]);
        }
    }
}

const initialState = {
    postsData: [
        {id: 1, message: 'first post', likesCount: 10},
        {id: 2, message: 'second post', likesCount: 3},
        {id: 3, message: 'React it`s fine', likesCount: 100}],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: 4,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }

        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postId)
            }
        }
        case SAVE_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state;
    }
}

export default profileReducer;