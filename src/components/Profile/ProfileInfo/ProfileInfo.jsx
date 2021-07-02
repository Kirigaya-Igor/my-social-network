import React, {useState} from 'react';
import './profileInfo.scss';
import Loader from "../../common/Loader";
import ProfileStatus from "../ProfileStatus";
import userPhoto from "../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false);

    if(!profile){
        return <Loader/>
    }
    
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const goToEditMode = (editStatus) => {
        setEditMode(editStatus);
    }

    const onSubmit = (formData) => {
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

const ProfileData = ({profile, isOwner, goToEditMode}) => {
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
                    if(profile.contacts[key]) {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                    }
                })}
            </div>

            {isOwner && <div><button onClick={goToEditMode}>Edit profile</button></div>}
        </>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className='contact'><b>{contactTitle}:</b>{contactValue}</div>
    )
}

export default ProfileInfo;