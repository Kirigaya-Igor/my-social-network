import React from "react";
import './App.scss';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Header from "./components/Header";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

function App() {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/profile' render={() => <Profile />}/>
                        <Route path='/dialogs' render={() => <DialogsContainer />}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Redirect to={'/profile'}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
