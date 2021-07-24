import React, {Component} from "react";
import {connect} from "react-redux";
import {follow, getUsers, unfollow} from "../../redux/usersReducer";
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
import {usersDataType} from "../../types/types";
import {appStateType} from "../../redux/store";

type mapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    allUsers: number
    usersData: Array<usersDataType>
    isFollowing: Array<number>
}

type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type propsType = mapStatePropsType & mapDispatchPropsType

class UsersContainer extends Component<propsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
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

const mapStateToProps = (state: appStateType): mapStatePropsType => {
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
    connect<mapStatePropsType, mapDispatchPropsType, {}, appStateType>(mapStateToProps, {
        follow, unfollow, getUsers
    })
    // @ts-ignore
)(UsersContainer);