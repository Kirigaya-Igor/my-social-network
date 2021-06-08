import React from 'react';
import './dialogs.scss';
import DialogItem from "./DialogItem";
import Message from "./Message";

const Dialogs = ({state, sendMessage, updateNewMessageBody}) => {

    const onSendMessage = () => {
        sendMessage();
    }

    const onNewMessageChange = (e) => {
        const body = e.target.value;
        updateNewMessageBody(body);
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
                    <div><textarea value={state.newMessageBody}
                                   placeholder='Enter your message'
                                   onChange={onNewMessageChange}></textarea></div>
                    <div><button onClick={onSendMessage}>Send</button></div>
                </div>

            </div>
        </div>
    )
}

export default Dialogs;