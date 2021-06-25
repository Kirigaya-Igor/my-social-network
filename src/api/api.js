import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "3c133c35-eefc-478a-b041-6e8fda7cdc57"
    }
})

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    followUser(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },

    unfollowUser(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },

    updateStatus(status) {
        return instance.put(`profile/status`, {status})
            .then(response => response.data)
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },

    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => response.data)
    },

    logout(email, password, rememberMe = false) {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }
}