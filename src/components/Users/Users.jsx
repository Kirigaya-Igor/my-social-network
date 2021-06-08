import React from "react";
import userPhoto from "../assets/images/user.png";
import './users.scss';

const Users = (props) => {

    const pagesCount = Math.ceil(props.allUsers/props.pageSize);

    let pages = [];
    for(let i=1; i <=pagesCount; i++){
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map((p) => (
                    <span key={p} className={props.currentPage === p && 'activePage'}
                          onClick={() => {props.onPageChanged(p)}}>{`${p} `}</span>
                ))}
            </div>
            {
                props.usersData.map((user) => (
                    <div key={user.id}>
                        <span>
                            <div>
                                <img className='userPhoto' src={user.photos.small != null ? user.photos.small : userPhoto}/>
                            </div>
                            <div>
                                {user.followed ?
                                    <button onClick={()=> {props.unfollow(user.id)}}>UNFOLLOW</button>
                                    :
                                    <button onClick={()=> {props.follow(user.id)}}>FOLLOW</button>}
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
                ))
            }
        </div>
    )
}

export default Users;