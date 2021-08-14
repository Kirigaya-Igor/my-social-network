import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import './login.scss';
import {appStateType} from "../../redux/store";
import {LoginFormValuesTypes, LoginReduxForm} from "./LoginForm";
import {login} from "../../redux/authReducer";

const Login: React.FC = () => {

    const captchaUrl = useSelector((state: appStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: appStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesTypes) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
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

export default Login