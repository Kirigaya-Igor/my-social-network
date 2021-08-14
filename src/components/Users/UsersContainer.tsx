import React from "react";
import {useSelector} from "react-redux";
import Users from "./Users";
import Loader from "../common/Loader";
import {getIsFetching} from "../../redux/userSelectors";

type usersPage = {  }

const UsersPage: React.FC<usersPage> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Loader/> : null}
            <Users/>
        </>
    )
}

export default UsersPage