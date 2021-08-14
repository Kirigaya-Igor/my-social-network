import {updateObjectInArray} from "../utils/objectHelpers";
import {usersDataType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./store";
import {Dispatch} from "redux";
import {userAPI} from "../api/usersApi";
import {APIResponseType} from "../api/api";

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
    },

    setFilter: (filter: FilterType) => {
        return {type: 'SET_FILTER', payload: filter} as const
    }
}

type ThunkType = BaseThunkType<ActionTypes>
type DispatchType = Dispatch<ActionTypes>

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));

        const data = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);

        dispatch(actions.setUsers(data.items));
        dispatch(actions.setAllUsers(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    }

}

const _followUnfollow = async (dispatch: DispatchType, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>,
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
        await _followUnfollow(dispatch, userId, apiMethod, actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        const apiMethod = userAPI.unfollowUser.bind(userId);
        await _followUnfollow(dispatch, userId, apiMethod, actions.unfollowSuccess);
    }
}

const initialState = {
    usersData: [] as Array<usersDataType>,
    pageSize: 5,
    allUsers: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: [] as Array<number>, // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

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
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}

export default usersReducer;