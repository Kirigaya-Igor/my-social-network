import React from 'react';
import './FormsControls.scss';
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;

    return (
        <div className='formControl'>
            <div className={hasError ? 'error' : ''}>
                {children}
                <div>
                    {hasError && <span>{error}</span>}
                </div>
            </div>
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return (<FormControl {...props}><textarea {...restProps} {...input}/></FormControl>)
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return (<FormControl {...props}><input {...restProps} {...input}/></FormControl>)
}

export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
    return (
        <div>
            <Field placeholder={placeholder} name={name}
                   validate={validators} component={component}
                   {...props}
            /> {text}
        </div>
    )
}