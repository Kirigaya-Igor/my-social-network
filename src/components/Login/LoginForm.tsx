import {maxLengthCreator, required} from "../../utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";

const maxLength20 = maxLengthCreator(20);
const maxLength30 = maxLengthCreator(30);

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValuesTypes = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormPropertiesTypesKeys = GetStringKeys<LoginFormValuesTypes>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesTypes, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    debugger
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className='someError'><span>{error}</span></div>}
            <div>
                {createField<LoginFormPropertiesTypesKeys>('Email', 'email', [required, maxLength30], Input, {}, '')}
            </div>
            <div>
                {createField<LoginFormPropertiesTypesKeys>('Password', 'password', [required, maxLength20], Input, {type: 'password'}, '')}
            </div>
            <div>
                {createField<LoginFormPropertiesTypesKeys>(undefined, 'rememberMe', [required], Input, {type: 'checkbox'}, 'remember me')}
            </div>

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('symbols from image', 'captcha',
                [required], Input, {}, '')}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<LoginFormValuesTypes, LoginFormOwnProps>({
    // a unique name for the form
    form: 'login'
})(LoginForm)