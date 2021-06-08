import React from 'react';
import './post.scss';

const Post = ({message, likesCount}) => {
    return (
        <div>
            <div>{message}</div>
            <div>{likesCount}</div>
        </div>

    )
}

export default Post;