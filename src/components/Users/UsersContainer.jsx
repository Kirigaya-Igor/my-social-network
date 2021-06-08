import React, {Component} from "react";
import {connect} from "react-redux";
import {followAC, setAllUsersAC, setCurrentPageAC, setUsersAC, unfollowAC} from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";

class UsersContainer extends Component{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setAllUsers(response.data.totalCount);
            })
    }

    onPageChanged = (p) => {
        this.props.setCurrentPage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => this.props.setUsers(response.data.items))
    }

    render() {
        return (
            <Users allUsers={this.props.allUsers} pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage} usersData={this.props.usersData}
                   unfollow={this.props.unfollow} follow={this.props.follow} onPageChanged={this.onPageChanged}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        allUsers: state.usersPage.allUsers,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setAllUsers: (totalCount) => {
            dispatch(setAllUsersAC(totalCount))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);