import React from 'react';
import './dialogs.scss';
import DialogItem from "./DialogItem";
import Message from "./Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const newMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Enter your message' name='newMessageText' component={Textarea}
                       validate={[required, maxLength50]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewMessageReduxForm = reduxForm({
    // a unique name for the form
    form: 'addNewMessage'
})(newMessageForm)

const Dialogs = ({state, isAuth, sendMessage}) => {

    const onSendMessage = (value) => {
        sendMessage(value.newMessageText);
    }

    return (
        <div className='dialogs'>
            <div className='dialogs-items'>
                {state.dialogsData.map((item) => (
                    <div key={item.id}>
                        <DialogItem id={item.id} name={item.name}/>
                    </div>
                ))}
            </div>

            <div className='messages'>
                <div>
                    {state.messagesData.map((item) => (
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