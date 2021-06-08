import React from 'react';
import './nav.scss';
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <nav className='app-nav'>
            <div><NavLink className='item' to='/profile'>Profile</NavLink></div>
            <div><NavLink className='item' to='/dialogs'>Messages</NavLink></div>
            <div><NavLink className='item' to='/users'>Users</NavLink></div>
            <div><NavLink className='item' to='/news'>News</NavLink></div>
            <div><NavLink className='item' to='/music'>Music</NavLink></div>
            <div><NavLink className='item' to='/settings'>Settings</NavLink></div>
        </nav>
    )
}

export default Nav;