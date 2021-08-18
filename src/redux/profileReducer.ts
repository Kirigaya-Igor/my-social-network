import {stopSubmit} from "redux-form";
import {photosType, postsDataType, profileType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./store";
import {profileAPI} from "../api/profileApi";

type ActionTypes = InferActionsType<typeof actions>

export const actions = {
    deletePost: (postId: number) => {
        return {type: 'DELETE_POST', postId} as const
    },
    addPostActionCreator: (newPostText: string) => {
        return {type: 'ADD_POST', newPostText} as const
    },
    setProfile: (profile: profileType) => {
        return {type: 'SET_USER_PROFILE', profile} as const
    },
    setStatus: (status: string) => {
        return {type: 'SET_USER_STATUS', status} as const
    },
    setPhoto: (photos: photosType) => {
        return {type: 'SAVE_PHOTO', photos} as const
    }
}

type ThunkType = BaseThunkType<ActionTypes>

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getProfile(userId);

        dispatch(actions.setProfile(data));

    }
}

export const getUserStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getStatus(userId);

        dispatch(actions.setStatus(data));
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.updateStatus(status);

            if (data.resultCode === 0) {
                dispatch(actions.setStatus(status));
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const savePhoto = (photo: string): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.savePhoto(photo);

        if (data.resultCode === 0) {
            dispatch(actions.setPhoto(data.data.photos));
        }
    }
}

export const saveProfile = (profile: profileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const data = await profileAPI.saveProfile(profile);

        if (data.resultCode === 0) {
            if(userId != null){
                dispatch(getUserProfile(userId));
            } else {
                throw new Error('UserId can`t be null')
            }

        } else {
            // @ts-ignore
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

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType  => {
    switch (action.type) {
        case 'ADD_POST': {
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
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET_USER_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'DELETE_POST': {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        }
        case 'SAVE_PHOTO': {
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