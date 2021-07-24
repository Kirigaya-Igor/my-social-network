import {updateObjectInArray} from "../utils/objectHelpers";
import {usersDataType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./store";
import {Dispatch} from "redux";
import {userAPI} from "../api/usersApi";

type ActionTypes = InferActionsType<typeof actions>

export const actions = {
    followSuccess: (userId: number) => {
        return {type: 'FOLLOW', userId} as const
    },

    unfollowSuccess: (userId: number) => {
        return {type: 'UNFOLLOW', userId} as const
    },

    setUsers: (users: Array<usersDataType>) => {
        return {type: 'SET_USERS', users} as const
    },

    setCurrentPage: (currentPage: number) => {
        return {type: 'SET_CURRENT_PAGE', currentPage} as const
    },

    setAllUsers: (totalCount: number) => {
        return {type: 'SET_ALL_USERS', totalCount} as const
    },

    toggleIsFetching: (isFetching: boolean) => {
        return {type: 'TOGGLE_IS_FETCHING', isFetching} as const
    },

    toggleIsFollowing: (isFollowing: boolean, userId: number) => {
        return {type: 'TOGGLE_IS_FOLLOWING', isFollowing, userId} as const
    }
}

type ThunkType = BaseThunkType<ActionTypes>
type DispatchType = Dispatch<ActionTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        const data = await userAPI.getUsers(currentPage, pageSize);

        dispatch(actions.setUsers(data.items));
        dispatch(actions.setAllUsers(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setCurrentPage(currentPage));
    }

}

const _followUnfollow = async (dispatch: DispatchType, userId: number, apiMethod: any,
                                actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleIsFollowing(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
        dispatch(actions.toggleIsFollowing(false, userId));
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = userAPI.followUser.bind(userId);
        _followUnfollow(dispatch, userId, apiMethod, actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = userAPI.unfollowUser.bind(userId);
        _followUnfollow(dispatch, userId, apiMethod, actions.unfollowSuccess);
    }
}

const initialState = {
    usersData: [] as Array<usersDataType>,
    pageSize: 5,
    allUsers: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: [] as Array<number> // array of users ids
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId,
                    'id', {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId,
                    'id', {followed: false})
            }

        case 'SET_USERS':
            return {
                ...state,
                usersData: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_ALL_USERS':
            return {
                ...state,
                allUsers: action.totalCount
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE_IS_FOLLOWING':
            return {
                ...state,
                isFollowing: action.isFollowing
                    ? [...state.isFollowing, action.userId]
                    : state.isFollowing.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export default usersReducer;