const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

export const sendMessageCreator = (text) => {
    return {type: SEND_MESSAGE}
}

export const updateNewMessageBodyCreator = (body) => {
    return {type: UPDATE_NEW_MESSAGE_BODY, body: body}
}

const initialState = {
    dialogsData: [
        {id: 1, name: 'Igor'},
        {id: 2, name: 'Lola'},
        {id: 3, name: 'Seryj'}],
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'It-Kamasutra'},
        {id: 3, message: 'React it`s fine'}],
    newMessageBody: ''

}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return  {
                ...state,
                newMessageBody: action.body
            }

        case SEND_MESSAGE:
            const body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messagesData: [...state.messagesData, {id: 4, message: body}]
            }
        default:
            return state;
    }
}

export default dialogsReducer;