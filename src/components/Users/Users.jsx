import React from "react";
import './users.scss';
import Paginator from "../Paginator";
import User from "./User";

const Users = ({currentPage, pageSize, allUsers, onPageChanged, usersData, ...props}) => {
    return (
        <div>
            <Paginator currentPage={currentPage} pageSize={pageSize} totalItemCount={allUsers}
                       onPageChanged={onPageChanged}/>

           <div>
               {
                   usersData.map((user) => (
                       <div key={user.id}>
                           <User user={user} follow={props.follow} isFollowing={props.isFollowing}
                                 unfollow={props.unfollow}/>
                       </div>
                   ))
               }
           </div>
        </div>
    )
}

export default Users;