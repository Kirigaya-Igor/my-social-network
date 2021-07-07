import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postsDataType, profileType} from "../types/types";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';

type deletePostType = {
    type: typeof DELETE_POST
    postId: number
}

export const deletePost = (postId: number): deletePostType => {
    return {type: DELETE_POST, postId}
}

type addPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}

export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => {
    return {type: ADD_POST, newPostText}
}

type setProfileType = {
    type: typeof SET_USER_PROFILE
    profile: profileType
}

export const setProfile = (profile: profileType): setProfileType => {
    return {type: SET_USER_PROFILE, profile}
}

type setStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}

export const setStatus = (status: string): setStatusType => {
    return {type: SET_USER_STATUS, status}
}

type setPhotoType = {
    type: typeof SAVE_PHOTO
    photos: photosType
}

export const setPhoto = (photos: photosType): setPhotoType => {
    return {type: SAVE_PHOTO, photos}
}

export const getUserProfile = (userId: number) => {
    return async (dispatch: any) => {
        const data = await profileAPI.getProfile(userId);

        dispatch(setProfile(data));

    }
}

export const getUserStatus = (userId: number) => {
    return async (dispatch: any) => {
        const data = await profileAPI.getStatus(userId);

        dispatch(setStatus(data));
    }
}

export const updateUserStatus = (status: string) => {
    return async (dispatch: any) => {
        try {
            const data = await profileAPI.updateStatus(status);

            if (data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const savePhoto = (photo: string) => {
    return async (dispatch: any) => {
        const data = await profileAPI.savePhoto(photo);

        if (data.resultCode === 0) {
            dispatch(setPhoto(data.data.photos));
        }
    }
}

export const saveProfile = (profile: profileType) => {
    return async (dispatch: any, getState: any) => {
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
        {id: 3, message: 'React it`s fine', likesCount: 100}] as Array<postsDataType>,
    profile: null as profileType | null,
    status: ''
}

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType  => {
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
                profile: {...state.profile, photos: action.photos} as profileType
            }
        }
        default:
            return state;
    }
}

export default profileReducer;