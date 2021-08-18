import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";
import chatReducer from "./chatReducer";


const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})

type rootReducerType = typeof reducers
export type appStateType = ReturnType<rootReducerType>

export type InferActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U: never

export type BaseThunkType<A extends Action, P = Promise<void>> = ThunkAction<P, appStateType, any, A>

// const store = createStore(reducers, applyMiddleware(thunkMiddleWare))
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)))
// @ts-ignore
window.__store__ = store

export default store