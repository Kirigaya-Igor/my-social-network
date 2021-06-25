// import {createSelector} from 'reselect';

export const getUsersData = (state) => {
    return state.usersPage.usersData
}

// export const getUsersDataSuper = createSelector(getUsersData, (users) => {
//     return users.filter(u => true)
// })

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getAllUsers = (state) => {
    return state.usersPage.allUsers
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getIsFollowing = (state) => {
    return state.usersPage.isFollowing
}