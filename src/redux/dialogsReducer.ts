const SEND_MESSAGE = 'SEND_MESSAGE';

type sendMessageCreatorAcType = {
    type: typeof SEND_MESSAGE,
    newMessageText: string
}

export const sendMessageCreator = (newMessageText: string): sendMessageCreatorAcType => {
    return {type: SEND_MESSAGE, newMessageText}
}

const initialState = {
    dialogsData: [
        {id: 1, name: 'Igor'},
        {id: 2, name: 'Lola'},
        {id: 3, name: 'Seryj'}] as Array<{id: number, name: string}>,
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'It-Kamasutra'},
        {id: 3, message: 'React it`s fine'}] as Array<{id: number, message: string}>

}

type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            const body = action.newMessageText;
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 4, message: body}]
            }
        default:
            return state;
    }
}

export default dialogsReducer;