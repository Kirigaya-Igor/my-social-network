import React from 'react';
import './header.scss';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className='app-header'>
            <img src='https://i.pinimg.com/736x/d6/80/11/d68011c2cf11925d254f06c07f317ac1.jpg'/>

            <div className='login-block'>
                {props.isAuth
                    ?
                    <div>
                        {`${props.login} `}

                        <button onClick={props.logout}>Logout</button>
                    </div>
                    :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;