export type postsDataType = {
    id: number | null, message: string | null, likesCount: number | null
}

export type contactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

export type photosType = {
    small: string | null
    large: string | null
}

export type profileType = {
    userId: number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    aboutMe: string | null
    contacts: contactsType
    photos: photosType
}

export type usersDataType = {
    name: string
    id: number
    photos: photosType
    status: string | null
    followed: boolean
}