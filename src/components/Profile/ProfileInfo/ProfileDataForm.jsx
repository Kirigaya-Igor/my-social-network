import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import './profileInfo.scss';

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className='someError'><span>{error}</span></div>}
            <div>
                <b>Full name: </b>
                {createField('Full name', 'fullName', [], Input)}
            </div>

            <div>
                <b>About me: </b>
                {createField('About Me', 'aboutMe', [], Textarea)}
            </div>

            <div>
                <b>Looking for a job: </b>
                {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>

            <div>
                <b>My professional skills: </b>
                {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>

            <div>
                <b>Contacts:</b>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className='contact'>
                        <b>{key}: </b>
                        {createField(key, `contacts.${key}`, [], Input)}
                    </div>

                })}
            </div>

            <div><button>Save changes</button></div>
        </form>
    )
}

const AProfileDataFormReduxForm = reduxForm({
    // a unique name for the form
    form: 'editProfileData'
})(ProfileDataForm)

export default AProfileDataFormReduxForm;