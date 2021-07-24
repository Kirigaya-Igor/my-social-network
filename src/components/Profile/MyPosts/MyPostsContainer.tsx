import React from 'react';
import {actions} from "../../../redux/profileReducer";
import MyPosts, {DispatchMyPostsFormType, MapMyPostsFormType} from "./MyPosts";
import {connect} from "react-redux";
import {appStateType} from "../../../redux/store";

const mapStateToProps = (state: appStateType) => {
    return {
        postsData: state.profilePage.postsData
    }
}

const MyPostsContainer = connect<MapMyPostsFormType, DispatchMyPostsFormType, {}, appStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;