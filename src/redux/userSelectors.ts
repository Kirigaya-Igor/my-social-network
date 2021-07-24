// import {createSelector} from 'reselect';

import {appStateType} from "./store";

export const getUsersData = (state: appStateType) => {
    return state.usersPage.usersData
}

// SELECTOR WITH RESELECT
// export const getUsersDataSuper = createSelector(getUsersData, (users) => {
//     return users.filter(u => true)
// })

export const getPageSize = (state: appStateType) => {
    return state.usersPage.pageSize
}

export const getAllUsers = (state: appStateType) => {
    return state.usersPage.allUsers
}

export const getCurrentPage = (state: appStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: appStateType) => {
    return state.usersPage.isFetching
}

export const getIsFollowing = (state: appStateType) => {
    return state.usersPage.isFollowing
}