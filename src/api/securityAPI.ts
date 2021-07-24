import {instance} from "./api";

type getCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlResponseType>(`security/get-captcha-url`)
            .then(response => response.data)
    }
}