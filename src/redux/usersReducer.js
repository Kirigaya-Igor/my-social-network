const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_ALL_USERS = 'SET_ALL_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

export const follow = (userId) => {
    return {type: FOLLOW, userId}
}

export const unfollow = (userId) => {
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

const initialState = {
    usersData: [],
    pageSize: 5,
    allUsers: 0,
    currentPage: 1,
    isFetching: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map((user)=>{
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map((user)=>{
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
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
        default:
            return state;
    }
}

export default usersReducer;