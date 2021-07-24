import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import './profileInfo.scss';
import {profileType} from "../../../types/types";

type PropsType = {
    profile: profileType
}

type ProfileTypeKeys = GetStringKeys<profileType>

const ProfileDataForm: React.FC<InjectedFormProps<profileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className='someError'><span>{error}</span></div>}
            <div>
                <b>Full name: </b>
                {createField<ProfileTypeKeys>('Full name',
                    'fullName', [], Input, {}, '')}
            </div>

            <div>
                <b>About me: </b>
                {createField<ProfileTypeKeys>('About Me',
                    'aboutMe', [], Textarea, {}, '')}
            </div>

            <div>
                <b>Looking for a job: </b>
                {createField<ProfileTypeKeys>('',
                    'lookingForAJob', [], Input, {type: 'checkbox'}, '')}
            </div>

            <div>
                <b>My professional skills: </b>
                {createField<ProfileTypeKeys>('My professional skills',
                    'lookingForAJobDescription', [], Textarea, {}, '')}
            </div>

            <div>
                <b>Contacts:</b>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className='contact'>
                        <b>{key}: </b>
                        {createField(key,
                            `contacts.${key}`, [], Input, {}, '')}
                    </div>

                })}
            </div>

            <div><button>Save changes</button></div>
        </form>
    )
}

const AProfileDataFormReduxForm = reduxForm<profileType, PropsType>({
    // a unique name for the form
    form: 'editProfileData'
})(ProfileDataForm)

export default AProfileDataFormReduxForm;