import React from 'react';
import './myPosts.scss';
import Post from "./Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const NewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Add new post' name='newPostText' component={Textarea}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm({
    // a unique name for the form
    form: 'addNewPost'
})(NewPostForm)

const MyPosts = ({postsData, addPost}) => {
    const onAddNewPost = (value) => {
        addPost(value.newPostText);
    }

    return (
        <div className='posts-block'>
            <h3>My posts</h3>
            <div>
                <AddNewPostReduxForm onSubmit={onAddNewPost}/>
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