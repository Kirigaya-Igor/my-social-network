import React from 'react';
import './FormsControls.scss';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorsType} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
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

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return (<FormControl {...props}><textarea {...restProps} {...input}/></FormControl>)
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return (<FormControl {...props}><input {...restProps} {...input}/></FormControl>)
}

export function createField<FormsKeysTypes extends string>(placeholder: string | undefined, name: FormsKeysTypes,
                            validators: Array<FieldValidatorsType>,
                            component: React.FC<WrappedFieldProps>,
                            props: any, text: string) {
    return (
        <div>
            <Field placeholder={placeholder} name={name}
                   validate={validators} component={component}
                   {...props}
            /> {text}
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>