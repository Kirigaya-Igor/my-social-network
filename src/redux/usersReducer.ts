import {userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {usersDataType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_ALL_USERS = 'SET_ALL_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';

type followSuccessType = {
    type: typeof FOLLOW
    userId: number
}

export const followSuccess = (userId: number): followSuccessType => {
    return {type: FOLLOW, userId}
}

type unfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}

export const unfollowSuccess = (userId: number): unfollowSuccessType => {
    return {type: UNFOLLOW, userId}
}

type setUsersType = {
    type: typeof SET_USERS
    users: Array<usersDataType>
}

export const setUsers = (users: Array<usersDataType>): setUsersType => {
    return {type: SET_USERS, users}
}

type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage: number): setCurrentPageType => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

type setAllUsersType = {
    type: typeof SET_ALL_USERS
    totalCount: number
}

export const setAllUsers = (totalCount: number): setAllUsersType => {
    return {type: SET_ALL_USERS, totalCount}
}

type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

type toggleIsFollowingType = {
    type: typeof TOGGLE_IS_FOLLOWING
    isFollowing: boolean
    userId: number
}

export const toggleIsFollowing = (isFollowing: boolean, userId: number): toggleIsFollowingType => {
    return {type: TOGGLE_IS_FOLLOWING, isFollowing, userId}
}

export const getUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        const data = await userAPI.getUsers(currentPage, pageSize);

        dispatch(setUsers(data.items));
        dispatch(setAllUsers(data.totalCount));
        dispatch(toggleIsFetching(false));
        dispatch(setCurrentPage(currentPage));
    }

}

const followUnfollow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowing(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
        dispatch(toggleIsFollowing(false, userId));
    }
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        const apiMethod = userAPI.followUser.bind(userId);
        followUnfollow(dispatch, userId, apiMethod, followSuccess);
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        const apiMethod = userAPI.unfollowUser.bind(userId);
        followUnfollow(dispatch, userId, apiMethod, unfollowSuccess);
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

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId,
                    'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId,
                    'id', {followed: false})
            }

        case SET_USERS:
            return {
                ...state,
                usersData: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING:
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