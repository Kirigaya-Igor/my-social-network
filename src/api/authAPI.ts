import {instance, ResultCodeForCaptchaEnum, APIResponseType, ResultCodeEnum} from "./api";

type authMeResponseType = { id: number, email: string, login: string }
type loginResponseType = { userId: number }

export const authAPI = {
    authMe() {
        return instance.get<APIResponseType<authMeResponseType>>(`auth/me`)
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe = false, captcha = null as string | null) {
        return instance.post<APIResponseType<loginResponseType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logout() {
        return instance.delete<APIResponseType>(`auth/login`)
            .then(response => response.data)
    }
}