import React from 'react';
import './dialogItem.scss';
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    id: number
}

const DialogItem: React.FC<PropsType> = ({name, id}) => {
    return (
        <div>
            <NavLink className='dialog' to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;