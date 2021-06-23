import React from 'react';
import './FormsControls.scss';

const FormControl = ({input, meta, children, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className='formControl'>
            <div className={hasError ? 'error' : ''}>
                {children}
                <div>
                    {hasError && <span>{meta.error}</span>}
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