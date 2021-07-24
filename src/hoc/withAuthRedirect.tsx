import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {appStateType} from "../redux/store";

const mapStateToPropsForRedirect = (state: appStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type MapPropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType> = (props) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Redirect to={'/login'}/>
        }

        return <WrappedComponent {...restProps as WCP}/>
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
