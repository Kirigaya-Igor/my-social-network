import React from 'react';
import './post.scss';

type PropsType = {
    message: string | null
    likesCount: number | null
}

const Post: React.FC<PropsType> = ({message, likesCount}) => {
    return (
        <div>
            <div>{message}</div>
            <div>{likesCount}</div>
        </div>

    )
}

export default Post;