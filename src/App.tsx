import React from "react";
import './App.scss';
import 'antd/dist/antd.css'
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import UsersPage from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Loader from "./components/common/Loader";
import store, {appStateType} from "./redux/store";
import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import AppHeader  from "./components/Header/AppHeader";
import {withSuspense} from "./hoc/withSuspense";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedChatPage = withSuspense(ChatPage)

class App extends React.Component<MapPropsType & DispatchPropsType> {

    catchAllErrors = (e: PromiseRejectionEvent) => {
        alert('promiseRejectionEvent');
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

            <Layout>
                <AppHeader/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                    <Menu.Item key="1"><Link className='item' to='/profile'>Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link className='item' to='/dialogs'>Messages</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Users">
                                    <Menu.Item key="3"><Link className='item' to='/users'>Users</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<LaptopOutlined/>} title="Chat">
                                    <Menu.Item key="4"><Link className='item' to='/chat'>Chat</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                                <Route path='/users' render={() => <UsersPage/>}/>
                                <Route path='/chat' render={() => <SuspendedChatPage/>}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Redirect from="/" to="/profile"/>
                                <Redirect to={'/profile'}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Samurai Social Network ©2021 Created by IT-KAMASUTRA & Igor Shyian</Footer>
            </Layout>

            // <div className='app-wrapper'>
            //     <HeaderContainer/>
            //     <Nav/>
            //     <div className='app-wrapper-content'>
            //         <Switch>
            //             <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
            //             <Route path='/dialogs' render={() =>
            //                 <React.Suspense fallback={<div>Loading...</div>}>
            //                     <DialogsContainer/>
            //                 </React.Suspense>
            //             }/>
            //             <Route path='/users' render={() => <UsersPage/>}/>
            //             <Route path='/login' render={() => <Login/>}/>
            //             <Redirect from="/" to="/profile" />
            //             <Redirect to={'/profile'}/>*/}
            //         </Switch>
            //     </div>
            // </div>
        );
    }

}

const mapStateToProps = (state: appStateType) => {
return {
    initialized: state.app.initialized
}
}

const AppContainer = compose<React.ComponentType>(
withRouter,
connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJsApp: React.FC = () => {
return (
        <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
</BrowserRouter>
)
}

export default SamuraiJsApp;
