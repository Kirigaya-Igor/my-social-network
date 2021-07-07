import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import './login.scss';

const maxLength20 = maxLengthCreator(20);

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    debugger
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className='someError'><span>{error}</span></div>}
            <div>
                <Field placeholder='Email' name='email' component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder='Password' type='password' name='password' component={Input}
                       validate={[required, maxLength20]}/>
            </div>
            <div>
                <Field component={Input} name='rememberMe' type='checkbox'
                       validate={[required]}/> remember me
            </div>

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('symbols from image', 'captcha',
                [required], Input, {})}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const Login = ({login, isAuth, captchaUrl}) => {
    const onSubmit = (formData) => {
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

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login);