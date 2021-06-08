import React, {Component} from "react";
import {connect} from "react-redux";
import {
    follow,
    setAllUsers,
    setCurrentPage,
    setUsers,
    toggleIsFetching,
    unfollow
} from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";
import Loader from "../common/Loader";

class UsersContainer extends Component{
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setAllUsers(response.data.totalCount);
                this.props.toggleIsFetching(false);
            })
    }

    onPageChanged = (p) => {
        this.props.setCurrentPage(p);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.toggleIsFetching(false);
            }
        )
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Loader/> : null}
                <Users allUsers={this.props.allUsers} pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage} usersData={this.props.usersData}
                       unfollow={this.props.unfollow} follow={this.props.follow} onPageChanged={this.onPageChanged}/>
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
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps,
    {
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setAllUsers,
        toggleIsFetching
    })(UsersContainer);