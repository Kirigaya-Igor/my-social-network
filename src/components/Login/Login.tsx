import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import './login.scss';
import {appStateType} from "../../redux/store";

const maxLength20 = maxLengthCreator(20);
const maxLength30 = maxLengthCreator(30);

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesTypes, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    debugger
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className='someError'><span>{error}</span></div>}
            <div>
                {createField<LoginFormPropertiesTypesKeys>('Email', 'email', [required, maxLength30], Input, {}, '')}
            </div>
            <div>
                {createField<LoginFormPropertiesTypesKeys>('Password', 'password', [required, maxLength20], Input, {}, '')}
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


const LoginReduxForm = reduxForm<LoginFormValuesTypes, LoginFormOwnProps>({
    // a unique name for the form
    form: 'login'
})(LoginForm)

type mapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type mapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesTypes = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormPropertiesTypesKeys = GetStringKeys<LoginFormValuesTypes>

const Login: React.FC<mapStatePropsType & mapDispatchPropsType> = ({login, isAuth, captchaUrl}) => {
    const onSubmit = (formData: LoginFormValuesTypes) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>

            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login);