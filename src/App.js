import React from "react";
import './App.scss';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Nav from "./components/Nav";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Loader from "./components/common/Loader";
import store from "./redux/store";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {

    catchAllErrors = (promiseRejectionEvent) => {
        alert(promiseRejectionEvent);
    }

    componentDidMount() {
        this.props.initializeApp();

        window.addEventListener("unhandledrejection", this.catchAllErrors);
    }

    componentWillMount() {
        window.removeEventListener("unhandledrejection", this.catchAllErrors);
    }

    render() {

        if (!this.props.initialized) {
            return <Loader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() =>
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <DialogsContainer/>
                            </React.Suspense>
                        }/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Redirect from="/" to="/profile" />
                        <Redirect to={'/profile'}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJsApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiJsApp;
