import React from 'react';
import './message.scss';

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = ({message}) => {
    return (
        <div className='message'>{message}</div>
    )
}

export default Message;