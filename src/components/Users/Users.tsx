import  React, {useEffect} from "react";
import './users.scss';
import Paginator from "../Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, getUsers, follow, unfollow} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllUsers,
    getCurrentPage,
    getIsFollowing,
    getPageSize,
    getUsersData,
    getUsersFilter
} from "../../redux/userSelectors";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

type PropsType = {}

type QueryParamsType = { term?: string, page?: string, friend?: string };
const Users: React.FC<PropsType> = (props) => {
    const allUsers = useSelector(getAllUsers)
    const usersData = useSelector(getUsersData)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const isFollowing = useSelector(getIsFollowing)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter
        if(!!parsed.page) {actualPage = +parsed.page}
        if(!!parsed.term) {actualFilter = {...actualFilter, term: parsed.term as string}}
        if(!!parsed.friend) {
            actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) {query.term = filter.term}
        if(filter.friend !== null) {query.friend = String(filter.friend)}
        if(currentPage !== 1) {query.page = String(currentPage)}

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));
    }

    const followed = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowed = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>

            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
            </div>

            <Paginator currentPage={currentPage} pageSize={pageSize} totalItemCount={allUsers}
                       onPageChanged={onPageChanged}/>

           <div>
               {
                   usersData.map((user) => (
                       <div key={user.id}>
                           <User user={user} follow={followed} isFollowing={isFollowing}
                                 unfollow={unfollowed}/>
                       </div>
                   ))
               }
           </div>
        </div>
    )
}

export default Users;