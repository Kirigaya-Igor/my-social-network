import React, {ChangeEvent, useState} from 'react';
import './profileInfo.scss';
import Loader from "../../common/Loader";
import ProfileStatus from "../ProfileStatus";
import userPhoto from "../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm";
import {contactsType, profileType} from "../../../types/types";

type ProfileInfoPropsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false);

    if(!profile){
        return <Loader/>
    }
    
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const goToEditMode = (editStatus: boolean) => {
        setEditMode(editStatus);
    }

    const onSubmit = (formData: profileType) => {
        saveProfile(formData)
            .then(() => {
                goToEditMode(false);
            })
    }

    return (
        <div>
            <div className='description-block'>

                <img className='userImg' src={profile.photos.large || userPhoto}/>
                <div>{isOwner && <input type='file' onChange={onMainPhotoSelected}/>}</div>

                <div>
                    <ProfileStatus status={status} updateStatus={updateStatus}/>
                </div>

                {editMode
                    ?
                    <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    :
                    <ProfileData profile={profile}
                                 isOwner={isOwner}
                                 goToEditMode={() => goToEditMode(true)}/>
                }

            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: profileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <>
            <div>
                <b>Full name: </b> {profile.fullName || 'Empty'}
            </div>

            <div>
                <b>About me: </b> {profile.aboutMe || 'Empty'}
            </div>

            <div>
                <b>Looking for a job: </b> {profile.lookingForAJob ? 'Yes' : 'No'}
            </div>

            <div>
                <b>my professional skills: </b> {profile.lookingForAJobDescription || 'Empty'}
            </div>

            <div>
                <b>Contacts:</b>
                {Object.keys(profile.contacts).map(key => {
                    if(profile.contacts[key as keyof contactsType]) {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof contactsType]}/>
                    }
                })}
            </div>

            {isOwner && <div><button onClick={goToEditMode}>Edit profile</button></div>}
        </>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}
const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className='contact'><b>{contactTitle}:</b>{contactValue}</div>
    )
}

export default ProfileInfo;