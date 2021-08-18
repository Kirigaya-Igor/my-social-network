import React from 'react';
import './header.scss';
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import { selectIsAuth, selectCurrentUserLogin } from '../../redux/authSelectors';
import { logout } from '../../redux/authReducer';

const {Header} = Layout;

export type MapHeaderPropsType = {}

const AppHeader: React.FC<MapHeaderPropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <Header className="header">
            <Row>
                <Col span={21}>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1"><Link className='item' to='/profile'>Profile</Link></Menu.Item>
                        <Menu.Item key="2"><Link className='item' to='/dialogs'>Messages</Link></Menu.Item>
                        <Menu.Item key="3"><Link className='item' to='/users'>Users</Link></Menu.Item>
                        <Menu.Item key="4"><Link className='item' to='/chat'>Chat</Link></Menu.Item>
                    </Menu>
                </Col>
                {isAuth
                    ? <>
                        <Col span={1}>
                            <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Col>
                        <Col span={2}>
                            {/*<span>{`${login} `}</span>*/}
                            <Button onClick={logoutCallback}>Logout</Button>
                        </Col>
                    </>
                    : <Col span={3}><Button><Link to={'/login'}>Login</Link></Button></Col>
                }

            </Row>
        </Header>
    )
}

// @ts-ignore
export default AppHeader