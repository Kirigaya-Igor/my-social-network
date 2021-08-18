import React, {useEffect, useRef, useState} from "react";
import { ChatMessageAPIType } from "../../api/chatAPI";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {appStateType} from "../../redux/store";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat = () => {

    const dispatch = useDispatch()

    const status = useSelector((state: appStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <div>
            {status === 'error' && <div>Some error occured. Please refresh the page</div>}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useSelector((state: appStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '50px'}}/> <b>{message.userName}</b>
            <br/>
            {message.message}
        </div>
    )
})

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: appStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div><textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea></div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button>
            </div>
        </div>
    )
}

export default ChatPage