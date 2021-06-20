import React, {Component} from "react";
import {connect} from "react-redux";
import {
    follow, getUsers,
    setCurrentPage,
    toggleIsFollowing, unfollow
} from "../../redux/usersReducer";
import Users from "./Users";
import Loader from "../common/Loader";
import {compose} from "redux";

class UsersContainer extends Component{
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Loader/> : null}
                <Users allUsers={this.props.allUsers} pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage} usersData={this.props.usersData}
                       unfollow={this.props.unfollow} follow={this.props.follow} onPageChanged={this.onPageChanged}
                       isFollowing={this.props.isFollowing}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        allUsers: state.usersPage.allUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowing: state.usersPage.isFollowing
    }
}

export default compose(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage,
        toggleIsFollowing, getUsers
    })
)(UsersContainer);