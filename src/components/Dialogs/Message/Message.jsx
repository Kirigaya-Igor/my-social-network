import React from 'react';
import './message.scss';

const Message = ({message}) => {
    return (
        <div className='message'>{message}</div>
    )
}

export default Message;