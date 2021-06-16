import React from "react";
import './App.scss';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Nav from "./components/Nav";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

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
                        {/*<Redirect to={'/profile'}/>*/}
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
