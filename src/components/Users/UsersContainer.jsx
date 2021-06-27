import React, {Component} from "react";
import {connect} from "react-redux";
import {follow, getUsers, setCurrentPage, toggleIsFollowing, unfollow} from "../../redux/usersReducer";
import Users from "./Users";
import Loader from "../common/Loader";
import {compose} from "redux";
import {
    getAllUsers,
    getCurrentPage,
    getIsFetching,
    getIsFollowing,
    getPageSize,
    getUsersData
} from "../../redux/userSelectors";

class UsersContainer extends Component{
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
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
    // Selectors
    return {
        usersData: getUsersData(state),
        pageSize: getPageSize(state),
        allUsers: getAllUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowing: getIsFollowing(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage,
        toggleIsFollowing, getUsers
    })
)(UsersContainer);