import {photosType, profileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type savePhotoDataType = {
    photos: photosType
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<profileType>(`profile/${userId}`)
            .then(response => response.data)
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status})
            .then(response => response.data)
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<savePhotoDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },

    saveProfile(profile: profileType) {
        return instance.put<APIResponseType>(`profile`, profile)
            .then(response => response.data)
    }
}