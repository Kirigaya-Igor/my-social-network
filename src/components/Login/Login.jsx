import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Login' name='login' component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder='Password' name='password' component={Input}
                       validate={[required, maxLength20]}/>
            </div>
            <div>
                <Field component={Input} name='rememberMe' type='checkbox'
                       validate={[required]}/> remember me
            </div>
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

const Login = () => {
    const onSubmit = (formData) => {

    }

    return (
        <div>
            <h1>LOGIN</h1>

            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Login;