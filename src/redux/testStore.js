import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

const store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'first post', likesCount: 10},
                {id: 2, message: 'second post', likesCount: 3},
                {id: 3, message: 'React it`s fine', likesCount: 100}],
            newPostText: ''
        },

        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Igor'},
                {id: 2, name: 'Lola'},
                {id: 3, name: 'Seryj'}],
            messagesData: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'It-Kamasutra'},
                {id: 3, message: 'React it`s fine'}],
            newMessageBody: ''
        },

        sidebar: {}
    },

    _callSubscriber() {
        console.log('state change')
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

export default store;