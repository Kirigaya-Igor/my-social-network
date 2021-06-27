import React from "react";
import userPhoto from "../assets/images/user.png";
import './users.scss';
import {NavLink} from "react-router-dom";

const User = ({user, isFollowing, unfollow, follow}) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img className='userPhoto' src={user.photos.small != null ? user.photos.small : userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={isFollowing.some(id => id === user.id)}
                                onClick={()=> {unfollow(user.id);}}>UNFOLLOW</button>
                        :
                        <button disabled={isFollowing.some(id => id === user.id)}
                                onClick={()=> {follow(user.id);}}>FOLLOW</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </span>
            </span>
        </div>
    )
}

export default User;