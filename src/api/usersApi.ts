import {instance, APIResponseType} from "./api";
import {usersDataType} from "../types/types";

type getUsersResponseType = {
    items: Array<usersDataType>
    totalCount: number
    error: string | null
}

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<getUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    followUser(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    },

    unfollowUser(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`)
            .then(response => response.data)
    }
}