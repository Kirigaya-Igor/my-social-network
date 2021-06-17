import React from "react";
import './App.scss';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Nav from "./components/Nav";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login";

function App() {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer />}/>
                        <Route path='/dialogs' render={() => <DialogsContainer />}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        {/*<Redirect to={'/profile'}/>*/}
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
