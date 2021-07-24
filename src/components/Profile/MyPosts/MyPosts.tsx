import React from 'react';
import './myPosts.scss';
import Post from "./Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";
import {createField, GetStringKeys, Textarea} from "../../common/FormsControls/FormsControls";
import {postsDataType} from "../../../types/types";

type NewPostFormType = {}
type NewPostFormValuesType = {
    newPostText: string
}
type NewPostFormValuesTypeKeys = GetStringKeys<NewPostFormValuesType>

const NewPostForm: React.FC<InjectedFormProps<NewPostFormValuesType, NewPostFormType> & NewPostFormType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewPostFormValuesTypeKeys>('Add new post', 'newPostText',
                    [required], Textarea, {}, '')}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm<NewPostFormValuesType>({
    // a unique name for the form
    form: 'addNewPost'
})(NewPostForm)

export type MapMyPostsFormType = {
    postsData: Array<postsDataType>
}

export type DispatchMyPostsFormType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapMyPostsFormType & DispatchMyPostsFormType> = ({postsData, addPost}) => {
    const onAddNewPost = (value: NewPostFormValuesType) => {
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