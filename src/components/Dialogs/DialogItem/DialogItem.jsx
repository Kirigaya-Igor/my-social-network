import React from 'react';
import './dialogItem.scss';
import {NavLink} from "react-router-dom";

const DialogItem = ({name, id}) => {
    return (
        <div>
            <NavLink className='dialog' to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;