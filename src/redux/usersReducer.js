import {userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_ALL_USERS = 'SET_ALL_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';

export const followSuccess = (userId) => {
    return {type: FOLLOW, userId}
}

export const unfollowSuccess = (userId) => {
    return {type: UNFOLLOW, userId}
}

export const setUsers = (users) => {
    return {type: SET_USERS, users}
}

export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

export const setAllUsers = (totalCount) => {
    return {type: SET_ALL_USERS, totalCount}
}

export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

export const toggleIsFollowing = (isFollowing, userId) => {
    return {type: TOGGLE_IS_FOLLOWING, isFollowing, userId}
}

export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        const data = await userAPI.getUsers(currentPage, pageSize);

        dispatch(setUsers(data.items));
        dispatch(setAllUsers(data.totalCount));
        dispatch(toggleIsFetching(false));
        dispatch(setCurrentPage(currentPage));
    }

}

const followUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowing(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
        dispatch(toggleIsFollowing(false, userId));
    }
}

export const follow = (userId) => {
    return async (dispatch) => {
        const apiMethod = userAPI.followUser.bind(userId);
        followUnfollow(dispatch, userId, apiMethod, followSuccess);
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        const apiMethod = userAPI.unfollowUser.bind(userId);
        followUnfollow(dispatch, userId, apiMethod, unfollowSuccess);
    }
}

const initialState = {
    usersData: [],
    pageSize: 5,
    allUsers: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: []
}

const usersReducer = (state = initialState, action) => {
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