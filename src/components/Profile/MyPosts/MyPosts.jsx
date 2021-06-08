import React from 'react';
import './myPosts.scss';
import Post from "./Post";

const MyPosts = ({newPostText, postsData, addPost, updateNewPostText}) => {

    const newPost = React.createRef();

    const onAddNewPost = () => {
        addPost();
    }

    const onChangePost = () => {
        const text = newPost.current.value;
        updateNewPostText(text);
    }

    return (
        <div className='posts-block'>
            <h3>My posts</h3>
            <div>
                <div><textarea onChange={onChangePost} ref={newPost} value={newPostText}/></div>
                <div><button onClick={onAddNewPost}>Add post</button></div>
            </div>
            <div className='posts'>
                {postsData.map((item) => (
                    <div key={item.id}>
                        <Post message={item.message} likesCount={item.likesCount}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyPosts;