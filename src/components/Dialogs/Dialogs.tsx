import React from 'react';
import './dialogs.scss';
import DialogItem from "./DialogItem";
import Message from "./Message";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {InitialStateType} from '../../redux/dialogsReducer';

const maxLength50 = maxLengthCreator(50);

type DialogNewMessageFormTypeKeys = Extract<keyof DialogNewMessageFormType, string>
type FormPropsType = {}
const newMessageForm: React.FC<InjectedFormProps<DialogNewMessageFormType, FormPropsType> & FormPropsType>
    = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<DialogNewMessageFormTypeKeys>('Enter your message', 'newMessageText',
                    [required, maxLength50], Textarea, {}, '')}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewMessageReduxForm = reduxForm<DialogNewMessageFormType>({
    // a unique name for the form
    form: 'addNewMessage'
})(newMessageForm)

export type DialogNewMessageFormType = {
    newMessageText: string
}

type PropsType = {
    state: InitialStateType
    sendMessage: (newMessageText: string) => void
}

const Dialogs: React.FC<PropsType> = ({state, sendMessage}) => {

    const onSendMessage = (value: DialogNewMessageFormType) => {
        sendMessage(value.newMessageText);
    }

    return (
        <div className='dialogs'>
            <div className='dialogs-items'>
                {state.dialogsData.map((item: any) => (
                    <div key={item.id}>
                        <DialogItem id={item.id} name={item.name}/>
                    </div>
                ))}
            </div>

            <div className='messages'>
                <div>
                    {state.messagesData.map((item: any) => (
                        <div key={item.id}>
                            <Message message={item.message}/>
                        </div>
                    ))}
                </div>
                <div>
                    <AddNewMessageReduxForm onSubmit={onSendMessage}/>
                </div>

            </div>
        </div>
    )
}

export default Dialogs;