import React from 'react';
import './profileInfo.scss';
import Loader from "../../common/Loader";
import ProfileStatus from "../ProfileStatus";

const ProfileInfo = ({profile, status, updateStatus}) => {

    if(!profile){
        return <Loader/>
    }

    return (
        <div>
            <div>
                {/*<img src={profile.photos.large}/>*/}
            </div>
            <div className='description-block'>
                <img src={profile.photos.large}/>
                <ProfileStatus status={status} updateStatus={updateStatus}/>
                <div>{profile.fullName}</div>
                <div>{profile.aboutMe}</div>
                <div>{profile.contacts.vk}</div>
                <div>
                    {profile.lookingForAJob ? `i am looking for a job (${profile.lookingForAJobDescription})`
                        : <div></div>}
                </div>
                <div>{profile.contacts.vk}</div>
                <div></div>
            </div>
        </div>
    )
}

export default ProfileInfo;